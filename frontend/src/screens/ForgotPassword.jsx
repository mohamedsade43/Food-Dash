import { useState } from "react";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success("Link is sent to your email!");
      console.log(res);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-background text-text dark:bg-background-dark dark:text-text-dark p-4">
        <div className="w-full max-w-sm p-8 space-y-6 bg-background dark:bg-gray-800 rounded-lg shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-red-600 dark:text-red-400">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 dark:bg-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-4 text-white bg-red-500 rounded-lg shadow-lg hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400"
            >
              Send Reset Link
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-red-600 dark:text-red-400 hover:underline"
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

export default ForgotPassword;
