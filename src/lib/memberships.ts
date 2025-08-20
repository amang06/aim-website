import type { Membership } from "../payload-types";

export async function getMemberships(): Promise<Membership[]> {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
      }/api/memberships?sort=type`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch memberships");
    }
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error("Error fetching memberships:", error);
    return [];
  }
}

export async function getMembershipByType(
  type: string
): Promise<Membership | null> {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
      }/api/memberships?where[type][equals]=${type}&limit=1`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch membership");
    }
    const data = await response.json();
    return data.docs?.[0] || null;
  } catch (error) {
    console.error("Error fetching membership:", error);
    return null;
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
