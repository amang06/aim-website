import { jsPDF } from "jspdf";

// Helper function to load image as base64
async function loadImageAsBase64(imagePath: string): Promise<string> {
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error loading image:", error);
    throw error;
  }
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  memberData: {
    id: string;
    companyName: string;
    membershipType: string;
    contactFirstName: string;
    contactLastName: string;
    contactEmail: string;
    contactMobile: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    gstin?: string;
    panNo?: string;
  };
  amount: {
    baseAmount: number;
    gstAmount: number;
    totalAmount: number;
  };
  paymentDetails?: {
    referenceId?: string;
    paymentDate?: string;
  };
}

export function generateInvoiceNumber(memberId: string): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `AIM/${year}/${month}/${memberId}`;
}

export function calculateGSTAmounts(totalAmount: number): {
  baseAmount: number;
  gstAmount: number;
} {
  const baseAmount = Math.round(totalAmount / 1.18);
  const gstAmount = totalAmount - baseAmount;
  return { baseAmount, gstAmount };
}

export async function generateGSTInvoice(
  invoiceData: InvoiceData
): Promise<jsPDF> {
  const doc = new jsPDF();

  // Load logo
  let logoBase64: string | null = null;
  try {
    logoBase64 = await loadImageAsBase64("/images/logo.webp");
  } catch (error) {
    console.warn("Could not load logo, proceeding without it:", error);
  }

  // Color scheme
  const primaryColor = { r: 41, g: 128, b: 185 }; // Professional blue
  const secondaryColor = { r: 52, g: 73, b: 94 }; // Dark gray
  const accentColor = { r: 39, g: 174, b: 96 }; // Green
  const lightGray = { r: 236, g: 240, b: 241 };
  const darkGray = { r: 44, g: 62, b: 80 };

  // Helper function to draw filled rectangle
  const drawFilledRect = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    doc.rect(x, y, width, height, "F");
  };


  // Header background
  doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
  drawFilledRect(15, 15, 180, 55);

  // Add logo if available
  if (logoBase64) {
    try {
      // Add logo to the left side of header
      doc.addImage(logoBase64, "WEBP", 20, 20, 25, 25);
    } catch (error) {
      console.warn("Could not add logo to PDF:", error);
    }
  }

  // Company name in header (positioned to the right of logo)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  const textStartX = logoBase64 ? 50 : 20; // Adjust text position based on logo presence
  doc.text("Association of Indian", textStartX, 30);
  doc.text("Manufacturers", textStartX, 40);

  // Company details in header
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const detailsStartX = logoBase64 ? 50 : 20; // Align with company name
  doc.text("Technology Partner", detailsStartX, 50);
  doc.text("Skynetiks Technologies Private Limited", detailsStartX, 54);
  doc.text(
    "B-609, Logix Technova, Sector 132, NOIDA - 201 305 India",
    detailsStartX,
    58
  );
  doc.text("GST: 09AANCS8991E2ZK", detailsStartX, 62);

  // Invoice title section
  doc.setFillColor(accentColor.r, accentColor.g, accentColor.b);
  drawFilledRect(15, 70, 180, 20);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("TAX INVOICE", 20, 82);

  // Invoice details box
  doc.setFillColor(lightGray.r, lightGray.g, lightGray.b);
  drawFilledRect(130, 70, 65, 20);

  doc.setTextColor(darkGray.r, darkGray.g, darkGray.b);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE NO:", 135, 78);
  doc.text("DATE:", 135, 85);

  doc.setFont("helvetica", "normal");
  doc.text(invoiceData.invoiceNumber, 165, 78);
  doc.text(invoiceData.invoiceDate, 155, 85);

  // Bill To section - moved up by 10 units
  doc.setFillColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
  drawFilledRect(15, 100, 180, 12);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("BILL TO", 20, 109);

  // Customer details box - moved up and made taller to accommodate address lines
  doc.setDrawColor(lightGray.r, lightGray.g, lightGray.b);
  doc.setLineWidth(1);
  doc.rect(15, 115, 180, 60);

  doc.setTextColor(darkGray.r, darkGray.g, darkGray.b);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(invoiceData.memberData.companyName, 20, 125);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const contactName = `${invoiceData.memberData.contactFirstName} ${invoiceData.memberData.contactLastName}`;
  doc.text(contactName, 20, 134);

  let yPos = 142;
  if (invoiceData.memberData.address) {
    // Split long address into manageable lines
    doc.text(invoiceData.memberData.address, 20, yPos);
    yPos += 10;
    if (invoiceData.memberData.city && invoiceData.memberData.state) {
      doc.text(
        `${invoiceData.memberData.city}, ${invoiceData.memberData.state} - ${invoiceData.memberData.pincode}`,
        20,
        yPos
      );
      yPos += 6;
    }
  }

  // Tax details in two columns
  const leftColumn = 20;
  const rightColumn = 110;

  if (invoiceData.memberData.gstin) {
    doc.text(`GSTIN: ${invoiceData.memberData.gstin}`, leftColumn, yPos);
  }
  if (invoiceData.memberData.panNo) {
    doc.text(`PAN: ${invoiceData.memberData.panNo}`, rightColumn, yPos);
  }
  yPos += 6;

  // Truncate long email/phone if needed to prevent overflow
  const email = invoiceData.memberData.contactEmail;
  const mobile = invoiceData.memberData.contactMobile;

  const truncatedEmail =
    email.length > 25 ? email.substring(0, 25) + "..." : email;
  const truncatedMobile =
    mobile.length > 15 ? mobile.substring(0, 15) + "..." : mobile;

  doc.text(`Email: ${truncatedEmail}`, leftColumn, yPos);
  doc.text(`Mobile: ${truncatedMobile}`, rightColumn, yPos);

  // Items table - moved up
  const tableStartY = 175;

  // Table header
  doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
  drawFilledRect(15, tableStartY, 180, 15);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("DESCRIPTION", 20, tableStartY + 10);
  doc.text("QTY", 115, tableStartY + 10);
  doc.text("RATE", 135, tableStartY + 10);
  doc.text("AMOUNT", 165, tableStartY + 10);

  // Table rows
  let currentY = tableStartY + 15;

  // Membership row
  doc.setDrawColor(lightGray.r, lightGray.g, lightGray.b);
  doc.setLineWidth(0.5);
  doc.rect(15, currentY, 180, 12);

  doc.setTextColor(darkGray.r, darkGray.g, darkGray.b);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const membershipTypeLabel =
    invoiceData.memberData.membershipType.charAt(0).toUpperCase() +
    invoiceData.memberData.membershipType.slice(1);

  doc.text(`AIM ${membershipTypeLabel} Membership`, 20, currentY + 8);
  doc.text("1", 120, currentY + 8);
  doc.text(
    `Rs. ${invoiceData.amount.baseAmount.toLocaleString()}`,
    140,
    currentY + 8
  );
  doc.text(
    `Rs. ${invoiceData.amount.baseAmount.toLocaleString()}`,
    165,
    currentY + 8
  );

  currentY += 12;

  // CGST row
  doc.rect(15, currentY, 180, 10);
  doc.text("CGST @ 9%", 20, currentY + 6.5);
  doc.text(
    `Rs. ${Math.round(invoiceData.amount.gstAmount / 2).toLocaleString()}`,
    165,
    currentY + 6.5
  );
  currentY += 10;

  // SGST row
  doc.rect(15, currentY, 180, 10);
  doc.text("SGST @ 9%", 20, currentY + 6.5);
  doc.text(
    `Rs. ${Math.round(invoiceData.amount.gstAmount / 2).toLocaleString()}`,
    165,
    currentY + 6.5
  );
  currentY += 10;

  // Total row
  doc.setFillColor(accentColor.r, accentColor.g, accentColor.b);
  drawFilledRect(15, currentY, 180, 15);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("TOTAL AMOUNT", 20, currentY + 10);
  doc.text(
    `Rs. ${invoiceData.amount.totalAmount.toLocaleString()}`,
    165,
    currentY + 10
  );

  // Add PAID watermark in red beside the total amount
  doc.setTextColor(255, 0, 0); // Red color
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("PAID", 145, currentY + 10);

  currentY += 25;

  // Payment details (if available)
  if (
    invoiceData.paymentDetails?.referenceId ||
    invoiceData.paymentDetails?.paymentDate
  ) {
    doc.setFillColor(lightGray.r, lightGray.g, lightGray.b);
    drawFilledRect(15, currentY, 180, 20);

    doc.setTextColor(darkGray.r, darkGray.g, darkGray.b);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("PAYMENT DETAILS", 20, currentY + 8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    if (invoiceData.paymentDetails?.referenceId) {
      doc.text(
        `Reference ID: ${invoiceData.paymentDetails.referenceId}`,
        20,
        currentY + 15
      );
    }
    if (invoiceData.paymentDetails?.paymentDate) {
      doc.text(
        `Payment Date: ${invoiceData.paymentDetails.paymentDate}`,
        110,
        currentY + 15
      );
    }
    currentY += 25;
  }

  // Terms & Conditions
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(secondaryColor.r, secondaryColor.g, secondaryColor.b);
  doc.text("TERMS & CONDITIONS", 15, currentY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(darkGray.r, darkGray.g, darkGray.b);
  const terms = [
    "• This is a computer generated invoice.",
    "• Payment is non-refundable.",
    "• Membership is valid for one year from the date of activation.",
  ];

  terms.forEach((term, index) => {
    doc.text(term, 15, currentY + 8 + index * 6);
  });
  currentY += 30;

  // Footer section
  doc.setDrawColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.setLineWidth(2);
  doc.line(15, currentY, 195, currentY);

  doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("For SKYNETIKS TECHNOLOGIES PRIVATE LIMITED", 110, currentY + 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Authorized Signatory", 140, currentY + 30);

  // Removed the angled watermark as PAID is now beside the total

  return doc;
}


export async function downloadInvoice(
  invoiceData: InvoiceData,
  filename?: string
) {
  const pdf = await generateGSTInvoice(invoiceData);
  const defaultFilename = `AIM_Invoice_${
    invoiceData.memberData.id
  }_${invoiceData.invoiceNumber.replace(/\//g, "_")}.pdf`;
  pdf.save(filename || defaultFilename);
}
