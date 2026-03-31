import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem("tokenPet");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default AuthGuard;
