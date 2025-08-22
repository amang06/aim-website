import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Member ID is required" },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config });

    // Fetch member by ID
    const member = await payload.findByID({
      collection: "members",
      id: id,
    });

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: member.id,
      companyName: member.companyName,
      membershipType: member.membershipType,
      contactFirstName: member.contactFirstName,
      contactLastName: member.contactLastName,
      contactEmail: member.contactEmail,
      contactMobile: member.contactMobile,
      feeAmount: member.feeAmount,
      status: member.status,
      // Debug: include raw member data
      debug: {
        hasFeeAmount: member.feeAmount !== undefined,
        feeAmountType: typeof member.feeAmount,
        rawFeeAmount: member.feeAmount,
      },
    });
  } catch (error) {
    console.error("Fetch member error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch member data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
