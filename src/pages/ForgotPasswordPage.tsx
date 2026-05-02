import { Link } from 'react-router-dom';
import { SignIn } from '@clerk/react';

const ForgotPasswordPage = () => {
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
                    We'll send you a secure link to reset your password and
                    regain access to your PayShield AI dashboard.
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

            <div className='flex flex-col space-y-5'>
              <SignIn signUpUrl='/register' />
            </div>

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

export default ForgotPasswordPage;
