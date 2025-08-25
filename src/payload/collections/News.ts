import type { CollectionConfig } from "payload";

const News: CollectionConfig = {
  slug: "news",
  admin: {
    useAsTitle: "title",
    defaultColumns: [
      "title",
      "category",
      "publishedDate",
      "status",
      "createdAt",
    ],
  },
  access: {
    read: () => true, // Public can read news
    create: ({ req }) => !!req.user, // Only authenticated users can create
    update: ({ req }) => !!req.user, // Only authenticated users can update
    delete: ({ req }) => !!req.user, // Only authenticated users can delete
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description: "Title of the news article",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description:
          "URL slug for the news article (leave empty to auto-generate from title)",
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === "create" || operation === "update") {
              if (!data?.slug && data?.title) {
                data.slug = data.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "");
              }
            }
            return data?.slug;
          },
        ],
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Events", value: "events" },
        { label: "Policy", value: "policy" },
        { label: "Training", value: "training" },
        { label: "Awards", value: "awards" },
        { label: "Industry News", value: "industry-news" },
        { label: "Government Updates", value: "government-updates" },
        { label: "Partnership", value: "partnership" },
        { label: "Press Release", value: "press-release" },
        { label: "Other", value: "other" },
      ],
      defaultValue: "industry-news",
    },
    {
      name: "status",
      type: "select",
      required: true,
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ],
      defaultValue: "draft",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Featured image for the news article",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      maxLength: 300,
      admin: {
        description: "Short description of the news (max 300 characters)",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      admin: {
        description: "Full content of the news article",
      },
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
      admin: {
        description: "Publication date of the news",
      },
    },
    {
      name: "author",
      type: "text",
      defaultValue: "AIM Editorial Team",
      admin: {
        description: "Author of the news article",
      },
    },
    {
      name: "authorDesignation",
      type: "text",
      admin: {
        description: "Author's designation or title",
      },
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
      admin: {
        description: "Tags for better categorization and search",
      },
    },
    {
      name: "relatedEvents",
      type: "relationship",
      relationTo: "events",
      hasMany: true,
      admin: {
        description: "Related events (if any)",
      },
    },
    {
      name: "externalUrl",
      type: "text",
      admin: {
        description: "External URL for more information (optional)",
      },
    },
    {
      name: "downloadableFiles",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "file",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "description",
          type: "text",
        },
      ],
      admin: {
        description:
          "Downloadable files related to this news (PDFs, documents, etc.)",
      },
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Feature this news on the homepage",
      },
    },
    {
      name: "isBreaking",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Mark as breaking news",
      },
    },
    {
      name: "priority",
      type: "select",
      options: [
        { label: "High", value: "high" },
        { label: "Medium", value: "medium" },
        { label: "Low", value: "low" },
      ],
      defaultValue: "medium",
      admin: {
        position: "sidebar",
        description: "Priority for homepage display order",
      },
    },
  ],
};

export default News;
