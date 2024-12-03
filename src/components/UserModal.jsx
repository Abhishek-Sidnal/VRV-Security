import React, { useState, useEffect } from "react";
import { useRoles } from "../context/RolesContext";

const UserModal = ({ user, closeModal, saveUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState("");
  const { roles } = useRoles();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setStatus(user.status);
    }
  }, [user]);

  const handleSave = () => {
    if (!name || !email) {
      setError("Name and Email are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    saveUser({ id: user?.id, name, email, role, status });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/3">
        <h3 className="text-xl font-semibold mb-4 text-center">
          {user ? "Edit User" : "Add User"}
        </h3>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div>
          <label className="block mb-2 text-sm">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="User Name"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="User Email"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Role</label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            aria-label="User Role"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm">Status</label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="User Status"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
