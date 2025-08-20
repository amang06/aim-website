import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { reason } = body;

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

    // Check if member is in a valid status for rejection
    if (!["SUBMITTED", "PAYMENT_SUBMITTED"].includes(member.status)) {
      return NextResponse.json(
        {
          error: "Member cannot be rejected in current status",
          currentStatus: member.status,
        },
        { status: 400 }
      );
    }

    // Update member status to REJECTED
    const updatedMember = await payload.update({
      collection: "members",
      id: id,
      data: {
        status: "REJECTED",
        rejectionReason: reason || "Application rejected by admin",
        rejectedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Member rejected successfully",
      member: {
        id: updatedMember.id,
        companyName: updatedMember.companyName,
        membershipType: updatedMember.membershipType,
        status: updatedMember.status,
        rejectionReason: updatedMember.rejectionReason,
        rejectedAt: updatedMember.rejectedAt,
      },
    });
  } catch (error) {
    console.error("Reject member error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to reject member",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
