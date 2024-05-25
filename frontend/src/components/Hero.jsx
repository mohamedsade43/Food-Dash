import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-section py-16 bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="container mx-auto flex justify-center">
        <div className="p-8 bg-white rounded-lg shadow-2xl flex flex-col items-center text-center hero-card">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
            MERN Eats App
          </h1>
          <p className="text-gray-700 mb-8">
            Welcome to MERN Eats, a food delivery app built with the MERN stack.
            It uses JWT for authentication stored in HTTP-Only cookies and
            leverages Redux Toolkit for state management. Enjoy seamless and
            secure food ordering with MERN Eats.
          </p>
          <div className="flex space-x-4">
            <Link to="/login">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 custom-button">
                Sign In
              </button>
            </Link>
            <Link to="/register">
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 shadow-md hover:bg-gray-100 transition duration-300 custom-button">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
