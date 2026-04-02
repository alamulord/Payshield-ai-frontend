import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getAuth,
  applyActionCode,
  checkActionCode,
  sendEmailVerification,
} from 'firebase/auth';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
type VerificationStatus = 'idle' | 'verifying' | 'success' | 'error';
interface LocationState {
  email?: string;
  message?: string;
}
export default function EmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const locationState = location.state as LocationState | undefined;
  const [status, setStatus] = useState<VerificationStatus>('verifying');
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const oobCode = searchParams.get('oobCode');
  const mode = searchParams.get('mode');

  const getVerificationError = (code: string): string => {
    switch (code) {
      case 'auth/expired-action-code':
        return 'The verification link has expired. Please request a new one.';
      case 'auth/invalid-action-code':
        return 'Invalid verification link. Please request a new one.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      case 'auth/user-not-found':
        return 'No user found with this email. Please register first.';
      default:
        return 'Failed to verify email. Please try again.';
    }
  };

  useEffect(() => {
    const verifyEmail = async () => {
      if (!oobCode && currentUser?.emailVerified) {
        navigate('/app/overview', { replace: true });
        return;
      }

      if (oobCode && mode === 'verifyEmail') {
        try {
          setStatus('verifying');
          const auth = getAuth();
          await checkActionCode(auth, oobCode);
          await applyActionCode(auth, oobCode);

          // Reload the user to get updated emailVerified status
          if (auth.currentUser) {
            await auth.currentUser.reload();

            // If user is already logged in, redirect to dashboard
            if (auth.currentUser.emailVerified) {
              setStatus('success');
              setTimeout(() => {
                navigate('/app/overview', { replace: true });
              }, 2000);
              return;
            }
          }

          // If not logged in, redirect to login with success message
          setStatus('success');
          setTimeout(() => {
            navigate('/login', {
              state: {
                message: 'Email verified successfully! You can now log in.',
                from: '/app/overview', // Add this to redirect after login
              },
              replace: true,
            });
          }, 2000);
        } catch (error: any) {
          console.error('Email verification error:', error);
          setStatus('error');
          setError(getVerificationError(error.code));
        }
      } else {
        // Handle case when user lands directly on the verification page
        const emailFromState = locationState?.email;
        const userEmail = currentUser?.email || emailFromState;

        if (userEmail) {
          setEmail(userEmail);
          setStatus('idle');
        } else {
          setStatus('error');
          setError('No email found. Please try logging in again.');
        }
      }
    };

    verifyEmail();
  }, [oobCode, mode, navigate, locationState, currentUser]);

  const handleResendVerification = async () => {
    const auth = getAuth();
    if (!auth.currentUser) {
      setError('Please log in to resend the verification email.');
      setStatus('error');
      return;
    }

    try {
      setStatus('verifying');
      await sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/verify-email`,
      });
      setStatus('idle');
      setError(null);
    } catch (error: any) {
      console.error('Error resending verification email:', error);
      setStatus('error');
      setError('Failed to resend verification email. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8 text-center'>
          <div className='mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4'>
            <CheckCircleIcon className='h-10 w-10 text-green-600' />
          </div>
          <h2 className='text-3xl font-extrabold text-gray-900'>
            Email Verified!
          </h2>
          <p className='mt-2 text-gray-600'>
            Your email has been verified successfully. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <div className='mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
            <MailOutlineIcon className='h-8 w-8 text-blue-600' />
          </div>

          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
            {status === 'verifying'
              ? 'Verifying your email...'
              : status === 'error'
              ? 'Verification Failed'
              : 'Verify Your Email'}
          </h2>

          <div className='mt-4'>
            {status === 'verifying' && (
              <p className='text-gray-600'>
                Please wait while we verify your email address.
              </p>
            )}

            {status === 'error' && error && (
              <p className='text-red-600'>{error}</p>
            )}

            {status === 'idle' && email && (
              <p className='text-gray-600'>
                We've sent a verification link to{' '}
                <span className='font-medium text-gray-900'>{email}</span>.
                Please check your email and click the link to verify your
                account.
              </p>
            )}
          </div>
        </div>

        {(status === 'error' ||
          status === 'idle' ||
          status === 'verifying') && (
          <div className='mt-8 space-y-4'>
            {status !== 'error' && status !== 'verifying' && (
              <p className='text-sm text-gray-500 text-center'>
                Didn't receive an email? Check your spam folder or click below
                to resend.
              </p>
            )}

            <button
              onClick={handleResendVerification}
              disabled={status === 'verifying'}
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {status === 'verifying' ? (
                <>
                  <svg
                    className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Resend Verification Email'
              )}
            </button>

            {status === 'error' && (
              <button
                onClick={() => navigate('/login')}
                className='w-full text-sm text-blue-600 hover:text-blue-500 text-center'
              >
                Back to Login
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
