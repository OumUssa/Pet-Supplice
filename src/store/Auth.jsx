import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const token = useState(localStorage.getItem("tokenPet"));
   
  if(!token || !<Navigate to="/signin"/>){
    <Navigate to="/signin" />
  }

  // logged in → show the page
  return children;
};

export default AuthGuard;
