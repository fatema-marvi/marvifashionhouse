const customerSchema = {
  name: "customer",
  title: "Customer",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "contactNumber", title: "Contact Number", type: "string" },
    { name: "address", title: "Address", type: "text" },
    { name: "city", title: "City", type: "string" },
    { name: "paymentMethod", title: "Payment Method", type: "string" },
    { name: "cartTotal", title: "Cart Total", type: "number" },
    { name: "deliveryCharge", title: "Delivery Charge", type: "number", default: 250 },
    { name: "grandTotal", title: "Grand Total", type: "number" },
  ],
};

export default customerSchema;
