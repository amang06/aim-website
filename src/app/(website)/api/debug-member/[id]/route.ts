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
      success: true,
      memberId: id,
      rawMemberData: member,
      feeAmountAnalysis: {
        value: member.feeAmount,
        type: typeof member.feeAmount,
        isNull: member.feeAmount === null,
        isUndefined: member.feeAmount === undefined,
        isNumber: typeof member.feeAmount === "number",
        stringValue: String(member.feeAmount),
      },
      membershipType: member.membershipType,
      status: member.status,
    });
  } catch (error) {
    console.error("Debug member error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch member data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

