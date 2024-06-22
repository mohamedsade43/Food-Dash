import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import "./App.css";

// Lazy loading components
const LoginForm = lazy(() => import("./screens/LoginForm"));
const RegisterForm = lazy(() => import("./screens/RegistrationForm"));
const Home = lazy(() => import("./components/Home"));
const ProfileScreen = lazy(() => import("./screens/ProfileScreen"));
const UsersList = lazy(() => import("./components/admin/UsersList"));
const ForgotPassword = lazy(() => import("./screens/ForgotPassword"));
const FoodList = lazy(() => import("./components/FoodList"));
const Cart = lazy(() => import("./components/Cart"));
const ContactForm = lazy(() => import("./components/ContactForm"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const VerifyPayment = lazy(() => import("./components/VerifyPayment"));
const OrderFailure = lazy(() => import("./components/OrderFailure"));
const OrdersList = lazy(() => import("./components/admin/OrdersList"));
const OrderSuccess = lazy(() => import("./components/OrderSuccess"));
const AdminProfile = lazy(() => import("./screens/AdminProfile"));
const MenuItems = lazy(() => import("./components/admin/MenuItems"));

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
    return () => {
      document.documentElement.classList.remove(theme);
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div
        className={`app bg-background text-text dark:bg-background-dark dark:text-text-dark`}
      >
        <Header theme={theme} toggleTheme={toggleTheme} />
        <ToastContainer />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/menu-items" element={<MenuItems />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/orders" element={<OrdersList />} />
            <Route path="/verify" element={<VerifyPayment />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/admin-profile" element={<AdminProfile />} />
            <Route path="/order-failure" element={<OrderFailure />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/food-list" element={<FoodList />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
