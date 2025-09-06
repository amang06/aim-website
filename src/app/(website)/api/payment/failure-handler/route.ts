import { NextRequest, NextResponse } from "next/server";
import { verifyPayUResponse, getPayUConfig, PayUResponse } from "@/lib/payu";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET(request: NextRequest) {
  try {
    console.log("Payment failure handler GET received");

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

    console.log("PayU Failure Response:", {
      status: payuResponse.status,
      txnid: payuResponse.txnid,
      amount: payuResponse.amount,
      error_Message: payuResponse.error_Message,
    });

    // Check if we have essential data
    if (!payuResponse.status || !payuResponse.txnid) {
      console.error("No essential payment data found in failure handler");
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
      console.error("Invalid PayU response hash in failure handler");
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

    // Update member status to indicate payment failure
    const updateData = {
      status: "SUBMITTED" as const,
      paymentVerifiedAt: new Date().toISOString(),
      paymentReferenceId: payuResponse.txnid,
    };

    await payload.update({
      collection: "members",
      id: memberId,
      data: updateData,
    });

    console.log("Member updated for payment failure:", {
      memberId,
      status: updateData.status,
    });

    // Redirect to failure page
    const baseUrl = request.nextUrl.origin;
    const redirectUrl = `${baseUrl}/membership/payment/failure?memberId=${memberId}&error=${
      payuResponse.error_Message || "payment_failed"
    }`;

    console.log("Failure handler redirecting to:", redirectUrl);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Payment failure handler error:", error);
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
