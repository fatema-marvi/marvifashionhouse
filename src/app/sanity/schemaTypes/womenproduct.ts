import { Rule } from 'sanity';  // Import the correct type for Rule

// Define the schema object for women's wear products
const womenProductSchema = {
  name: 'womensWear',
  title: 'Women\'s Wear',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: Rule) => Rule.required().min(0),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'colors',
      title: 'Available Colors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'colorName',
              title: 'Color Name',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Color Image',
              type: 'image',
              options: { hotspot: true },
            },
          ],
        },
      ],
    },
    {
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['stitched', 'unstitched'],
      },
    },
    {
      name: 'image',
      title: 'Main Product Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'createdAt', // New field for sorting
      title: 'Created At',
      type: 'datetime',
      initialValue: (new Date()).toISOString(), // Auto-set when added
    },
  ],
};

// Export the schema object
export default womenProductSchema;
