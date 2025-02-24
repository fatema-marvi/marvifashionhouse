"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const OrderConfirmation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get data from URL params or fallback
  const orderId = searchParams.get("orderId") || "N/A";
  const grandTotal = searchParams.get("grandTotal") || "0";
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // ✅ Retrieve cart items from localStorage if available
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    // ✅ Clear cart from localStorage after order completion
    localStorage.removeItem("cartItems");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-green-600">🎉 Order Confirmed! Your Order Will Be Deliver Within 10 Days.
        </h2>
        <p className="text-gray-700 mt-2">Thank you for your order.</p>

        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <p className="text-lg font-semibold">Order ID: <span className="text-blue-500">{orderId}</span></p>
          <p className="text-lg">Grand Total: <span className="font-bold">Rs. {grandTotal}</span></p>
        </div>

        <h3 className="text-lg font-semibold mt-4">🛒 Your Purchased Items</h3>
        <ul className="mt-2 space-y-3">
          {cartItems.length > 0 ? cartItems.map((item) => (
            <li key={item._id} className="flex items-center bg-gray-200 p-3 rounded-md">
              <Image
               src={item.imageUrl} 
               alt={item.name} 
               className="w-16 h-16 rounded-lg" />
              <div className="ml-3">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm">Quantity: {item.quantity}</p>
                <p className="text-sm font-bold">Rs. {item.price * item.quantity}</p>
              </div>
            </li>
          )) : <p className="text-gray-500">No items found.</p>}
        </ul>

        <button 
          onClick={() => router.push("/")} 
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
