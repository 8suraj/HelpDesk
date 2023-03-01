import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = () => (props) => {
  const isAuthenticated =
    localStorage.getItem('user_token');
  if (isAuthenticated) {
    return <Component {...props} />;
  }
  return <Navigate to='/login' />;
};

export default withAuth;