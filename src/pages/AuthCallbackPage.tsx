// src/pages/AuthCallbackPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAuth, signInWithEmailLink } from 'firebase/auth';

export default function AuthCallbackPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleSignIn = async () => {
      try {
        const auth = getAuth();
        const url = window.location.href;

        // Check if the URL contains the email link
        if (!url.includes('oobCode=')) {
          throw new Error('Invalid sign-in link');
        }

        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          // You might want to show a form to collect the email here
          email = window.prompt('Please provide your email for confirmation');
          if (!email) {
            throw new Error('Email is required');
          }
        }

        // Sign in with the email link
        await signInWithEmailLink(auth, email, url);

        // Clear the email from storage
        window.localStorage.removeItem('emailForSignIn');

        // Redirect to the dashboard or wherever you want
        navigate('/app/overview');
      } catch (error: any) {
        console.error('Authentication error:', error);
        setError(
          error.message ||
            'Failed to sign in. The link may have expired or is invalid.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    handleSignIn();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Completing sign in...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow'>
          <div className='text-red-500 text-center'>{error}</div>
          <button
            onClick={() => navigate('/login')}
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700'
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return null;
}
