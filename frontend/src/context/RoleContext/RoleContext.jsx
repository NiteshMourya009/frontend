// src/context/RoleContext.jsx
import { createContext, useContext, useState } from 'react';

// Create a context for sharing role state throughout the application
const RoleContext = createContext();

// Provider component to wrap around components that need access to role state
export const RoleProvider = ({ children }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  
  return (
    <RoleContext.Provider value={{ selectedRole, setSelectedRole }}>
      {children}
    </RoleContext.Provider>
  );
};

// Custom hook for consuming the role context in components
export const useRole = () => useContext(RoleContext);