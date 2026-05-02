import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/react';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, userId } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  if (!userId) {
    // Redirect to login page, but save the location they were trying to go to
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return <>{children}</>;
};
