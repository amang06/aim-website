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
    const { membershipType, memberData } = body;

    if (!membershipType || !memberData) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get membership details from database
    const membership = await getMembershipByType(membershipType);
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

    // Create member record in database first
    const payload = await getPayload({ config });

    // Calculate total amount including GST
    const basePrice = membership.price;
    const totalAmount = calculateTotalWithGST(basePrice);

    const memberDataToSave = {
      ...memberData,
      membershipType,
      status: "SUBMITTED",
      feeAmount: totalAmount, // Save the total amount including GST
    };

    console.log("Creating member with data:", {
      membershipType,
      status: "SUBMITTED",
      feeAmount: totalAmount,
    });

    const member = await payload.create({
      collection: "members",
      data: memberDataToSave,
    });

    console.log("Created member:", {
      id: member.id,
      status: member.status,
    });

    // Create PayU payment data
    const baseUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
    const successUrl = `${baseUrl}/api/payment/callback`;
    const failureUrl = `${baseUrl}/api/payment/callback`;

    const paymentData = createPayUPaymentData(
      membership.type,
      totalAmount, // Use total amount including GST
      {
        firstName: memberData.contactFirstName,
        lastName: memberData.contactLastName,
        email: memberData.contactEmail,
        phone: memberData.contactMobile,
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
    console.error("Payment initiation error:", error);
    return NextResponse.json(
      { error: "Failed to initiate payment" },
      { status: 500 }
    );
  }
}
