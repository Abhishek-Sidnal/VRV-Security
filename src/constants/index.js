export const mockRoles = [
  { id: 1, name: "Admin", permissions: ["Create", "Read", "Write", "Delete", "Manage Users", "Manage Roles"] },
  { id: 2, name: "Editor", permissions: ["Create", "Read", "Write"] },
  { id: 3, name: "User", permissions: ["Read"] },
];

export const mockUsers = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Editor", status: "Inactive" },
  { id: 3, name: "Sam Wilson", email: "sam.wilson@example.com", role: "User", status: "Active" },
];

export const allPermissions = [
  "Create",
  "Read",
  "Write",
  "Delete",
  "Manage Users",
  "Manage Roles",
];
