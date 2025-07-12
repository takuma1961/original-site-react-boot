import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Home from "./pages/Home";
import Products from "./shop/Products";
import ProductDetail from "./shop/ProductDetail";
import Cart from "./shop/Cart";
import OrderComplete from "./shop/OrderComplete";
import Career from "./pages/Career";
import AdminLogin from "./Auth/AdminLogin";
import AdminRegister from "./Auth/AdminRegister";
import AdminHome from "./pages/AdminHome";
import Register from "./Auth/Register";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/OrderComplete" element={<OrderComplete />} />
        <Route path="/Career" element={<Career />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminRegister" element={<AdminRegister />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>
    </Router>
  );
}

export default App;
