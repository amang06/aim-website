import { NextRequest, NextResponse } from "next/server";
import { verifyPayUResponse, getPayUConfig } from "@/lib/payu";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const payuResponse = Object.fromEntries(formData.entries()) as any;

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

    const updateData: any = {
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
    const redirectUrl =
      status === "PAYMENT_SUBMITTED"
        ? `/membership/payment/success?memberId=${memberId}`
        : `/membership/payment/failure?memberId=${memberId}`;

    return NextResponse.redirect(new URL(redirectUrl, request.url));
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
