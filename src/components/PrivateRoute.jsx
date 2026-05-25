import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) {
    return <Navigate to="/admin/login" />;
  }

  // If user is authenticated but not an admin, we still allow access to the dashboard 
  // but the dashboard components will handle the restricted view.
  // Alternatively, we could redirect to a 'not authorized' page.
  // For now, let's just ensure they are logged in.
  return children;
};

export default PrivateRoute;
