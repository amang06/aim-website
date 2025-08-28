import { NextRequest, NextResponse } from "next/server";
import { verifyPayUResponse, getPayUConfig, PayUResponse } from "@/lib/payu";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(request: NextRequest) {
  try {
    console.log("Payment callback received:", request.method);

    // Handle both form data and JSON payload
    let payuResponse: PayUResponse;

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      // Handle JSON payload
      payuResponse = (await request.json()) as PayUResponse;
    } else {
      // Handle form data (default PayU behavior)
      const formData = await request.formData();
      payuResponse = Object.fromEntries(
        formData.entries()
      ) as unknown as PayUResponse;
    }

    console.log("PayU Response:", {
      status: payuResponse.status,
      txnid: payuResponse.txnid,
      mihpayid: payuResponse.mihpayid,
      amount: payuResponse.amount,
      productinfo: payuResponse.productinfo,
      firstname: payuResponse.firstname,
      email: payuResponse.email,
      udf1: payuResponse.udf1,
      mode: payuResponse.mode,
      hash: payuResponse.hash,
    });

    // Verify the response hash
    const payuConfig = getPayUConfig();

    // Debug: Log the received data for hash verification
    console.log("PayU Response for hash verification:", {
      status: payuResponse.status,
      txnid: payuResponse.txnid,
      mihpayid: payuResponse.mihpayid,
      amount: payuResponse.amount,
      productinfo: payuResponse.productinfo,
      firstname: payuResponse.firstname,
      email: payuResponse.email,
      udf1: payuResponse.udf1,
      hash: payuResponse.hash,
      salt: payuConfig.salt ? "Present" : "Missing",
      merchantKey: payuConfig.merchantKey ? "Present" : "Missing",
    });

    const isValidResponse = verifyPayUResponse(
      payuResponse,
      payuConfig.salt,
      payuConfig.merchantKey
    );

    if (!isValidResponse) {
      console.error("Invalid PayU response hash - response validation failed");

      // In test mode or development, we might want to continue processing
      if (payuConfig.isTestMode) {
        console.warn(
          "Test mode: Continuing with payment processing despite hash validation failure"
        );
      } else {
        // In production, we should be stricter about hash validation
        console.error(
          "Production mode: Rejecting payment due to hash validation failure"
        );
        return NextResponse.json(
          { error: "Invalid response" },
          { status: 400 }
        );
      }
    }

    const payload = await getPayload({ config });

    // Extract member ID from transaction ID
    const txnid = payuResponse.txnid;
    const parts = txnid.split("_");
    const memberId = parts.length >= 3 ? parts[1] : null; // Format: AIM_memberId_timestamp_random

    if (!memberId) {
      console.error("Could not extract member ID from transaction ID");
      return NextResponse.json(
        { error: "Invalid transaction ID" },
        { status: 400 }
      );
    }

    // Update member status based on payment result
    const status =
      payuResponse.status === "success" ? "PAYMENT_SUBMITTED" : "SUBMITTED";

    const updateData: {
      status: "PAYMENT_SUBMITTED" | "SUBMITTED";
      feeAmount?: number;
      paymentVerifiedAt?: string;
      paymentReferenceId?: string;
    } = {
      status,
    };

    // If payment is successful, set the fee amount, payment verification time, and reference ID
    if (payuResponse.status === "success") {
      updateData.feeAmount = parseFloat(payuResponse.amount || "0");
      updateData.paymentVerifiedAt = new Date().toISOString();
      updateData.paymentReferenceId = payuResponse.txnid;
    }

    await payload.update({
      collection: "members",
      id: memberId,
      data: updateData,
    });

    // Redirect to appropriate page
    const baseUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || request.nextUrl.origin;
    const redirectUrl =
      status === "PAYMENT_SUBMITTED"
        ? `${baseUrl}/membership/payment/success?memberId=${memberId}`
        : `${baseUrl}/membership/payment/failure?memberId=${memberId}`;

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Payment callback error:", error);
    return NextResponse.json(
      { error: "Payment callback failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log("Payment callback GET received");

    // Extract parameters from URL query string
    const { searchParams } = new URL(request.url);
    const payuResponse: PayUResponse = {
      status: searchParams.get("status") || "",
      txnid: searchParams.get("txnid") || undefined,
      amount: searchParams.get("amount") || undefined,
      productinfo: searchParams.get("productinfo") || undefined,
      firstname: searchParams.get("firstname") || undefined,
      email: searchParams.get("email") || undefined,
      phone: searchParams.get("phone") || undefined,
      hash: searchParams.get("hash") || undefined,
      error_Message: searchParams.get("error_Message") || undefined,
    };

    // Check if we have essential data
    if (!payuResponse.status || !payuResponse.txnid) {
      console.log(
        "No essential payment data found in GET request, trying POST handler"
      );
      return POST(request);
    }

    console.log("PayU GET Response:", {
      status: payuResponse.status,
      txnid: payuResponse.txnid,
      amount: payuResponse.amount,
    });

    // Process the same way as POST
    const payuConfig = getPayUConfig();
    const isValidResponse = verifyPayUResponse(
      payuResponse,
      payuConfig.salt,
      payuConfig.merchantKey
    );

    if (!isValidResponse) {
      console.error("Invalid PayU response hash in GET request");
      return NextResponse.json({ error: "Invalid response" }, { status: 400 });
    }

    const payload = await getPayload({ config });

    // Extract member ID from transaction ID
    const txnid = payuResponse.txnid;
    const parts = txnid.split("_");
    const memberId = parts.length >= 3 ? parts[1] : null;

    if (!memberId) {
      console.error("Could not extract member ID from transaction ID");
      return NextResponse.json(
        { error: "Invalid transaction ID" },
        { status: 400 }
      );
    }

    // Update member status based on payment result
    const status =
      payuResponse.status === "success" ? "PAYMENT_SUBMITTED" : "SUBMITTED";

    const updateData: {
      status: "PAYMENT_SUBMITTED" | "SUBMITTED";
      feeAmount?: number;
      paymentVerifiedAt?: string;
      paymentReferenceId?: string;
    } = {
      status,
    };

    // If payment is successful, set the fee amount, payment verification time, and reference ID
    if (payuResponse.status === "success") {
      updateData.feeAmount = parseFloat(payuResponse.amount || "0");
      updateData.paymentVerifiedAt = new Date().toISOString();
      updateData.paymentReferenceId = payuResponse.txnid;
    }

    await payload.update({
      collection: "members",
      id: memberId,
      data: updateData,
    });

    // Redirect to appropriate page
    const baseUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || request.nextUrl.origin;
    const redirectUrl =
      status === "PAYMENT_SUBMITTED"
        ? `${baseUrl}/membership/payment/success?memberId=${memberId}`
        : `${baseUrl}/membership/payment/failure?memberId=${memberId}`;

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Payment callback GET error:", error);
    // Fallback to POST handler
    return POST(request);
  }
}

// Handle PUT requests (some payment gateways might use PUT)
export async function PUT(request: NextRequest) {
  return POST(request);
}

// Handle PATCH requests (some payment gateways might use PATCH)
export async function PATCH(request: NextRequest) {
  return POST(request);
}

// Handle OPTIONS requests for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
