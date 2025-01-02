import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext'; 
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, login, logout } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      // Make the request to check authentication status using Axios
      axios
        .get('https://localhost:4000/v1/status', { withCredentials: true })
        .then((response) => {
          if (response.data.authenticated) {
            login(); // Update global state or context if logged in
          }
        })
        .catch((error) => {
          console.error('Error checking login status:', error);
        });
    }
  }, [isLoggedIn, login]);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
