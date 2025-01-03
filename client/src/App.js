import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import SocialLogin from './SocialLogin';
import MyHomepage from './components/MyHomepage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Call the login status endpoint
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('https://localhost:4000/v1/login_status', {
          credentials: 'include',
          withCredentials: true
        });
        console.log("APP.js ::::::::::::::::::::: ",response.data)
        if (response.data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsAuthenticated(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isAuthenticated === null) {
    // Show a loading indicator while the login status is being checked
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="*" element={<MyHomepage />} />
        ) : (
          <Route path="*" element={<SocialLogin />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
