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

    let member;

    // Check if member already exists by CIN (registrationNumber)
    if (memberData.registrationNumber) {
      try {
        const existingMembers = await payload.find({
          collection: "members",
          where: {
            registrationNumber: {
              equals: memberData.registrationNumber,
            },
          },
          limit: 1,
        });

        if (existingMembers.docs.length > 0) {
          // Update existing member instead of creating new one
          const existingMember = existingMembers.docs[0];
          console.log("Found existing member with CIN:", {
            id: existingMember.id,
            companyName: existingMember.companyName,
            currentStatus: existingMember.status,
          });

          member = await payload.update({
            collection: "members",
            id: existingMember.id,
            data: {
              ...memberDataToSave,
              // Preserve the original creation date and other metadata
              createdAt: existingMember.createdAt,
            },
          });

          console.log("Updated existing member:", {
            id: member.id,
            status: member.status,
            companyName: member.companyName,
          });
        } else {
          // No existing member found, create new one
          console.log(
            "No existing member found, creating new member with data:",
            {
              membershipType,
              status: "SUBMITTED",
              feeAmount: totalAmount,
              registrationNumber: memberData.registrationNumber,
            }
          );

          member = await payload.create({
            collection: "members",
            data: memberDataToSave,
          });

          console.log("Created new member:", {
            id: member.id,
            status: member.status,
            companyName: member.companyName,
          });
        }
      } catch (error) {
        console.error("Error checking for existing member:", error);
        // Fallback to creating new member if check fails
        member = await payload.create({
          collection: "members",
          data: memberDataToSave,
        });
        console.log("Created member (fallback):", {
          id: member.id,
          status: member.status,
        });
      }
    } else {
      // No CIN provided, create new member
      console.log("No CIN provided, creating new member with data:", {
        membershipType,
        status: "SUBMITTED",
        feeAmount: totalAmount,
      });

      member = await payload.create({
        collection: "members",
        data: memberDataToSave,
      });

      console.log("Created member:", {
        id: member.id,
        status: member.status,
      });
    }

    // Create PayU payment data
    const baseUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
    const successUrl = `${baseUrl}/api/payment/success-handler`;
    const failureUrl = `${baseUrl}/api/payment/failure-handler`;

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
