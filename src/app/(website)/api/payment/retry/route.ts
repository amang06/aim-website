import { NextRequest, NextResponse } from "next/server";
import {
  getMembershipByType,
  formatPrice,
  calculateTotalWithGST,
} from "@/lib/memberships";
import { createPayUPaymentData, getPayUUrl, getPayUConfig } from "@/lib/payu";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { memberId } = body;

    if (!memberId) {
      return NextResponse.json(
        { error: "Member ID is required" },
        { status: 400 }
      );
    }

    // Get the existing member record
    const payload = await getPayload({ config });
    const member = await payload.findByID({
      collection: "members",
      id: memberId,
    });

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Get membership details from database
    const membership = await getMembershipByType(member.membershipType);
    if (!membership) {
      return NextResponse.json(
        { error: "Membership type not found" },
        { status: 404 }
      );
    }

    // Get PayU configuration
    const payuConfig = getPayUConfig();
    if (!payuConfig.merchantKey || !payuConfig.salt) {
      return NextResponse.json(
        { error: "Payment gateway configuration is incomplete" },
        { status: 500 }
      );
    }

    // Calculate total amount including GST
    const basePrice = membership.price;
    const totalAmount = calculateTotalWithGST(basePrice);

    // Update member status to PENDING_PAYMENT
    await payload.update({
      collection: "members",
      id: memberId,
      data: {
        status: "PENDING_PAYMENT",
        feeAmount: totalAmount, // Update the fee amount
      },
    });

    console.log("Updated member for retry payment:", {
      id: member.id,
      status: "PENDING_PAYMENT",
      feeAmount: totalAmount,
    });

    // Create PayU payment data
    const baseUrl =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
      request.nextUrl.origin;

    console.log("Payment URLs:", {
      baseUrl,
      NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
      VERCEL_URL: process.env.VERCEL_URL,
      requestOrigin: request.nextUrl.origin,
    });

    const successUrl = `${baseUrl}/api/payment/callback`;
    const failureUrl = `${baseUrl}/api/payment/callback`;

    const paymentData = createPayUPaymentData(
      membership.type,
      totalAmount, // Use total amount including GST
      {
        firstName: member.contactFirstName,
        lastName: member.contactLastName,
        email: member.contactEmail,
        phone: member.contactMobile,
      },
      successUrl,
      failureUrl,
      String(member.id)
    );

    // Add PayU merchant details
    const payuFormData = {
      ...paymentData,
      merchantId: payuConfig.merchantId,
    };

    return NextResponse.json({
      success: true,
      memberId: member.id,
      paymentData: payuFormData,
      payuUrl: getPayUUrl(),
      amount: totalAmount,
      baseAmount: basePrice,
      formattedAmount: formatPrice(basePrice), // This will show "₹X + GST (18%)"
    });
  } catch (error) {
    console.error("Payment retry error:", error);
    return NextResponse.json(
      { error: "Failed to retry payment" },
      { status: 500 }
    );
  }
}
