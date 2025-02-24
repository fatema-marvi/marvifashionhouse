import { Rule } from "sanity";

const mensWearSchema = {
  name: "mensWear",
  title: "Men's Wear",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule: Rule) => Rule.required().min(0),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "colors",
      title: "Available Colors",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "colorName",
              title: "Color Name",
              type: "string",
            },
            {
              name: "image",
              title: "Color Image",
              type: "image",
              options: { hotspot: true },
            },
          ],
        },
      ],
    },
    {
      name: "sizes",
      title: "Available Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["S", "M", "L", "XL", "XXL"],
      },
    },
    {
      name: "sizeChart",
      title: "Size Chart Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload an image of the size chart for this product.",
    },
    {
      name: "image",
      title: "Main Product Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule: Rule) => Rule.optional(),
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    },
    {
      name: "additionalImages",
      title: "Additional Product Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule: Rule) => Rule.max(5),
    },
  ],
};

export default mensWearSchema;
