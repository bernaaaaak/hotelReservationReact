import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Hotels from "../pages/Hotels";
import HotelDetailPage from "../pages/HotelDetailPage";
import UserPage from "../pages/UserPage";
import Admin from "../pages/Admin";

// Basit bir doğrulama mekanizması, bunu gerçek bir doğrulama sistemi ile değiştirin
const isAuthenticated = () => {
  // Burada gerçek bir doğrulama sistemi kullanmanız gerekmektedir
  return true; // Örneğin, kullanıcı doğrulama durumu buraya gelecek
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={isAuthenticated() ? <Admin /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRouter />} />
        <Route path="/home" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotel/:id" element={<HotelDetailPage />} />
        <Route path="/user-page" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
