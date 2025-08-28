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

// Verify the request is from Vercel Cron
function verifyVercelCronRequest(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("CRON_SECRET environment variable is not set");
    return false;
  }

  // Vercel cron sends: Authorization: Bearer <CRON_SECRET>
  return authHeader === `Bearer ${cronSecret}`;
}

export async function POST(request: NextRequest) {
  console.log("🚀 Certificate sending cron job triggered");

  // Verify this is a legitimate cron request
  if (!verifyVercelCronRequest(request)) {
    console.error("❌ Unauthorized cron request");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config });

    // Find all active members who haven't received their certificates yet
    const pendingMembers = await payload.find({
      collection: "members",
      where: {
        and: [
          {
            status: {
              equals: "ACTIVE",
            },
          },
          {
            certificateSent: {
              equals: false,
            },
          },
        ],
      },
      limit: 50, // Process in smaller batches for cron jobs
    });

    console.log(
      `📋 Found ${pendingMembers.docs.length} members pending certificate delivery`
    );

    if (pendingMembers.docs.length === 0) {
      console.log("✅ No pending certificates to send");
      return NextResponse.json({
        success: true,
        message: "No pending certificates to send",
        processed: 0,
        successful: 0,
        failed: 0,
      });
    }

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const member of pendingMembers.docs) {
      try {
        console.log(
          `📝 Processing certificate for ${member.companyName} (ID: ${member.id})`
        );

        // Validate required fields
        if (!member.activatedAt) {
          const errorMsg = `Member ${member.id} is active but has no activatedAt date`;
          console.error(`❌ ${errorMsg}`);
          errors.push(errorMsg);
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
        console.log(`🎨 Generating certificate for ${member.companyName}...`);
        const certificateBuffer = await generateCertificate({
          member: member as Member,
          membershipDuration,
          membershipId,
          issueDate,
        });

        // Send email with certificate
        console.log(
          `📧 Sending certificate email to ${member.contactEmail}...`
        );
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

          console.log(
            `✅ Certificate sent successfully to ${member.companyName}`
          );
          successCount++;
        } else {
          const errorMsg = `Failed to send certificate to ${member.companyName}`;
          console.error(`❌ ${errorMsg}`);
          errors.push(errorMsg);
          errorCount++;
        }
      } catch (error) {
        const errorMsg = `Error processing member ${member.id} (${
          member.companyName
        }): ${error instanceof Error ? error.message : String(error)}`;
        console.error(`❌ ${errorMsg}`);
        errors.push(errorMsg);
        errorCount++;
      }
    }

    console.log("\n📊 Certificate sending cron job completed:");
    console.log(`✅ Successfully sent: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📝 Total processed: ${successCount + errorCount}`);

    return NextResponse.json({
      success: true,
      message: "Certificate sending job completed",
      processed: successCount + errorCount,
      successful: successCount,
      failed: errorCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("💥 Fatal error in certificate sending cron job:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Certificate sending job failed",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

// Also handle GET requests for manual testing
export async function GET(request: NextRequest) {
  // Only allow GET requests in development or with proper authentication
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "GET requests not allowed in production" },
      { status: 405 }
    );
  }

  console.log("🧪 Manual certificate sending test triggered");
  return POST(request);
}
