import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./screens/LoginForm";
import RegisterForm from "./screens/RegistrationForm";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hero from "./components/Hero";
import ProfileScreen from "./screens/ProfileScreen";

import ForgotPassword from "./screens/ForgotPassword";
import FoodList from "./components/FoodList";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/food-list" element={<FoodList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
