import type { CollectionConfig, AccessArgs } from "payload";

type AuthUser = { id: number; role?: "admin" | "staff" | "member" };

const isAdmin = ({ req }: AccessArgs): boolean => {
  const user = req.user as AuthUser | undefined;
  return !!user && user.role === "admin";
};

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    read: ({ req }) => {
      if (isAdmin({ req })) return true;
      if (req.user) return { id: { equals: (req.user as AuthUser).id } };
      return false;
    },
    create: isAdmin,
    update: ({ req }) => {
      if (isAdmin({ req })) return true;
      if (req.user) return { id: { equals: (req.user as AuthUser).id } };
      return false;
    },
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      defaultValue: "member",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Staff", value: "staff" },
        { label: "Member", value: "member" },
      ],
    },
  ],
};

export default Users;
