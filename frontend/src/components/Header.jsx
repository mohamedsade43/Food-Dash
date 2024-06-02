import { useState } from "react";
import { FaSignInAlt, FaSignOutAlt, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="container md:px-24 px-7 py-4 md:py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-primary font-bold text-2xl">
          MERN Eats
        </Link>
        <nav className="flex items-center gap-6 md:gap-8 text-gray-500 font-semibold">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link
            to="/food-list"
            className="hover:text-primary transition-colors"
          >
            Menu
          </Link>
          <Link to="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>

          {userInfo ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={toggleDropdown}
              >
                <span className="font-semibold">{userInfo?.user?.name}</span>
                <svg
                  className={`w-5 h-5 fill-current transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.555 7.5h8.889L10 12.5 5.555 7.5z" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute bg-backround shadow-2xl text-text right-0 mt-2 w-48  rounded-md  z-20">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-primary"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logoutHandler();
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-primary"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-primary rounded-full text-white px-6 py-2 hover:bg-orange-100 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-background border border-red-500 rounded-full text-white px-6 py-2 hover:bg-orange-600 transition-colors"
              >
                Register
              </Link>

              <Link to="/cart" className="relative">
                <FaShoppingCart className="text-primary" size={24} />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {totalQuantity}
                </span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
