import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

interface AdminPrivateRouteProps {
  children: React.ReactNode;
}

const AdminPrivateRoute: React.FC<AdminPrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

export default AdminPrivateRoute;
