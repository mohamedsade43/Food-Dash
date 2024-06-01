import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForgotUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [forgotUser] = useForgotUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotUser({ email }).unwrap();
    //   dispatch(setCredentials({ ...res }));
    //   navigate("/");

    toast.success("Link is sent to your email!")
      console.log(res);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">
          Forgot Password
        </h2>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-purple-600 hover:underline"
          >
            Register
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg shadow-lg hover:bg-gradient-to-l hover:from-orange-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
