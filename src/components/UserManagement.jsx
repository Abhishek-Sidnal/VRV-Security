import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
import UserModal from "./UserModal";
import { useRoles } from "../context/RolesContext";
import { mockUsers } from "../constants";

const UserManagement = () => {
  const { roles } = useRoles();
  const [users, setUsers] = useState(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    setShowConfirmDelete(null);
  };

  const handleConfirmDelete = (userId) => {
    setShowConfirmDelete(userId);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(null);
  };

  const sortUsers = (users) => {
    const sortedUsers = [...users];
    sortedUsers.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sortedUsers;
  };

  const filterUsers = () => {
    let filteredUsers = users;

    if (searchQuery) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (roleFilter) {
      filteredUsers = filteredUsers.filter((user) => user.role === roleFilter);
    }

    if (statusFilter) {
      filteredUsers = filteredUsers.filter(
        (user) => user.status === statusFilter
      );
    }

    return sortUsers(filteredUsers);
  };

  const handleSortChange = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredUsers = filterUsers();

  return (
    <>
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-2xl font-bold">User </h2>
        <button
          onClick={handleAddUser}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <FaPlusCircle className="mr-2" />
          Add User
        </button>
      </div>

      <div className="flex justify-between items-center mb-4 flex-wrap flex-1 gap-2">
        <input
          type="text"
          placeholder="Search by name or email"
          className="p-2 border rounded-lg  md:w-1/3 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex  w-full  md:w-fit gap-2 justify-between">
          <select
            className="p-2 w-full border rounded-lg"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          <select
            className="p-2 border rounded-lg w-full"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500">No users found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all relative"
            >
              <span
                className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded ${
                  user.status === "Active"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {user.status}
              </span>

              <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
              <p className="text-sm text-gray-500 mb-2">Email: {user.email}</p>
              <p className="text-sm text-gray-500 mb-4">Role: {user.role}</p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleEditUser(user)}
                  className="flex items-center text-yellow-500 hover:text-yellow-600"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleConfirmDelete(user.id)}
                  className="flex items-center text-red-500 hover:text-red-600"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showConfirmDelete !== null && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleDeleteUser(showConfirmDelete)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <UserModal
          user={selectedUser}
          closeModal={() => setIsModalOpen(false)}
          saveUser={(user) => {
            if (selectedUser) {
              setUsers(users.map((u) => (u.id === user.id ? user : u)));
            } else {
              setUsers([...users, { ...user, id: users.length + 1 }]);
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default UserManagement;
