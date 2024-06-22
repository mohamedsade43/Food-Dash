import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  if (!order) {
    return <div className="text-center text-gray-700 dark:text-gray-300">No order details available.</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-background text-text dark:bg-background-dark dark:text-text-dark">
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-red-600 dark:bg-primary-dark dark:hover:bg-red-700 focus:outline-none"
      >
        <Home className="w-6 h-6" />
        Back to Home
      </button>
      <h1 className="text-4xl font-bold mb-4 text-center text-primary dark:text-primary-dark">
        Your Order
      </h1>
      <p className="text-center mb-8">
        Thanks for your order. We will call you when your order will be on the
        way.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p>${item.price}</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-semibold">
                ${item.price * item.quantity}
              </p>
            </div>
          ))}
          <div className="text-lg font-semibold">
            <p className="text-gray-700 dark:text-gray-300">Subtotal: ${order.amount}</p>
            <p className="text-gray-700 dark:text-gray-300">Delivery: $5</p>{" "}
            {/* Example delivery charge */}
            <p className="text-gray-700 dark:text-gray-300">Total: ${order.amount + 5}</p>{" "}
            {/* Example total with delivery */}
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Phone</label>
            <input
              type="text"
              value={order.address.phone}
              readOnly
              className="w-full px-4 py-2 border bg-gray-100 dark:bg-gray-700 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Street address</label>
            <input
              type="text"
              value={order.address.street}
              readOnly
              className="w-full px-4 py-2 border bg-gray-100 dark:bg-gray-700 rounded-lg"
            />
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 dark:text-gray-300">City</label>
              <input
                type="text"
                value={order.address.city}
                readOnly
                className="w-full px-4 py-2 border bg-gray-100 dark:bg-gray-700 rounded-lg"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 dark:text-gray-300">Country</label>
              <input
                type="text"
                value={order.address.country}
                readOnly
                className="w-full px-4 py-2 border bg-gray-100 dark:bg-gray-700 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
