import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import {
  generateCertificate,
  generateMembershipId,
  calculateMembershipDuration,
} from "@/lib/certificate-generator";
import { emailService } from "@/lib/email-service";
import { Member } from "../../../../../../payload-types";

export async function POST(request: NextRequest) {
  try {
    const { memberId } = await request.json();

    const payload = await getPayload({ config });

    // If memberId is provided, send certificate for specific member
    // Otherwise, send certificates for all pending members
    const query = memberId
      ? {
          collection: "members" as const,
          where: {
            and: [
              { id: { equals: parseInt(memberId) } },
              { status: { equals: "ACTIVE" } },
              { certificateSent: { equals: false } },
            ],
          },
        }
      : {
          collection: "members" as const,
          where: {
            and: [
              { status: { equals: "ACTIVE" } },
              { certificateSent: { equals: false } },
            ],
          },
          limit: 50, // Limit to prevent timeout
        };

    const pendingMembers = await payload.find(query);

    if (pendingMembers.docs.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No pending certificates to send",
        processed: 0,
      });
    }

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const member of pendingMembers.docs) {
      try {
        // Validate required fields
        if (!member.activatedAt) {
          errors.push(
            `Member ${member.id} is active but has no activatedAt date`
          );
          errorCount++;
          continue;
        }

        // Generate membership data
        const membershipId = generateMembershipId(
          member.id,
          member.membershipType
        );
        const membershipDuration = calculateMembershipDuration(
          member.activatedAt
        );
        const issueDate = new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        // Generate certificate PDF
        const certificateBuffer = await generateCertificate({
          member: member as Member,
          membershipDuration,
          membershipId,
          issueDate,
        });

        // Send email with certificate
        const emailSent = await emailService.sendMembershipCertificate(
          member as Member,
          certificateBuffer
        );

        if (emailSent) {
          // Mark certificate as sent
          await payload.update({
            collection: "members",
            id: member.id,
            data: {
              certificateSent: true,
              certificateSentAt: new Date().toISOString(),
            },
          });

          successCount++;
        } else {
          errors.push(`Failed to send certificate to ${member.companyName}`);
          errorCount++;
        }
      } catch (error) {
        const errorMessage = `Error processing member ${member.id} (${
          member.companyName
        }): ${error instanceof Error ? error.message : "Unknown error"}`;
        errors.push(errorMessage);
        errorCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Certificate sending completed",
      processed: successCount + errorCount,
      successful: successCount,
      failed: errorCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Certificate sending API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send certificates",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
