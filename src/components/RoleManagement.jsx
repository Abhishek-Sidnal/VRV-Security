import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
import RoleModal from "./RoleModal";
import { useRoles } from "../context/RolesContext";

const RoleManagement = () => {
  const { roles, addRole, editRole, deleteRole } = useRoles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);

  const handleAddRole = () => {
    setSelectedRole(null);
    setIsModalOpen(true);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleDeleteRole = (roleId) => {
    deleteRole(roleId);
    setShowConfirmDelete(null);
  };

  const handleConfirmDelete = (roleId) => {
    setShowConfirmDelete(roleId);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Role</h2>
        <button
          onClick={handleAddRole}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <FaPlusCircle className="mr-2" />
          Add Role
        </button>
      </div>
      {roles.length === 0 ? (
        <p className="text-center text-gray-500">No users found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-semibold mb-2">{role.name}</h3>
              <p className="text-sm text-gray-500 mb-4">
                Permissions: {role.permissions.join(", ")}
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleEditRole(role)}
                  className="flex items-center text-yellow-500 hover:text-yellow-600"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleConfirmDelete(role.id)}
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
              Are you sure you want to delete this role?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleDeleteRole(showConfirmDelete)}
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
        <RoleModal
          role={selectedRole}
          closeModal={() => setIsModalOpen(false)}
          saveRole={(role) => {
            if (selectedRole) {
              editRole(role);
            } else {
              addRole({ ...role, id: roles.length + 1 });
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default RoleManagement;
