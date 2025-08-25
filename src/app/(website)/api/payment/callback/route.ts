import { NextRequest, NextResponse } from "next/server";
import { verifyPayUResponse, getPayUConfig, PayUResponse } from "@/lib/payu";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const payuResponse = Object.fromEntries(
      formData.entries()
    ) as unknown as PayUResponse;

    // Verify the response hash
    const payuConfig = getPayUConfig();
    const isValidResponse = verifyPayUResponse(payuResponse, payuConfig.salt);

    if (!isValidResponse) {
      console.error("Invalid PayU response hash");
      return NextResponse.json({ error: "Invalid response" }, { status: 400 });
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
  // Handle GET requests (PayU sometimes sends GET requests)
  return POST(request);
}
