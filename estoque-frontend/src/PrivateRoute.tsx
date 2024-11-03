import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const PrivateRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { isAuthenticated } = authContext;

  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
