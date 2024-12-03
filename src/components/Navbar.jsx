import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaBars,
  FaSignOutAlt,
  FaUsers,
  FaCogs,
  FaSignInAlt,
} from "react-icons/fa";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to close the menu on mobile
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-blue-600 p-2 md:p-4 text-white shadow-lg rounded ">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl md:text-2xl  font-semibold">VRV Security’s</h1>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white text-xl md:text-2xl "
        >
          <FaBars />
        </button>

        <div
          className={`lg:flex space-x-6 hidden ${isMenuOpen ? "block" : "lg:flex"}`}
        >
          {isAuthenticated ? (
            <>
              <Link
                to="/users"
                onClick={closeMenu} // Close the menu on link click
                className="flex items-center space-x-2 mr-4 hover:bg-blue-700 p-2 rounded-md"
              >
                <FaUsers />
                <span>Users</span>
              </Link>
              <Link
                to="/roles"
                onClick={closeMenu} // Close the menu on link click
                className="flex items-center space-x-2 mr-4 hover:bg-blue-700 p-2 rounded-md"
              >
                <FaCogs />
                <span>Roles</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu} // Close the menu on link click
              className="flex items-center space-x-2 mr-4 hover:bg-blue-700 p-2 rounded-md"
            >
              <FaSignInAlt />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-blue-500 p-4 mt-2 space-y-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/users"
                onClick={closeMenu} // Close the menu on link click
                className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md"
              >
                <FaUsers />
                <span>Users</span>
              </Link>
              <Link
                to="/roles"
                onClick={closeMenu} // Close the menu on link click
                className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md"
              >
                <FaCogs />
                <span>Roles</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu} // Close the menu on link click
              className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md"
            >
              <FaSignInAlt />
              <span>Login</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
