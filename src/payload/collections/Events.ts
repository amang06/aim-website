import type { CollectionConfig } from "payload";

const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "eventDate", "status", "createdAt"],
  },
  access: {
    read: () => true, // Public can read events
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
        description: "Title of the event",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description:
          "URL slug for the event (leave empty to auto-generate from title)",
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
        { label: "Conference", value: "conference" },
        { label: "Workshop", value: "workshop" },
        { label: "Awards", value: "awards" },
        { label: "Seminar", value: "seminar" },
        { label: "Training", value: "training" },
        { label: "Networking", value: "networking" },
        { label: "Other", value: "other" },
      ],
      defaultValue: "conference",
    },
    {
      name: "status",
      type: "select",
      required: true,
      options: [
        { label: "Unpublished", value: "unpublished" },
        { label: "Published", value: "published" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Completed", value: "completed" },
      ],
      defaultValue: "unpublished",
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
        description: "Featured image for the event",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      maxLength: 300,
      admin: {
        description: "Short description of the event (max 300 characters)",
      },
    },
    {
      name: "description",
      type: "richText",
      required: true,
      admin: {
        description: "Full description of the event",
      },
    },
    {
      name: "eventDate",
      type: "date",
      required: true,
      admin: {
        description: "Date of the event",
      },
    },
    {
      name: "eventTime",
      type: "text",
      required: true,
      admin: {
        description: "Time of the event (e.g., 9:00 AM - 6:00 PM)",
      },
    },
    {
      name: "location",
      type: "text",
      required: true,
      admin: {
        description: "Location of the event (e.g., Lucknow, Uttar Pradesh)",
      },
    },
    {
      name: "venue",
      type: "text",
      admin: {
        description: "Specific venue details",
      },
    },
    {
      name: "agenda",
      type: "richText",
      admin: {
        description: "Event agenda or schedule",
      },
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Feature this event on the homepage",
      },
    },
  ],
};

export default Events;
