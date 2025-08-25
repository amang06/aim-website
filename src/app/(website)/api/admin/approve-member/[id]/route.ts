import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // Check if member is in PAYMENT_SUBMITTED status (ready for approval)
    if (member.status !== "PAYMENT_SUBMITTED") {
      return NextResponse.json(
        {
          error: "Member is not in PAYMENT_SUBMITTED status",
          currentStatus: member.status,
        },
        { status: 400 }
      );
    }

    // Update member status to ACTIVE
    const updatedMember = await payload.update({
      collection: "members",
      id: id,
      data: {
        status: "ACTIVE",
        activatedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Member approved successfully",
      member: {
        id: updatedMember.id,
        companyName: updatedMember.companyName,
        membershipType: updatedMember.membershipType,
        status: updatedMember.status,
        activatedAt: updatedMember.activatedAt,
      },
    });
  } catch (error) {
    console.error("Approve member error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to approve member",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
