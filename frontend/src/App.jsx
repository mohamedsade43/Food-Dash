import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./screens/LoginForm";
import RegisterForm from "./screens/RegistrationForm";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import ProfileScreen from "./screens/ProfileScreen";

import ForgotPassword from "./screens/ForgotPassword";
import FoodList from "./components/FoodList";
import Cart from "./components/Cart";
import ContactForm from "./components/ContactForm";

const App = () => {
  return (
    <Router>
      <div className="dark bg-background text-text">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/food-list" element={<FoodList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
