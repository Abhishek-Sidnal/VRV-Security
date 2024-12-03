import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import { Toaster } from "react-hot-toast";
import { RolesProvider } from "./context/RolesContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100 p-2 ">
          <Navbar />
          <div className="container mx-auto p-2 md:p-4">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <RolesProvider>
                      <UserManagement />
                    </RolesProvider>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/roles"
                element={
                  <ProtectedRoute>
                    <RolesProvider>
                      <RoleManagement />
                    </RolesProvider>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </div>
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
