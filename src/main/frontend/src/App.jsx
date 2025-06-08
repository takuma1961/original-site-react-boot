import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Home from "./shop/Home";
import Products from "./shop/Products";
import ProductDetail from "./shop/ProductDetail";
import Cart from "./shop/Cart";
import OrderComplete from "./shop/OrderComplete";
import OrderHistory from "./shop/OrderHistory"

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
        <Route path="/OrderHistory" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
