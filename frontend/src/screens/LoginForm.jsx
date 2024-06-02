import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      console.log(res);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
     <Header />
   
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
     
      <div className="w-full max-w-sm p-8 space-y-6 bg-background rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-red-600">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white bg-red-500 rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Login
          </button>
        </form>
        <div className="text-center text-gray-500">or login with provider</div>
        <button className="flex items-center justify-center w-full py-3 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none">
          <img
            src="/path/to/google-logo.png" // Replace with the actual path to Google logo
            alt="Google logo"
            className="w-6 h-6 mr-2"
          />
          <span>Login with Google</span>
        </button>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-red-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default LoginForm;
