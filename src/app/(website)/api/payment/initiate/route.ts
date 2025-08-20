import { NextRequest, NextResponse } from "next/server";
import { getMembershipByType, formatPrice } from "@/lib/memberships";
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

    const memberDataToSave = {
      ...memberData,
      membershipType,
      status: "SUBMITTED",
    };

    console.log("Creating member with data:", {
      membershipType,
      status: "SUBMITTED",
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
    const successUrl = `${baseUrl}/membership/payment/success?memberId=${member.id}`;
    const failureUrl = `${baseUrl}/membership/payment/failure?memberId=${member.id}`;

    const paymentData = createPayUPaymentData(
      membership.type,
      membership.price,
      {
        firstName: memberData.contactFirstName,
        lastName: memberData.contactLastName,
        email: memberData.contactEmail,
        phone: memberData.contactMobile,
      },
      successUrl,
      failureUrl,
      member.id
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
      amount: membership.price,
      formattedAmount: formatPrice(membership.price),
    });
  } catch (error) {
    console.error("Payment initiation error:", error);
    return NextResponse.json(
      { error: "Failed to initiate payment" },
      { status: 500 }
    );
  }
}
