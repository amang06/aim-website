import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET() {
  try {
    const payload = await getPayload({ config });

    // Fetch all memberships
    const memberships = await payload.find({
      collection: "memberships",
      sort: "type",
    });

    // Format the response
    const membershipPrices = memberships.docs.map((membership) => ({
      id: membership.id,
      type: membership.type,
      price: membership.price,
    }));

    return NextResponse.json({
      success: true,
      memberships: membershipPrices,
      total: memberships.totalDocs,
    });
  } catch (error) {
    console.error("Error fetching membership prices:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch membership prices",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
