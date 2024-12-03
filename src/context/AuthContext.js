import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, password) => {
    if (username === "admin" && password === "admin") {
      const userData = { username: "admin" };
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Login successful!");
      navigate("/users");
    } else {
      toast.error("Invalid credentials, please try again.");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
