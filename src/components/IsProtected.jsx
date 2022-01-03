import React from "react";

import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function IsAuthChecker({ children, redirectTo }) {
  const { user } = useAuthContext();

  return user ? children : <Navigate to={redirectTo} />;
}

export default IsAuthChecker;
