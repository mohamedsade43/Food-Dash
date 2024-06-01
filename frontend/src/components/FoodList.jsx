import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetFoodQuery,
  useDeleteFoodMutation,
} from "../slices/usersApiSlice";
import Loader from "./Loader";

const FoodList = () => {
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Food List</h1>
      {foods.length > 0 ? (
        <ul className="space-y-4">
          {foods.map((food) => (
            <li key={food._id} className="bg-white p-4 rounded shadow">
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
                <div className="flex justify-between items-center">
                  <div>
                    <img
                      src={`uploads/${food.image}`}
                      alt={food.name}
                      className="w-32 h-32 object-cover rounded mb-4"
                    />
                    <h2 className="text-xl font-semibold">{food.name}</h2>
                    <p>{food.description}</p>
                    <p className="text-gray-500">${food.price}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleDelete(food._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => handleEditClick(food)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No food items available.</p>
      )}
    </div>
  );
};

export default FoodList;
