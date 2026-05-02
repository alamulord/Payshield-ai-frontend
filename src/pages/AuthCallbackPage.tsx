// src/pages/AuthCallbackPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clerk handles authentication callbacks automatically
    // Redirect to login or dashboard
    navigate('/login');
  }, [navigate]);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <p className='text-gray-600'>Redirecting...</p>
      </div>
    </div>
  );
}
}
