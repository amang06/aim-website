import type { CollectionConfig, AccessArgs } from "payload";
import {
  revalidateMembership,
  revalidateMembershipDelete,
} from "../hooks/revalidateMemberships";

type AuthUser = { id: number; role?: "admin" | "staff" | "member" };

const isAdmin = ({ req }: AccessArgs): boolean => {
  const user = req.user as AuthUser | undefined;
  return !!user && user.role === "admin";
};

const Memberships: CollectionConfig = {
  slug: "memberships",
  admin: {
    useAsTitle: "type",
    defaultColumns: ["type", "price", "isActive", "createdAt"],
    description:
      "Manage the 3 membership types and their pricing. Only Associate, Allied, and Premier memberships are allowed.",
  },
  access: {
    read: () => true, // Public read access for membership prices
    create: ({ req }) => isAdmin({ req }),
    update: ({ req }) => isAdmin({ req }),
    delete: ({ req }) => isAdmin({ req }),
  },
  hooks: {
    afterChange: [revalidateMembership],
    afterDelete: [revalidateMembershipDelete],
  },
  fields: [
    {
      name: "type",
      type: "select",
      options: [
        { label: "Associate Member", value: "associate" },
        { label: "Allied Member", value: "allied" },
        { label: "Premier Member", value: "premier" },
      ],
      required: true,
      unique: true,
      admin: {
        description:
          "Unique identifier for the membership type (only 3 types allowed)",
      },
    },
    {
      name: "price",
      type: "number",
      required: true,
      min: 0,
      admin: {
        description: "Membership fee in INR",
      },
    },
  ],
};

export default Memberships;
