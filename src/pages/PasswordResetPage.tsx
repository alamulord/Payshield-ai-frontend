import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode,
} from 'firebase/auth';
import { auth } from '../firebase/config';

const PasswordResetPage = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValidCode, setIsValidCode] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const oobCode = searchParams.get('oobCode');
  const mode = searchParams.get('mode');
  const continueUrl = searchParams.get('continueUrl');

  useEffect(() => {
    if (!oobCode || !mode) {
      setError(
        'Invalid password reset link. Please request a new password reset.',
      );
      setIsVerifying(false);
      return;
    }

    verifyResetCode();
  }, [oobCode, mode]);

  const verifyResetCode = async () => {
    try {
      if (mode === 'resetPassword' && oobCode) {
        const email = await verifyPasswordResetCode(auth, oobCode);
        setEmail(email);
        setIsValidCode(true);
      } else if (mode === 'verifyEmail' && oobCode) {
        // Handle email verification if needed
        await applyActionCode(auth, oobCode);
        setSuccessMessage('Email verified successfully! You can now log in.');
        setTimeout(() => {
          navigate('/login', {
            state: { message: 'Email verified successfully! Please log in.' },
          });
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error verifying reset code:', error);
      let errorMessage =
        'Invalid or expired reset link. Please request a new password reset.';

      switch (error.code) {
        case 'auth/expired-action-code':
          errorMessage =
            'Password reset link has expired. Please request a new one.';
          break;
        case 'auth/invalid-action-code':
          errorMessage =
            'Invalid password reset link. Please request a new one.';
          break;
        case 'auth/user-disabled':
          errorMessage =
            'This account has been disabled. Please contact support.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'User not found. Please check your email or sign up.';
          break;
        default:
          errorMessage = 'Failed to verify reset link. Please try again.';
      }

      setError(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!newPassword || !confirmPassword) {
      setError('Please enter and confirm your new password');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await confirmPasswordReset(auth, oobCode!, newPassword);
      setSuccessMessage('Password reset successfully! Redirecting to login...');

      // Redirect to login after successful password reset
      setTimeout(() => {
        navigate('/login', {
          state: {
            message:
              'Password reset successfully! Please log in with your new password.',
          },
        });
      }, 2000);
    } catch (error: any) {
      console.error('Error resetting password:', error);
      let errorMessage = 'Failed to reset password. Please try again.';

      switch (error.code) {
        case 'auth/expired-action-code':
          errorMessage =
            'Password reset link has expired. Please request a new one.';
          break;
        case 'auth/invalid-action-code':
          errorMessage =
            'Invalid password reset link. Please request a new one.';
          break;
        case 'auth/user-disabled':
          errorMessage =
            'This account has been disabled. Please contact support.';
          break;
        case 'auth/weak-password':
          errorMessage =
            'Password is too weak. Please choose a stronger password.';
          break;
        default:
          errorMessage = 'Failed to reset password. Please try again.';
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <div className='font-display bg-background-light text-[#111318]'>
        <div className='flex min-h-screen w-full items-center justify-center'>
          <div className='w-full max-w-md flex flex-col items-center space-y-4 p-8'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
            <p className='text-gray-600 text-center'>Verifying reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'verifyEmail') {
    return (
      <div className='font-display bg-background-light text-[#111318]'>
        <div className='flex min-h-screen w-full'>
          <div className='w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 bg-white relative'>
            <div className='w-full max-w-[440px] flex flex-col space-y-8'>
              <div className='text-center space-y-2'>
                <h1 className='text-[#111318] tracking-tight text-[32px] font-bold leading-tight'>
                  Email Verification
                </h1>
              </div>

              {error && (
                <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                  <p className='text-red-600 text-sm'>{error}</p>
                </div>
              )}

              {successMessage && (
                <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                  <div className='flex items-start gap-3'>
                    <span
                      className='material-symbols-outlined text-green-600 mt-0.5'
                      style={{ fontSize: '20px' }}
                    >
                      check_circle
                    </span>
                    <p className='text-green-800 text-sm'>{successMessage}</p>
                  </div>
                </div>
              )}

              <div className='pt-6 text-center'>
                <Link
                  to='/login'
                  className='font-medium text-primary hover:underline'
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='font-display bg-background-light text-[#111318]'>
      <div className='flex min-h-screen w-full'>
        {/* Left side - Illustration */}
        <div className='hidden lg:flex lg:w-1/2 relative bg-surface-dark overflow-hidden'>
          <div className='h-full w-full relative'>
            <img
              src='https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
              alt='Password Reset'
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-indigo-900/90 to-purple-800/80 mix-blend-multiply'></div>

            <div className='relative z-10 h-full w-full p-12 flex flex-col'>
              <div className='flex items-center gap-3 text-white mb-12'>
                <span
                  className='material-symbols-outlined text-4xl'
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  shield_lock
                </span>
                <span className='text-2xl font-bold tracking-tight'>
                  PayShield AI
                </span>
              </div>

              <div className='flex-1 flex items-center'>
                <div className='w-full max-w-2xl mx-auto text-center'>
                  <h2 className='text-3xl md:text-4xl font-bold text-white leading-tight mb-6'>
                    Set New Password
                  </h2>
                  <p className='text-blue-100 text-lg md:text-xl opacity-90'>
                    Create a strong, secure password to protect your PayShield
                    AI account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Reset Password Form */}
        <div className='w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 bg-white relative'>
          <div className='lg:hidden absolute top-6 left-6 flex items-center gap-2 text-primary mb-8'>
            <span
              className='material-symbols-outlined text-3xl'
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield_lock
            </span>
            <span className='text-xl font-bold tracking-tight'>
              PayShield AI
            </span>
          </div>

          <div className='w-full max-w-[440px] flex flex-col space-y-8'>
            <div className='text-center lg:text-left space-y-2'>
              <h1 className='text-[#111318] tracking-tight text-[32px] font-bold leading-tight'>
                Reset Password
              </h1>
              <p className='text-[#636f88] text-base font-normal leading-normal'>
                {isValidCode
                  ? `Enter a new password for ${email}`
                  : 'Set your new password'}
              </p>
            </div>

            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                <p className='text-red-600 text-sm'>{error}</p>
              </div>
            )}

            {successMessage && (
              <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                <div className='flex items-start gap-3'>
                  <span
                    className='material-symbols-outlined text-green-600 mt-0.5'
                    style={{ fontSize: '20px' }}
                  >
                    check_circle
                  </span>
                  <p className='text-green-800 text-sm'>{successMessage}</p>
                </div>
              </div>
            )}

            {isValidCode && !successMessage && (
              <form className='flex flex-col space-y-5' onSubmit={handleSubmit}>
                <div className='flex flex-col space-y-2'>
                  <label className='text-[#111318] text-sm font-medium leading-normal'>
                    New Password
                  </label>
                  <input
                    id='newPassword'
                    name='newPassword'
                    type='password'
                    autoComplete='new-password'
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dcdfe5] bg-white focus:border-primary h-12 placeholder:text-[#636f88] px-4 text-base font-normal leading-normal transition-all'
                    placeholder='Enter new password'
                    style={{ backgroundColor: 'white' }}
                  />
                </div>

                <div className='flex flex-col space-y-2'>
                  <label className='text-[#111318] text-sm font-medium leading-normal'>
                    Confirm New Password
                  </label>
                  <input
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    autoComplete='new-password'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dcdfe5] bg-white focus:border-primary h-12 placeholder:text-[#636f88] px-4 text-base font-normal leading-normal transition-all'
                    placeholder='Confirm new password'
                    style={{ backgroundColor: 'white' }}
                  />
                </div>

                <div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
                  <p className='text-blue-800 text-sm font-medium mb-1'>
                    Password Requirements:
                  </p>
                  <ul className='text-blue-600 text-sm space-y-1'>
                    <li>• At least 6 characters long</li>
                    <li>• Include both letters and numbers</li>
                    <li>• Avoid common passwords</li>
                  </ul>
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className='flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-primary/90 text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <span
                    className='material-symbols-outlined mr-2'
                    style={{ fontSize: '20px' }}
                  >
                    {isLoading ? 'hourglass_empty' : 'lock_reset'}
                  </span>
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            )}

            {!isValidCode && !successMessage && (
              <div className='text-center space-y-4'>
                <p className='text-gray-600'>
                  The password reset link is invalid or has expired.
                </p>
                <Link
                  to='/forgot-password'
                  className='inline-flex items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-primary/90 text-white text-base font-medium leading-normal tracking-[0.015em] transition-colors shadow-sm'
                >
                  <span
                    className='material-symbols-outlined mr-2'
                    style={{ fontSize: '20px' }}
                  >
                    refresh
                  </span>
                  Request New Reset Link
                </Link>
              </div>
            )}

            <div className='pt-6 text-center'>
              <p className='text-[#636f88]'>
                Remember your password?{' '}
                <Link
                  to='/login'
                  className='font-medium text-primary hover:underline'
                >
                  Back to Login
                </Link>
              </p>
            </div>

            <div className='mt-12 border-t border-gray-100 pt-6 flex flex-col items-center gap-2'>
              <p className='text-xs text-gray-400 flex items-center gap-1'>
                <span
                  className='material-symbols-outlined text-[14px]'
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  shield_lock
                </span>
                Secured by PayShield AI
              </p>
              <p className='text-xs text-gray-400'>
                &copy; 2024 PayShield AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
