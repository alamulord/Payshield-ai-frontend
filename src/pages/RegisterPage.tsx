import { Link } from 'react-router-dom';
import { SignUp } from '@clerk/react';

const RegisterPage = () => {
  return (
    <div className='min-h-screen flex w-full'>
      {/* Left Side: Visual/Marketing (Hidden on Mobile) */}
      <div className='hidden lg:flex w-5/12 relative flex-col justify-between bg-[#111621] p-12 overflow-hidden'>
        {/* Background Decoration */}
        <div className='absolute inset-0 z-0 opacity-20'>
          <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-[#111621] to-[#111621]'></div>
        </div>

        {/* Logo */}
        <div className='relative z-10 flex items-center gap-3 text-white'>
          <div className='size-8 flex items-center justify-center rounded-lg bg-primary/20 text-blue-400'>
            <span className='material-symbols-outlined'>shield_lock</span>
          </div>
          <h2 className='text-xl font-bold tracking-tight'>PayShield AI</h2>
        </div>

        {/* Hero Content */}
        <div className='relative z-10 my-auto flex flex-col gap-8'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-white text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]'>
              Secure your transactions today
            </h1>
            <p className='text-gray-400 text-lg font-normal leading-relaxed max-w-md'>
              Enterprise-grade fraud detection for modern finance teams. Join
              over 2,000 companies trusting PayShield.
            </p>
          </div>

          {/* Feature List */}
          <div className='flex flex-col gap-4 mt-4'>
            <div className='flex items-center gap-3'>
              <span className='material-symbols-outlined text-blue-400'>
                check_circle
              </span>
              <p className='text-gray-300 font-medium'>
                Real-time threat monitoring
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <span className='material-symbols-outlined text-blue-400'>
                check_circle
              </span>
              <p className='text-gray-300 font-medium'>
                SOC2 Type II Compliant
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <span className='material-symbols-outlined text-blue-400'>
                check_circle
              </span>
              <p className='text-gray-300 font-medium'>99.99% API Uptime</p>
            </div>
          </div>
        </div>

        {/* Footer Quote/Testimonial */}
        <div className='relative z-10 pt-8 border-t border-gray-800'>
          <p className='text-gray-400 text-sm italic'>
            "PayShield reduced our chargebacks by 85% in the first month."
          </p>
          <div className='flex items-center gap-2 mt-3'>
            <div className='size-6 rounded-full bg-gray-700 overflow-hidden'></div>
            <span className='text-gray-300 text-xs font-semibold'>
              Sarah Jenkins, CTO at FinCorp
            </span>
          </div>
        </div>
      </div>

      {/* Right Side: Sign Up Form */}
      <div className='flex-1 flex flex-col min-h-screen relative bg-white dark:bg-[#111621]'>
        {/* Mobile Header Logo */}
        <div className='lg:hidden p-6 pb-0 flex items-center gap-2 text-[#111318] dark:text-white'>
          <span className='material-symbols-outlined text-primary'>
            shield_lock
          </span>
          <h2 className='text-lg font-bold'>PayShield AI</h2>
        </div>

        {/* Top Nav (Log In) */}
        <div className='absolute top-6 right-6 lg:right-10 z-20'>
          <div className='flex items-center gap-2 text-sm'>
            <span className='text-gray-500 dark:text-gray-400 hidden sm:inline'>
              Already have an account?
            </span>
            <Link
              to='/login'
              className='text-primary font-bold hover:underline'
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Form Container */}
        <div className='flex-1 flex items-center justify-center p-6 lg:p-20 overflow-y-auto'>
          <div className='w-full max-w-[480px] flex flex-col gap-8'>
            {/* Header Text */}
            <div className='flex flex-col gap-1'>
              <h2 className='text-[#111318] dark:text-white text-3xl font-bold tracking-tight'>
                Create your account
              </h2>
              <p className='text-[#636f88] dark:text-gray-400 text-base'>
                Start your 14-day free trial. No credit card required.
              </p>
            </div>

            {/* Clerk SignUp Component */}
            <div className='flex flex-col gap-5'>
              <SignUp signInUrl='/login' />
            </div>

            {/* Footer */}
            <div className='mt-4 flex flex-col items-center gap-2'>
              <p className='text-xs text-[#636f88] dark:text-gray-500 font-medium'>
                Powered by PayShield AI
              </p>
              <div className='flex items-center gap-1 opacity-50'>
                <span className='material-symbols-outlined text-[16px] text-[#636f88] dark:text-gray-500'>
                  lock
                </span>
                <span className='text-[10px] uppercase tracking-wider text-[#636f88] dark:text-gray-500 font-bold'>
                  256-bit SSL Secure
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
