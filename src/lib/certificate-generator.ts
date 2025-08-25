import { jsPDF } from "jspdf";
import { Member } from "../../payload-types";
import fs from "fs";
import path from "path";

interface CertificateData {
  member: Member;
  membershipDuration: string;
  membershipId: string;
  issueDate: string;
}

export async function generateCertificate(
  data: CertificateData
): Promise<Buffer> {
  const {
    member,
    membershipDuration,
    membershipId,
  } = data;

  // Create PDF in landscape A4 format
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  // Page dimensions (A4 landscape: 297x210mm)
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12; // Reduced from 20 to 12

  // Draw border - Thicker and more prominent
  doc.setDrawColor(44, 82, 130); // Primary blue
  doc.setLineWidth(3); // Increased from 2 to 3
  doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);

  // Inner border - Also thicker
  doc.setDrawColor(66, 153, 225); // Light blue
  doc.setLineWidth(1.5); // Increased from 1 to 1.5
  doc.rect(
    margin + 4, // Reduced from 5 to 4
    margin + 4,
    pageWidth - margin * 2 - 8, // Adjusted accordingly
    pageHeight - margin * 2 - 8
  );

  // Add decorative corners
  drawCornerDecorations(doc, margin, pageWidth, pageHeight);

  // Header - AIM Logo (image-based) - Load and display actual logo
  try {
    const logoPath = path.join(process.cwd(), "public", "images", "logo.webp");
    const logoBuffer = fs.readFileSync(logoPath);
    const logoBase64 = logoBuffer.toString("base64");
    const logoDataUrl = `data:image/webp;base64,${logoBase64}`;

    // Logo dimensions and positioning
    const logoWidth = 24; // Adjust size as needed
    const logoHeight = 24; // Adjust size as needed
    const logoX = (pageWidth - logoWidth) / 2;
    const logoY = margin + 8;

    doc.addImage(logoDataUrl, "WEBP", logoX, logoY, logoWidth, logoHeight);
  } catch (error) {
    // Fallback to text logo if image fails to load
    console.warn("Failed to load logo image, using text fallback:", error);
    doc.setFontSize(26);
    doc.setTextColor(44, 82, 130);
    doc.setFont("helvetica", "bold");
    const logoText = "AIM";
    const logoX = (pageWidth - doc.getTextWidth(logoText)) / 2;
    doc.text(logoText, logoX, margin + 22);
  }

  // Organization name - Positioned below logo
  doc.setFontSize(20); // Increased from 18
  doc.setFont("helvetica", "bold");
  doc.setTextColor(44, 82, 130);
  const orgName = "ASSOCIATION OF INDIAN MANUFACTURERS";
  const orgX = (pageWidth - doc.getTextWidth(orgName)) / 2;
  doc.text(orgName, orgX, margin + 40); // Positioned below logo

  // Subtitle
  doc.setFontSize(13); // Increased from 12
  doc.setFont("helvetica", "normal");
  doc.setTextColor(74, 85, 104);
  const subtitle = "Promoting Excellence in Indian Manufacturing";
  const subtitleX = (pageWidth - doc.getTextWidth(subtitle)) / 2;
  doc.text(subtitle, subtitleX, margin + 50); // Adjusted spacing

  // Certificate title
  doc.setFontSize(32); // Increased from 28
  doc.setFont("helvetica", "bold");
  doc.setTextColor(44, 82, 130);
  const title = "MEMBERSHIP CERTIFICATE";
  const titleX = (pageWidth - doc.getTextWidth(title)) / 2;
  doc.text(title, titleX, margin + 70); // Adjusted spacing for logo

  // Certificate content
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(45, 55, 72);

  const contentY = margin + 85; // Adjusted for logo positioning

  // "This is to certify that"
  let currentY = contentY;
  const certifyText = "This is to certify that";
  doc.text(
    certifyText,
    (pageWidth - doc.getTextWidth(certifyText)) / 2,
    currentY
  );

  // Company name
  currentY += 15; // Increased spacing
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(44, 82, 130);
  const companyName = member.companyName;
  doc.text(
    companyName,
    (pageWidth - doc.getTextWidth(companyName)) / 2,
    currentY
  );

  // "has been granted membership as"
  currentY += 18; // Increased spacing
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(45, 55, 72);
  const grantedText = "has been granted membership as";
  doc.text(
    grantedText,
    (pageWidth - doc.getTextWidth(grantedText)) / 2,
    currentY
  );

  // Membership type with background
  currentY += 15; // Increased spacing
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(44, 82, 130);
  const membershipType = getMembershipTypeLabel(member.membershipType);
  const typeWidth = doc.getTextWidth(membershipType);
  const typeX = (pageWidth - typeWidth) / 2;

  // Background rectangle for membership type
  doc.setFillColor(235, 248, 255);
  doc.rect(typeX - 8, currentY - 6, typeWidth + 16, 10, "F");
  doc.text(membershipType, typeX, currentY);

  // Details section - Moved up and removed Issue Date
  const detailsY = pageHeight - 65; // Moved up from 55
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(44, 82, 130);

  // Calculate positions for two columns instead of three
  const leftColumnX = margin + 30; // More centered
  const rightColumnX = pageWidth - margin - 80; // More centered

  // Member ID
  doc.text("Member ID:", leftColumnX, detailsY);
  doc.setFont("helvetica", "normal");
  doc.text(membershipId, leftColumnX, detailsY + 8); // Increased line spacing

  // Valid For - Fixed text wrapping
  doc.setFont("helvetica", "bold");
  doc.text("Valid For:", rightColumnX, detailsY);
  doc.setFont("helvetica", "normal");

  // Better text splitting for duration
  const maxDurationWidth = 80; // Increased width since we have more space
  const durationLines = splitTextByWidth(
    doc,
    membershipDuration,
    maxDurationWidth
  );
  durationLines.forEach((line, index) => {
    doc.text(line, rightColumnX, detailsY + 8 + index * 6); // Better line spacing
  });

  // Signatures - Adjusted for smaller margins and larger frame
  const sigY = pageHeight - 25; // Reduced from 35 to 25
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(44, 82, 130);

  // Calculate signature positions to prevent overlap - Adjusted for smaller margins
  const signatureWidth = 65; // Slightly increased from 60
  const sigSpacing = 30; // Reduced from 40 to accommodate smaller margins

  // President signature - Left side
  const presidentX = margin + sigSpacing;
  doc.setDrawColor(44, 82, 130);
  doc.setLineWidth(0.5);
  doc.line(presidentX, sigY - 12, presidentX + signatureWidth, sigY - 12);

  // Center the "President" text over the line
  const presidentText = "President";
  const presidentTextWidth = doc.getTextWidth(presidentText);
  const presidentTextX = presidentX + (signatureWidth - presidentTextWidth) / 2;
  doc.text(presidentText, presidentTextX, sigY - 4);

  // Organization text for President
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const presidentOrgText = "Association of Indian Manufacturers";
  const presidentOrgWidth = doc.getTextWidth(presidentOrgText);
  const presidentOrgX = presidentX + (signatureWidth - presidentOrgWidth) / 2;
  doc.text(presidentOrgText, presidentOrgX, sigY + 3);

  // Secretary General signature - Right side
  const secretaryX = pageWidth - margin - sigSpacing - signatureWidth;
  doc.setDrawColor(44, 82, 130);
  doc.setLineWidth(0.5);
  doc.line(secretaryX, sigY - 12, secretaryX + signatureWidth, sigY - 12);

  // Center the "Secretary General" text over the line
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  const secretaryText = "Secretary General";
  const secretaryTextWidth = doc.getTextWidth(secretaryText);
  const secretaryTextX = secretaryX + (signatureWidth - secretaryTextWidth) / 2;
  doc.text(secretaryText, secretaryTextX, sigY - 4);

  // Organization text for Secretary
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const secretaryOrgText = "Association of Indian Manufacturers";
  const secretaryOrgWidth = doc.getTextWidth(secretaryOrgText);
  const secretaryOrgX = secretaryX + (signatureWidth - secretaryOrgWidth) / 2;
  doc.text(secretaryOrgText, secretaryOrgX, sigY + 3);

  return Buffer.from(doc.output("arraybuffer"));
}

function drawCornerDecorations(
  doc: jsPDF,
  margin: number,
  pageWidth: number,
  pageHeight: number
) {
  const decorSize = 18; // Increased from 15 to 18 for larger decorations

  // Top-left decoration
  doc.setFillColor(66, 153, 225, 0.3);
  doc.triangle(
    margin,
    margin,
    margin + decorSize,
    margin,
    margin,
    margin + decorSize,
    "F"
  );

  // Top-right decoration
  doc.triangle(
    pageWidth - margin,
    margin,
    pageWidth - margin - decorSize,
    margin,
    pageWidth - margin,
    margin + decorSize,
    "F"
  );

  // Bottom-left decoration
  doc.triangle(
    margin,
    pageHeight - margin,
    margin + decorSize,
    pageHeight - margin,
    margin,
    pageHeight - margin - decorSize,
    "F"
  );

  // Bottom-right decoration
  doc.triangle(
    pageWidth - margin,
    pageHeight - margin,
    pageWidth - margin - decorSize,
    pageHeight - margin,
    pageWidth - margin,
    pageHeight - margin - decorSize,
    "F"
  );
}

// Improved text splitting function
function splitTextByWidth(
  doc: jsPDF,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(/[\s-]+/); // Split on spaces and hyphens
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = doc.getTextWidth(testLine);

    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      // Handle very long words by breaking them
      if (doc.getTextWidth(word) > maxWidth) {
        const chars = word.split("");
        let partialWord = "";
        for (const char of chars) {
          if (doc.getTextWidth(partialWord + char) <= maxWidth) {
            partialWord += char;
          } else {
            if (partialWord) lines.push(partialWord);
            partialWord = char;
          }
        }
        currentLine = partialWord;
      } else {
        currentLine = word;
      }
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}

function getMembershipTypeLabel(type: string): string {
  const typeMap: Record<string, string> = {
    associate: "Associate Member",
    allied: "Allied Member",
    premier: "Premier Member",
  };
  return typeMap[type] || type;
}
export function generateMembershipId(
  memberId: number,
  membershipType: string
): string {
  const typeCode = membershipType.charAt(0).toUpperCase();
  const year = new Date().getFullYear();
  const paddedId = memberId.toString().padStart(4, "0");
  return `AIM-${typeCode}${year}-${paddedId}`;
}

export function calculateMembershipDuration(activatedAt: string): string {
  const activationDate = new Date(activatedAt);
  const endDate = new Date(activationDate);
  endDate.setFullYear(endDate.getFullYear() + 1);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return `${activationDate.toLocaleDateString(
    "en-US",
    options
  )} - ${endDate.toLocaleDateString("en-US", options)}`;
}
