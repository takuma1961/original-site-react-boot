import React from "react";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Home from "./pages/Home";
import Products from "./shop/Products";
import ProductDetail from "./shop/ProductDetail";
import Cart from "./shop/Cart";
import OrderComplete from "./shop/OrderComplete";
import AdminLogin from "./Auth/AdminLogin";
import AdminRegister from "./Auth/AdminRegister";
import AdminHome from "./pages/AdminHome";
import Register from "./Auth/Register";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import PortfolioHome from "./pages/portfolioHome";
import Profile from "pages/Profile";
import MyProduct from "pages/Myproduct";
import Skill from "pages/Skill";
import Contact from "pages/Contact";

function App() {
  // GitHub Pages では HashRouter を使う
  const Router =
    process.env.REACT_APP_DEPLOY_ENV === "github" ? HashRouter : BrowserRouter;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/OrderComplete" element={<OrderComplete />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminRegister" element={<AdminRegister />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/MyProduct" element={<MyProduct />} />
        <Route path="/Skill" element={<Skill />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
