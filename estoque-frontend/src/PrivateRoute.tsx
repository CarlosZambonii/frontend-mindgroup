import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

interface PrivateRouteProps {
  component: React.ComponentType; // O componente a ser renderizado se autenticado
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
  const { isAuthenticated } = useAuth(); // Obtém o estado de autenticação do contexto

  // Renderiza o componente se o usuário estiver autenticado, caso contrário redireciona para o login
  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
