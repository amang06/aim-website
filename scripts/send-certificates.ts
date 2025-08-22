#!/usr/bin/env tsx

import { getPayload } from "payload";
import config from "../payload.config.js";
import {
  generateCertificate,
  generateMembershipId,
  calculateMembershipDuration,
} from "../src/lib/certificate-generator";
import { emailService } from "../src/lib/email-service";
import { Member } from "../payload-types";

async function sendPendingCertificates() {
  console.log("🚀 Starting certificate sending job...");

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
      limit: 100, // Process in batches to avoid overwhelming the system
    });

    console.log(
      `📋 Found ${pendingMembers.docs.length} members pending certificate delivery`
    );

    if (pendingMembers.docs.length === 0) {
      console.log("✅ No pending certificates to send");
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    for (const member of pendingMembers.docs) {
      try {
        console.log(
          `📝 Processing certificate for ${member.companyName} (ID: ${member.id})`
        );

        // Validate required fields
        if (!member.activatedAt) {
          console.error(
            `❌ Member ${member.id} is active but has no activatedAt date`
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
          console.error(
            `❌ Failed to send certificate to ${member.companyName}`
          );
          errorCount++;
        }
      } catch (error) {
        console.error(
          `❌ Error processing member ${member.id} (${member.companyName}):`,
          error
        );
        errorCount++;
      }
    }

    console.log("\n📊 Certificate sending job completed:");
    console.log(`✅ Successfully sent: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📝 Total processed: ${successCount + errorCount}`);
  } catch (error) {
    console.error("💥 Fatal error in certificate sending job:", error);
    process.exit(1);
  }
}

// Add error handling for unhandled promises
process.on("unhandledRejection", (reason, promise) => {
  console.error("🚨 Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("🚨 Uncaught Exception:", error);
  process.exit(1);
});

// Run the job
sendPendingCertificates()
  .then(() => {
    console.log("🎉 Certificate sending job finished successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Certificate sending job failed:", error);
    process.exit(1);
  });
