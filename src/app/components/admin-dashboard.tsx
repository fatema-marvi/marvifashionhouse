"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Customer {
  name: string;
  contactNumber: string;
  address: string;
  city: string;
}

interface CartItem {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  customer: Customer;
  cartItems: CartItem[];
  paymentMethod: string;
  grandTotal: number;
  updatedAt: string;
}

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Fetch orders from Sanity
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/order");
        const data = await response.json();
        if (data.success !== false) setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Admin Dashboard - Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th className="p-3">Customer</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Address</th>
              <th className="p-3">City</th>
              <th className="p-3">Grand Total</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Updated</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-3">{order.customer.name}</td>
                <td className="p-3">{order.customer.contactNumber}</td>
                <td className="p-3">{order.customer.address}</td>
                <td className="p-3">{order.customer.city}</td>
                <td className="p-3 font-bold">Rs. {order.grandTotal}</td>
                <td className="p-3">{order.paymentMethod}</td>
                <td className="p-3">{new Date(order.updatedAt).toLocaleString()}</td>
                <td className="p-3">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-3">Order Details</h2>
            <p className="font-semibold">Customer: {selectedOrder.customer.name}</p>
            <p>Contact: {selectedOrder.customer.contactNumber}</p>
            <p>Address: {selectedOrder.customer.address}, {selectedOrder.customer.city}</p>
            <p className="font-semibold">Grand Total: Rs. {selectedOrder.grandTotal}</p>
            <p className="font-semibold">Payment Method: {selectedOrder.paymentMethod}</p>

            <h3 className="font-semibold mt-3">🛒 Cart Items:</h3>
            <ul className="mt-2 space-y-3">
              {selectedOrder.cartItems.map((item) => (
                <li key={item._id} className="flex items-center bg-gray-100 p-3 rounded-md">
                  <Image
                   src={item.imageUrl}
                   alt={item.name} 
                   className="w-12 h-12 rounded-md" />
                  <div className="ml-3">
                    <p className="font-semibold">{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p className="font-bold">Rs. {item.price * item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
