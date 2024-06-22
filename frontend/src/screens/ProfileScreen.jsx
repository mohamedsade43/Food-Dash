import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserProfileMutation } from "../slices/usersApiSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...userInfo, user: { ...res } }));
        toast.success("Profile Updated");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6 mt-16 bg-background text-text dark:bg-background-dark dark:text-text-dark">
        <div className="bg-background dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center">
          <div className="w-full flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
              {userInfo.profilePicture ? (
                <img
                  src={userInfo.profilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mb-4"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-4" />
              )}
            </div>
            <div className="w-full md:w-2/3">
              {userInfo.user.isAdmin && (
                <div className="flex flex-wrap justify-center md:justify-start mb-4">
                  <button
                    onClick={() => navigate("/admin/menu-items")}
                    className="bg-background dark:bg-gray-800 border-2 border-primary text-text dark:text-text-dark hover:bg-primary dark:hover:bg-primary-dark hover:text-background dark:hover:text-background-dark px-4 py-2 rounded-md m-2"
                  >
                    Menu Items
                  </button>
                  <button
                    onClick={() => navigate("/admin/users")}
                    className="bg-background dark:bg-gray-800 border-2 border-primary text-text dark:text-text-dark hover:bg-primary dark:hover:bg-primary-dark hover:text-background dark:hover:text-background-dark px-4 py-2 rounded-md m-2"
                  >
                    Users
                  </button>
                  <button
                    onClick={() => navigate("/admin/orders")}
                    className="bg-background dark:bg-gray-800 border-2 border-primary text-text dark:text-text-dark hover:bg-primary dark:hover:bg-primary-dark hover:text-background dark:hover:text-background-dark px-4 py-2 rounded-md m-2"
                  >
                    Orders
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:w-2/3 mt-6">
            <h2 className="text-2xl font-bold text-center text-red-600 dark:text-red-400 mb-6">
              Update Profile
            </h2>
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  autoComplete="username"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
                />
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
                />
              </div>
              <div>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
                />
              </div>
              {isLoading && <Loader />}
              <button
                type="submit"
                className="w-full py-3 mt-4 text-white bg-red-500 rounded-lg shadow-lg hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileScreen;
