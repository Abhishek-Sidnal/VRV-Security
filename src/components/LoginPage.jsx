import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/users");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl text-center font-bold mb-4"> Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
