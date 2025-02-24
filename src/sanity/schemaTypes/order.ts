// Define the order schema object
const orderSchema = {
  name: "order",
  type: "document",
  title: "Orders",
  fields: [
    {
      name: "customer",
      type: "object",
      title: "Customer",
      fields: [
        { name: "name", type: "string", title: "Name" },
        { name: "contact", type: "string", title: "Contact" },
        { name: "address", type: "string", title: "Address" },
        { name: "city", type: "string", title: "City" },
      ],
    },
    {
      name: "orderDate",
      type: "datetime",
      title: "Order Date",
    },
    {
      name: "grandTotal",
      type: "number",
      title: "Grand Total",
    },
    {
      name: "status",
      type: "string",
      title: "Status",
      options: {
        list: ["Pending", "Dispatched", "Delivered"],
      },
    },
    {
      name: "cart",
      type: "array",
      title: "Cart Items",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Product Name" },
            { name: "selectedSize", type: "string", title: "Size" },
            { name: "selectedColor", type: "string", title: "Color" },
            { name: "quantity", type: "number", title: "Quantity" },
            { name: "imageUrl", type: "string", title: "Image URL" },  // Change to string if using URL
          ],
        },
      ],
    },
  ],
};

// Export the schema object
export default orderSchema;
