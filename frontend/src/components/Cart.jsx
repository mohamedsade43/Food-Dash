import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart } from "../slices/cartReducer";
import Header from "./Header";
import Footer from "./Footer";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4 text-primary">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-background p-4 rounded-lg shadow-2xl">
                <div className="flex flex-col justify-between h-full">
                  <div className="flex-grow">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-62 object-cover rounded mb-4"
                    />
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-700">${item.price}</p>
                    <p className="text-gray-700">Quantity: {item.quantity}</p>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => removeFromCartHandler(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
