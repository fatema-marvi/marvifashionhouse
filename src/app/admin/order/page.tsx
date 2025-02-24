"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";

const AdminDashboard = () => {
  interface Order {
    _id: string;
    customer: {
      name: string;
      contact: string;
      address: string;
      city: string;
    };
    orderDate: string;
    grandTotal: number;
    status: string;
    cart: {
      name: string;
      selectedSize: string;
      selectedColor: string;
      quantity: number;
      imageUrl: string;  // ✅ Add imageUrl to the query
    }[];
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Fetch orders from Sanity
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();

        console.log("📦 Admin Orders Fetched:", JSON.stringify(data, null, 2)); // Debugging


        //console.log("📦 Admin Orders Fetched:", data); // Debugging

        if (!Array.isArray(data)) {
          console.error("🚨 Orders API did not return an array:", data);
        } else {
          setOrders(data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Handle status update
  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="overflow-x-auto bg-white p-4 shadow-md rounded-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Order ID</th>
              <th className="border p-3">Customer</th>
              <th className="border p-3">Date</th>
              <th className="border p-3">Total</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border">
                <td className="border p-3">{order._id}</td>
                <td className="border p-3">{order.customer.name}</td>
                <td className="border p-3">{format(new Date(order.orderDate), "PPP")}</td>
                <td className="border p-3">PKR {order.grandTotal}</td>
                <td className="border p-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="border p-2 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className="border p-3">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold">Order Details</h2>
            <p><strong>Customer:</strong> {selectedOrder.customer.name}</p>
            <p><strong>Contact:</strong> {selectedOrder.customer.contact}</p>
            <p><strong>Address:</strong> {selectedOrder.customer.address}, {selectedOrder.customer.city}</p>
            <p><strong>Date:</strong> {format(new Date(selectedOrder.orderDate), "PPP")}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <h3 className="font-bold mt-3">Items</h3>
{selectedOrder.cart && selectedOrder.cart.length > 0 ? (
  <ul className="mt-2 space-y-3">
    {selectedOrder.cart.map((item, index) => (
      <li key={index} className="flex items-center gap-4 border-b pb-2">
        {/* ✅ Product Image */}
        {item.imageUrl ?(
        <Image 
        src={item.imageUrl} 
        alt={item.name} 
        width={100} // Aspect ratio based on width and height
        height={100}
        className="object-cover rounded-lg" 
        onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}/>
      ) : (
        <span className="text-gray-500">No image available</span>
      )}
        
        {/* ✅ Product Details */}
        <div>
          <p className="font-semibold">{item.name}</p>
          <p className="text-sm text-gray-600">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
          <p className="text-sm text-gray-800">Quantity: {item.quantity}</p>
        </div>
      </li>
    ))}
  </ul>
) : (
  <p className="text-gray-500">No items in the order.</p>
)}
            <button onClick={() => setSelectedOrder(null)} className="mt-3 bg-red-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
