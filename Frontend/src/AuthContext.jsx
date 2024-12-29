import React, { createContext, useState, useContext } from "react";
import axios from "axios"; // Import Axios

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/users/login", {
        username,
        password,
      });

      if (response.status === 200) {
        console.log("User logged in");
        setUserData(response.data);
        localStorage.setItem("username", username);
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  // Signup function
  const signup = async (username, password, email) => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/users/signup", {
        username,
        password,
        email,
      });

      if (response.status === 200) {
        console.log("User registered");
        setUserData(response.data);
        localStorage.setItem("username", username);
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ userData, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);
