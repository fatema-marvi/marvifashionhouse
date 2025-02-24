"use client";

import { useState } from "react";
import { useCart } from "@/app/components/context/cartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();

  // Calculate totals
  const calculatedSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const calculatedDeliveryCharge = cart.length > 0 ? 250 : 0;
  const calculatedGrandTotal = calculatedSubtotal + calculatedDeliveryCharge;

  // Customer Details State
  const [customer, setCustomer] = useState({
    name: "",
    contact: "",
    address: "",
    city: "",
  });

  const paymentMethod = useState("cod"); // Default to COD
  const [message, setMessage] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Handle Order Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate fields
    if (!customer.name || !customer.contact || !customer.address || !customer.city) {
      setMessage("❌ Please fill in all the fields");
      return;
    }

    // Order data
    const orderData = {
      _type: "order",
      customer,
      cartItems: cart,
      subtotal: calculatedSubtotal,
      deliveryCharge: 250,
      grandTotal: calculatedGrandTotal,
      paymentMethod,
      status: "Pending",
      orderDate: new Date().toISOString(),
    };

    console.log("📦 Order Submitted:", orderData);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setOrderPlaced(true);
        clearCart();
      } else {
        setMessage("❌ Order submission failed.");
      }
    } catch (error) {
      console.error("Order error:", error);
      setMessage("❌ Something went wrong!");
    }
  };

  //   // Simulate API request
  //   setTimeout(() => {
  //     setOrderPlaced(true);
  //     clearCart();
  // }, 1500);

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      {!orderPlaced ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-3">Customer Details</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={customer.name}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
              required
            />

            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={customer.contact}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
              required
            />

            <input
              type="text"
              name="address"
              placeholder="House No, Area, Road Name, Nearby Place"
              value={customer.address}
        onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={customer.city}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
              required
            />

            {/* Order Summary */}
            <div className="mt-4 bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
              <p>Subtotal: PKR {calculatedSubtotal.toFixed(2)}</p>
              <p>Delivery Charges: PKR {calculatedDeliveryCharge}</p>
              <p className="font-bold text-lg">Grand Total: PKR {calculatedGrandTotal.toFixed(2)}</p>
            </div>

            {message && <p className="mt-3 text-center text-red-600 font-semibold">{message}</p>}

            <button type="submit" className="mt-4 bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition">
              Place Order
            </button>
          </form>
        </>
      ) : (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold text-green-600">🎉 Your Order is Placed!</h1>
            <p className="mt-3 text-lg font-semibold">
              Your order has been placed successfully. It will be delivered within **7 working days**.😊
            </p>
            
            <p className="mt-2 text-gray-600">Thank you for shopping with Marvi Fashion House!</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
