import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  // Handle success message from login page
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message from location state to prevent showing it again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(email);
      setSuccessMessage('Password reset email sent! Please check your inbox and follow the instructions.');
      setEmail(''); // Clear the form
    } catch (error: any) {
      console.error('Password reset error:', error);
      let errorMessage = 'Failed to send password reset email. Please try again.';

      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address format.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later.';
          break;
        default:
          if (error.message) {
            errorMessage = error.message;
          }
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
                    Reset Your Password
                  </h2>
                  <p className='text-blue-100 text-lg md:text-xl opacity-90'>
                    We'll send you a secure link to reset your password and regain access to your PayShield AI dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Forgot Password Form */}
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
                Forgot Password?
              </h1>
              <p className='text-[#636f88] text-base font-normal leading-normal'>
                No worries, we'll send you reset instructions.
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
                  <div>
                    <p className='text-green-800 text-sm font-medium mb-1'>
                      Email Sent Successfully
                    </p>
                    <p className='text-green-600 text-sm'>
                      {successMessage}
                    </p>
                    <p className='text-green-600 text-sm mt-2'>
                      Didn't receive the email? Check your spam folder or try again.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!successMessage && (
              <form className='flex flex-col space-y-5' onSubmit={handleSubmit}>
                <div className='flex flex-col space-y-2'>
                  <label className='text-[#111318] text-sm font-medium leading-normal'>
                    Work Email
                  </label>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dcdfe5] bg-white focus:border-primary h-12 placeholder:text-[#636f88] px-4 text-base font-normal leading-normal transition-all'
                    placeholder='name@company.com'
                    style={{ backgroundColor: 'white' }}
                  />
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
                    {isLoading ? 'hourglass_empty' : 'email'}
                  </span>
                  {isLoading ? 'Sending...' : 'Send Reset Email'}
                </button>
              </form>
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

            {successMessage && (
              <div className='pt-4 border-t border-gray-100'>
                <button
                  onClick={() => {
                    setSuccessMessage('');
                    setError('');
                  }}
                  className='w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-white border border-[#dcdfe5] hover:bg-gray-50 text-[#111318] text-base font-medium leading-normal tracking-[0.015em] transition-colors'
                >
                  <span
                    className='material-symbols-outlined mr-2'
                    style={{ fontSize: '20px' }}
                  >
                    refresh
                  </span>
                  Try Another Email
                </button>
              </div>
            )}

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

export default ForgotPasswordPage;
