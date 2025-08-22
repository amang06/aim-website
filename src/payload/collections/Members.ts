import type { CollectionConfig, AccessArgs } from "payload";

type MemberStatus =
  | "SUBMITTED"
  | "PENDING_PAYMENT"
  | "PAYMENT_SUBMITTED"
  | "ACTIVE"
  | "REJECTED";

type AuthUser = { id: number; role?: "admin" | "staff" | "member" };

const isAdmin = ({ req }: AccessArgs): boolean => {
  const user = req.user as AuthUser | undefined;
  return !!user && (user.role === "admin" || user.role === "staff");
};

const Members: CollectionConfig = {
  slug: "members",
  admin: {
    useAsTitle: "companyName",
    defaultColumns: ["companyName", "membershipType", "status", "createdAt"],
  },
  access: {
    read: ({ req }) => {
      if (isAdmin({ req })) return true;
      if (req.user) return { createdBy: { equals: (req.user as AuthUser).id } };
      return false;
    },
    create: () => true, // Public can submit membership applications
    update: ({ req }) => {
      if (isAdmin({ req })) return true;
      if (req.user)
        return {
          createdBy: { equals: (req.user as AuthUser).id },
          status: { in: ["SUBMITTED", "PENDING_PAYMENT"] },
        };
      return false;
    },
    delete: ({ req }) => isAdmin({ req }),
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === "create") {
          return {
            ...data,
            status: data.status || ("SUBMITTED" satisfies MemberStatus),
            createdBy: (req.user as AuthUser | undefined)?.id ?? null,
          };
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "status",
      type: "select",
      options: [
        { label: "Submitted", value: "SUBMITTED" },
        { label: "Pending Payment", value: "PENDING_PAYMENT" },
        { label: "Payment Submitted", value: "PAYMENT_SUBMITTED" },
        { label: "Active", value: "ACTIVE" },
        { label: "Rejected", value: "REJECTED" },
      ],
      defaultValue: "SUBMITTED",
      admin: { position: "sidebar" },
    },
    {
      name: "membershipType",
      type: "select",
      options: [
        { label: "Associate Member", value: "associate" },
        { label: "Allied Member", value: "allied" },
        { label: "Premier Member", value: "premier" },
      ],
      required: true,
    },
    {
      name: "companyName",
      type: "text",
      required: true,
    },
    { name: "companyType", type: "text", required: true },
    { name: "companyCategory", type: "text", required: true },
    { name: "typeOfCompany", type: "text", required: true },
    { name: "city", type: "text", required: true },
    { name: "state", type: "text", required: true },
    { name: "address", type: "textarea", required: true },
    { name: "pincode", type: "text", required: true },
    { name: "website", type: "text" },
    { name: "gstin", type: "text", required: true },
    { name: "tanNo", type: "text" },
    { name: "panNo", type: "text", required: true },
    { name: "yearOfEstablishment", type: "text", required: true },
    { name: "legalEntity", type: "text", required: true },
    { name: "globalHeadquarters", type: "text" },
    { name: "socialMediaHandle", type: "text" },

    // Contact Details
    { name: "contactDesignation", type: "text", required: true },
    { name: "contactTitle", type: "text", required: true },
    { name: "contactFirstName", type: "text", required: true },
    { name: "contactLastName", type: "text", required: true },
    { name: "contactMobile", type: "text", required: true },
    { name: "contactEmail", type: "email", required: true },

    // Company Head in India
    { name: "headDesignation", type: "text", required: true },
    { name: "headTitle", type: "text", required: true },
    { name: "headFirstName", type: "text", required: true },
    { name: "headLastName", type: "text", required: true },
    { name: "headMobile", type: "text", required: true },
    { name: "headEmail", type: "email", required: true },

    // Company Profile
    { name: "companyProfile", type: "textarea", required: true },
    {
      name: "areasOfInterest",
      type: "select",
      hasMany: true,
      options: [
        { label: "Manufacturing", value: "manufacturing" },
        { label: "IT Services", value: "it-services" },
        { label: "Consultancy", value: "consultancy" },
      ],
    },

    // Revenue & Employee Details
    { name: "totalEmployees", type: "text" },
    { name: "employeeYear", type: "text" },
    { name: "totalRevenue", type: "text" },
    { name: "revenueYear", type: "text" },

    // Business Details
    { name: "businessType", type: "text" },
    { name: "turnover", type: "text" },
    { name: "registrationNumber", type: "text" },
    { name: "gstNumber", type: "text" },
    { name: "udyamNumber", type: "text" },
    { name: "factoryRegistration", type: "text" },
    { name: "powerConnection", type: "text" },
    { name: "pollutionClearance", type: "text" },
    { name: "description", type: "textarea" },

    // Documents section removed - memorandumArticle and auditedBalanceSheet fields

    // Linkage
    {
      name: "createdBy",
      type: "relationship",
      relationTo: "users",
      admin: { position: "sidebar" },
    },

    // Payment related fields
    {
      name: "feeAmount",
      type: "number",
      required: false,
      admin: { description: "Membership fee applicable for this application" },
    },
    {
      name: "paymentReferenceId",
      type: "text",
      required: false,
      admin: { description: "Payment reference ID from PayU" },
    },
    {
      name: "paymentVerifiedAt",
      type: "date",
      admin: { position: "sidebar" },
    },
    {
      name: "activatedAt",
      type: "date",
      admin: { position: "sidebar" },
    },
    {
      name: "rejectionReason",
      type: "textarea",
      admin: { position: "sidebar" },
    },
    {
      name: "rejectedAt",
      type: "date",
      admin: { position: "sidebar" },
    },
    {
      name: "certificateSent",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description:
          "Whether the membership certificate has been sent to the member",
      },
    },
    {
      name: "certificateSentAt",
      type: "date",
      admin: {
        position: "sidebar",
        description: "Date when the membership certificate was sent",
      },
    },
  ],
};

export default Members;
