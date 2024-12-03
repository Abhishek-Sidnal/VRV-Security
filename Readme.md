# VRV Security Dashboard

## Project Overview
The VRV Security Dashboard is a web-based admin panel designed for managing users, roles, and permissions. It provides an intuitive UI for managing users, roles, and their permissions, along with authentication functionalities for the admin.

- **Demo link**: [Click Here](https://vrv-security-ay5bf2r9u-abhishek-sidnals-projects.vercel.app/)
- #### Login Credentials: 
    - **Username**: ``` admin ```
    - **Password**: ``` admin ```

## Features
- **User Management**: 
  - Add, edit, delete, and view users.
  - Search and filter users by name, email, role, or status.
  
- **Role Management**:
  - Create, edit, and delete roles.
  - Assign and modify permissions for each role.

- **Authentication**:
  - Login page with authentication.
  - User session management using `AuthContext`.
  
- **Responsive Design**:
  - Fully responsive with a mobile-friendly navigation bar.

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/vrv-security-dashboard.git
cd vrv-security-dashboard
```

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Abhishek-Sidnal/VRV-Security.git
cd vrv-security-dashboard
```

### 2. Install dependencies
```bash
npm install
```
### 3. Start the development server
```bash
npm start

```
## Folder Structure
```
src/
├── components/             # React components (UserManagement, RoleManagement, etc.)
├── context/                # Contexts (AuthContext, RolesContext)
├── constants/              # Constants like mock data
├── App.js                  # Main App component
├── index.js                # Entry point (renders App)

```
## Contexts

### **AuthContext**
Manages user authentication state. Provides the following:
- `isAuthenticated`: Boolean value indicating if the user is logged in.
- `login(username: string, password: string)`: Function to authenticate the user with the provided username and password.
- `logout()`: Function to log out the user.

### **RolesContext**
Manages roles and permissions. Provides the following:
- `roles`: Array of roles in the system, each with permissions.
- `addRole(newRole: Role)`: Function to add a new role.
- `editRole(updatedRole: Role)`: Function to edit an existing role.
- `deleteRole(roleId: number)`: Function to delete a role by ID.

---

## Components

### **Navbar**
- A responsive navigation bar that includes links to **Users**, **Roles**, and **Login/Logout**.
- The navigation adjusts for mobile and desktop views.

### **LoginPage**
- Authentication page where the admin can log in by entering a username and password.
- Handles the login process and redirects the user to the dashboard upon successful authentication.
- ##### Login Credentials: 
    - ##### Username: ``` admin ```
    - ##### Password: ``` admin ```
### **UserManagement**
- Manage the list of users:
  - Add, edit, delete users.
  - Search and filter users by name, email, role, or status.

### **RoleManagement**
- Manage roles and permissions:
  - Create, edit, delete roles.
  - Assign and modify permissions for each role.

### **UserModal**
- Modal component for adding/editing users:
  - Handles user information (name, email, role, status).
  - Used in the **UserManagement** component.

### **RoleModal**
- Modal component for adding/editing roles:
  - Handles role information (name, permissions).
  - Used in the **RoleManagement** component.

---

## Libraries Used

- **React**: Front-end UI library.
- **React Router**: For routing between pages.
- **React Icons**: For rendering icons in the UI.
- **React Hot Toast**: For toast notifications to alert users.
- **TailwindCSS**: For utility-first styling in the app.

---




