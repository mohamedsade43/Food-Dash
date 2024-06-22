import React, { useState } from "react";
import { useGetOrdersQuery } from "../../slices/usersApiSlice";
import Loader from "../Loader";
import Header from "../Header";
import Footer from "../Footer";

const OrdersList = () => {
  const { data, error, isLoading } = useGetOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading orders</div>;

  const orders = data?.data || [];

  const handleShowOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4 text-center mt-14 text-primary dark:text-primary-dark">
          Orders List
        </h1>
        {selectedOrder ? (
          <div className="bg-background dark:bg-gray-800 text-text dark:text-gray-300 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Order Details
            </h2>
            <p>
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p>
              <strong>Payment Status:</strong>{" "}
              {selectedOrder.isPaid ? "Paid" : "Not paid"}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>
            <h3 className="text-xl font-bold mt-4">Items:</h3>
            <ol className="list-disc list-inside">
              {selectedOrder.items.map((item, index) => (
                <li key={index} className="mt-2">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p>{item.name}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="flex justify-center">
              <button
                onClick={handleBackToList}
                className="mt-6 bg-primary dark:bg-primary-dark text-white text-xl font-semibold px-6 py-2 rounded hover:bg-red-600 dark:hover:bg-red-800"
              >
                Back to list
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 lg:w-2/4 sm:w-2/4 mx-auto">
            {orders.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between bg-background dark:bg-gray-800 text-text dark:text-gray-300 p-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`px-3 py-1 rounded-full text-white ${
                      order.isPaid ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Not paid"}
                  </div>
                  <div>
                    <div className="font-bold">{order._id}</div>
                    <div>{order.items.map((item) => item.name).join(", ")}</div>
                  </div>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {new Date(order.createdAt).toLocaleString()}
                </div>
                <button
                  onClick={() => handleShowOrder(order)}
                  className="bg-primary dark:bg-primary-dark text-white px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-800"
                >
                  Show order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrdersList;
