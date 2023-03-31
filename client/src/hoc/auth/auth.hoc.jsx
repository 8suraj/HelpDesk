import React from "react";
import { Navigate } from "react-router-dom";
import { loggedIn, getToken } from "../../components";
import jwt_decode from "jwt-decode";
export const withAuthRaiser = (Component) => (props) => {
  if (loggedIn()) {
    return <Component {...props} />;
  }
  return <Navigate to="/" />;
};

export const withAuthResolver = (Component) => (props) => {
  console.log();
  if (loggedIn() && jwt_decode(getToken()).isResolver) {
    return <Component {...props} />;
  }
  return <Navigate to="/" />;
};
