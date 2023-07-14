import React from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route element={<Home />} path="/home" />
        <Route element={<Auth />} path="/auth" />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;