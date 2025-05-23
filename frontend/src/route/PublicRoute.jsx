import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user_id');
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute