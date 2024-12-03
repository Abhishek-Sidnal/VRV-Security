import React, { createContext, useState, useContext } from 'react';
import { mockRoles } from '../constants';

const RolesContext = createContext();

export const useRoles = () => {
  const context = useContext(RolesContext);
  if (!context) {
    throw new Error('useRoles must be used within a RolesProvider');
  }
  return context;
};

export const RolesProvider = ({ children }) => {
  const [roles, setRoles] = useState(mockRoles);

  const addRole = (newRole) => {
    setRoles((prevRoles) => [...prevRoles, newRole]);
  };

  const editRole = (updatedRole) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => (role.id === updatedRole.id ? updatedRole : role))
    );
  };

  const deleteRole = (roleId) => {
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
  };

  return (
    <RolesContext.Provider value={{ roles, addRole, editRole, deleteRole }}>
      {children}
    </RolesContext.Provider>
  );
};
