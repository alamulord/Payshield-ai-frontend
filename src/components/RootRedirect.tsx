// src/components/RootRedirect.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/react';
import LandingPage from '../pages/LandingPage';

export const RootRedirect = () => {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        Loading...
      </div>
    );
  }

  // If user is authenticated, redirect to dashboard
  if (userId) {
    return <Navigate to='/app/overview' replace />;
  }

  // Show landing page for non-authenticated users
  return <LandingPage />;
};
