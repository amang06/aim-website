import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import {
  generateInvoiceNumber,
  calculateGSTAmounts,
  generateGSTInvoice,
  type InvoiceData,
} from "@/lib/invoice";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ memberId: string }> }
) {
  try {
    const { memberId } = await params;

    if (!memberId) {
      return NextResponse.json(
        { error: "Member ID is required" },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config });

    // Fetch member by ID
    const member = await payload.findByID({
      collection: "members",
      id: memberId,
    });

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Check if member has made payment and is in PAYMENT_SUBMITTED status
    if (!member.feeAmount || member.status !== "PAYMENT_SUBMITTED") {
      return NextResponse.json(
        { error: "No payment found for this member or payment not completed" },
        { status: 400 }
      );
    }

    // Calculate GST amounts
    const { baseAmount, gstAmount } = calculateGSTAmounts(member.feeAmount);

    // Generate invoice data
    const invoiceData: InvoiceData = {
      invoiceNumber: generateInvoiceNumber(memberId),
      invoiceDate: new Date().toLocaleDateString("en-IN"),
      memberData: {
        id: memberId,
        companyName: member.companyName || "",
        membershipType: member.membershipType || "",
        contactFirstName: member.contactFirstName || "",
        contactLastName: member.contactLastName || "",
        contactEmail: member.contactEmail || "",
        contactMobile: member.contactMobile || "",
        address: member.address || "",
        city: member.city || "",
        state: member.state || "",
        pincode: member.pincode || "",
        gstin: member.gstin || "",
        panNo: member.panNo || "",
      },
      amount: {
        baseAmount,
        gstAmount,
        totalAmount: member.feeAmount,
      },
      paymentDetails: {
        referenceId: member.paymentReferenceId || undefined,
        paymentDate: member.paymentVerifiedAt
          ? new Date(member.paymentVerifiedAt).toLocaleDateString("en-IN")
          : new Date().toLocaleDateString("en-IN"),
      },
    };

    // Generate PDF
    const pdf = await generateGSTInvoice(invoiceData);
    const pdfBuffer = pdf.output("arraybuffer");

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="AIM_Invoice_${memberId}_${invoiceData.invoiceNumber.replace(
          /\//g,
          "_"
        )}.pdf"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Invoice generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate invoice",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
