import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetFoodQuery,
  useDeleteFoodMutation,
} from "../slices/usersApiSlice";
import Loader from "./Loader";
import { addItemToCart } from "../slices/cartReducer";
import Header from "./Header";
import Footer from "./Footer";

const FoodList = () => {
  const dispatch = useDispatch();

  const addToCartHandler = (food) => {
    dispatch(addItemToCart(food));
  };
  const { data, error, isLoading } = useGetFoodQuery();
  const [deleteFood] = useDeleteFoodMutation();

  const [editing, setEditing] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleDelete = async (foodId) => {
    try {
      await deleteFood(foodId);
      alert("Food item deleted");
    } catch (error) {
      console.error("Error deleting food item", error);
    }
  };

  const handleEditClick = (food) => {
    setEditing(food._id);
    setEditFormData({
      name: food.name,
      description: food.description,
      price: food.price,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateFood({ id: editing, ...editFormData });
      setEditing(null);
      alert("Food item updated");
    } catch (error) {
      console.error("Error updating food item", error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading food items</div>;

  const foods = data?.data || []; // Accessing the food items correctly

  console.log("Foods data:", foods);

  return (
    <>
      <Header />

      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4 text-primary">Food List</h1>
        {foods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food) => (
              <div key={food._id} className="bg-background p-4 rounded-lg shadow-2xl">
                {editing === food._id ? (
                  <form onSubmit={handleEditSubmit}>
                    <div className="mb-2">
                      <label className="block text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700">Description</label>
                      <input
                        type="text"
                        name="description"
                        value={editFormData.description}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700">Price</label>
                      <input
                        type="number"
                        name="price"
                        value={editFormData.price}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex-grow">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-62 object-cover rounded mb-4"
                      />
                      <h2 className="text-xl font-semibold">{food.name}</h2>
                      <p className="text-gray-700">{food.description}</p>
                      <p className="text-gray-900 font-bold">${food.price}</p>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => handleDelete(food._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-background border border-primary shadow-2xl text-white px-4 py-2 rounded hover:bg-gray-800"
                        onClick={() => addToCartHandler(food)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No food items available.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FoodList;
