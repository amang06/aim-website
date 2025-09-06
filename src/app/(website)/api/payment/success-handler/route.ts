import { NextRequest, NextResponse } from "next/server";
import { verifyPayUResponse, getPayUConfig, PayUResponse } from "@/lib/payu";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET(request: NextRequest) {
  try {
    console.log("Payment success handler GET received");

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

    console.log("PayU Success Response:", {
      status: payuResponse.status,
      txnid: payuResponse.txnid,
      amount: payuResponse.amount,
    });

    // Check if we have essential data
    if (!payuResponse.status || !payuResponse.txnid) {
      console.error("No essential payment data found in success handler");
      return NextResponse.redirect(
        `${request.nextUrl.origin}/membership/payment/failure?error=missing_data`
      );
    }

    // Verify the response hash
    const payuConfig = getPayUConfig();
    const isValidResponse = verifyPayUResponse(
      payuResponse,
      payuConfig.salt,
      payuConfig.merchantKey
    );

    if (!isValidResponse) {
      console.error("Invalid PayU response hash in success handler");
      // In test mode, continue processing
      if (!payuConfig.isTestMode) {
        return NextResponse.redirect(
          `${request.nextUrl.origin}/membership/payment/failure?error=invalid_hash`
        );
      }
    }

    const payload = await getPayload({ config });

    // Extract member ID from transaction ID
    const txnid = payuResponse.txnid;
    const parts = txnid.split("_");
    const memberId = parts.length >= 3 ? parts[1] : null;

    if (!memberId) {
      console.error("Could not extract member ID from transaction ID");
      return NextResponse.redirect(
        `${request.nextUrl.origin}/membership/payment/failure?error=invalid_txnid`
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

    console.log("Member updated successfully:", {
      memberId,
      status,
      feeAmount: updateData.feeAmount,
    });

    // Redirect to appropriate page
    const baseUrl = request.nextUrl.origin;
    const redirectUrl =
      status === "PAYMENT_SUBMITTED"
        ? `${baseUrl}/membership/payment/success?memberId=${memberId}`
        : `${baseUrl}/membership/payment/failure?memberId=${memberId}`;

    console.log("Success handler redirecting to:", redirectUrl);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Payment success handler error:", error);
    return NextResponse.redirect(
      `${request.nextUrl.origin}/membership/payment/failure?error=processing_error`
    );
  }
}

export async function POST(request: NextRequest) {
  // Handle POST requests the same way as GET
  return GET(request);
}

// Handle OPTIONS requests for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
