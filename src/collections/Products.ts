import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "store",
      type: "relationship",
      relationTo: "tenants",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "price",
      type: "number",
      required: true,
      admin: {
        description: "Price in the selected currency",
      },
    },
    {
      name: "compareAtPrice",
      type: "number",
      admin: {
        description: "Original price for discount calculation (optional)",
      },
    },
    {
      name: "currency",
      type: "select",
      options: ["TND", "USD", "EUR"],
      defaultValue: "TND",
      required: true,
    },
    {
      name: "sku",
      type: "text",
      unique: true,
      admin: {
        description: "Stock Keeping Unit - must be unique",
      },
    },
    {
      name: "stock",
      type: "number",
      defaultValue: 10,
      required: true,
      min: 0,
    },
    {
      name: "variants",
      type: "array",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "price",
          type: "number",
          required: true,
        },
        {
          name: "stock",
          type: "number",
          required: true,
          min: 0,
        },
        {
          name: "sku",
          type: "text",
        },
      ],
    },
    {
      name: "images",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "alt",
          type: "text",
          admin: {
            description: "Alternative text for accessibility",
          },
        },
      ],
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    {
      name: "refundPolicy",
      type: "select",
      options: ["30-day", "14-day", "7-day", "3-day", "1-day", "no-refunds"],
    },
    {
      name: "reviews",
      type: "array",
      fields: [
        {
          name: "user",
          type: "relationship",
          relationTo: "users",
        },
        {
          name: "rating",
          type: "number",
          min: 1,
          max: 5,
          required: true,
        },
        {
          name: "comment",
          type: "textarea",
        },
        {
          name: "reviewDate",
          type: "date",
          defaultValue: () => new Date().toISOString(),
        },
      ],
    },
  ],
};
