const cartItemsSchema = {
  name: "cartItems",
  title: "Cart Items",
  type: "array",
  of: [
    {
      type: "object",
      fields: [
        { name: "productId", title: "Product ID", type: "string" },
        { name: "name", title: "Product Name", type: "string" },
        { name: "price", title: "Price", type: "number" },
        { name: "quantity", title: "Quantity", type: "number" },
        { name: "imageUrl", title: "Image", type: "string" }
      ]
    }
  ]
};

export default cartItemsSchema;
