import React from "react";
import { Navigate } from "react-router-dom";
import { loggedIn } from "../../components";
const withAuth = (Component) => (props) => {
  if (loggedIn()) {
    return <Component {...props} />;
  }
  return <Navigate to="/" />;
};

export default withAuth;
