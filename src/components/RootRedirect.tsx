// src/components/RootRedirect.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LandingPage from '../pages/LandingPage';

export const RootRedirect = () => {
  const { isAuthenticated, isLoading, isEmailVerified } = useAuth();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        Loading...
      </div>
    );
  }

  // If user is authenticated and email is verified, redirect to dashboard
  if (isAuthenticated && isEmailVerified) {
    return <Navigate to='/app/overview' replace />;
  }

  // Show landing page for non-authenticated users
  if (!isAuthenticated) {
    return <LandingPage />;
  }

  // If user is authenticated but email is not verified, redirect to verification page
  if (!isEmailVerified) {
    return <Navigate to='/verify-email' replace />;
  }

  // Default fallback (shouldn't reach here)
  return <LandingPage />;
};
