import React, { useState, useEffect } from "react";
import { allPermissions } from "../constants";

const RoleModal = ({ role, closeModal, saveRole }) => {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (role) {
      setRoleName(role.name);
      setPermissions(role.permissions);
    }
  }, [role]);

  const togglePermission = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSave = () => {
    saveRole({ id: role?.id, name: roleName, permissions });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12  md:w-1/2">
        <h3 className="text-xl mb-4">{role ? "Edit Role" : "Add Role"}</h3>

        <div>
          <label className="block mb-2">Role Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2">Permissions</label>
          <div className="space-y-2 mb-4">
            {allPermissions.map((permission) => (
              <label key={permission} className="flex items-center">
                <input
                  type="checkbox"
                  checked={permissions.includes(permission)}
                  onChange={() => togglePermission(permission)}
                  className="mr-2"
                />
                {permission}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleModal;
