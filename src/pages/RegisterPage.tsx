import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    acceptTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = (): string | null => {
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.password ||
      !formData.companyName
    ) {
      return 'Please fill in all required fields';
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      return 'Please enter a valid email address';
    }

    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters long';
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      return 'You must accept the terms of service';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      await register(fullName, formData.email, formData.password);

      // Navigate to verification page with email in state
      navigate('/verify-email', {
        state: {
          email: formData.email,
          message:
            'Registration successful! Please verify your email to continue.',
        },
      });
    } catch (error: any) {
      console.error('Registration error:', error);

      let errorMessage = 'Registration failed. Please try again.';

      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage =
            'An account with this email already exists. Please log in instead.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage =
            'Password is too weak. Please use a stronger password.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled.';
          break;
        default:
          console.error('Unhandled registration error:', error);
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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

            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-3 dark:bg-red-900/30 dark:border-red-800'>
                <p className='text-red-600 dark:text-red-200 text-sm'>
                  {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className='flex flex-col gap-2'>
                <label className='text-[#111318] dark:text-gray-200 text-sm font-medium leading-normal'>
                  Full Name
                </label>
                <input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dcdfe5] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#636f88] px-4 text-base font-normal leading-normal transition-all'
                  placeholder='Enter your full name'
                  required
                />
              </div>

              {/* Work Email */}
              <div className='flex flex-col gap-2'>
                <label className='text-[#111318] dark:text-gray-200 text-sm font-medium leading-normal'>
                  Work Email
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dcdfe5] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#636f88] px-4 text-base font-normal leading-normal transition-all'
                  placeholder='name@company.com'
                  required
                />
              </div>

              {/* Company Name */}
              <div className='flex flex-col gap-2'>
                <label className='text-[#111318] dark:text-gray-200 text-sm font-medium leading-normal'>
                  Company Name
                </label>
                <div className='relative'>
                  <span className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]'>
                    business
                  </span>
                  <input
                    type='text'
                    name='companyName'
                    value={formData.companyName}
                    onChange={handleChange}
                    className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dcdfe5] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#636f88] pl-11 pr-4 text-base font-normal leading-normal transition-all'
                    placeholder='Enter company name'
                    required
                  />
                </div>
              </div>

              {/* Password Group */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='flex flex-col gap-2'>
                  <label className='text-[#111318] dark:text-gray-200 text-sm font-medium leading-normal'>
                    Password
                  </label>
                  <div className='relative'>
                    <input
                      type='password'
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                      className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dcdfe5] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#636f88] px-4 text-base font-normal leading-normal transition-all'
                      placeholder='Create password'
                      required
                    />
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-[#111318] dark:text-gray-200 text-sm font-medium leading-normal'>
                    Confirm Password
                  </label>
                  <div className='relative'>
                    <input
                      type='password'
                      name='confirmPassword'
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dcdfe5] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#636f88] px-4 text-base font-normal leading-normal transition-all'
                      placeholder='Confirm password'
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password Strength Indicator */}
              <div className='flex gap-2 items-center mt-[-8px]'>
                <div className='h-1 flex-1 rounded-full bg-green-500'></div>
                <div className='h-1 flex-1 rounded-full bg-green-500'></div>
                <div className='h-1 flex-1 rounded-full bg-gray-200 dark:bg-gray-700'></div>
                <div className='h-1 flex-1 rounded-full bg-gray-200 dark:bg-gray-700'></div>
                <span className='text-xs text-[#636f88] dark:text-gray-500 ml-2'>
                  Medium
                </span>
              </div>

              {/* Terms Checkbox */}
              <div className='flex items-start gap-3 mt-2'>
                <div className='flex h-5 items-center'>
                  <input
                    id='terms'
                    name='acceptTerms'
                    type='checkbox'
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700'
                    required
                  />
                </div>
                <label
                  className='text-sm text-[#636f88] dark:text-gray-400'
                  htmlFor='terms'
                >
                  I agree to the{' '}
                  <a
                    className='font-medium text-primary hover:text-primary/80'
                    href='#'
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    className='font-medium text-primary hover:text-primary/80'
                    href='#'
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={isLoading}
                className='mt-2 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary hover:bg-primary/90 transition-colors text-white text-base font-bold leading-normal tracking-[0.015em] shadow-sm'
              >
                <span className='truncate'>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </span>
              </button>

              {/* Divider */}
              <div className='relative flex items-center py-2'>
                <div className='flex-grow border-t border-gray-200 dark:border-gray-700'></div>
                <span className='flex-shrink-0 mx-4 text-sm text-gray-400'>
                  or sign up with
                </span>
                <div className='flex-grow border-t border-gray-200 dark:border-gray-700'></div>
              </div>

              {/* SSO Buttons */}
              <div className='grid grid-cols-2 gap-4'>
                <button
                  type='button'
                  className='flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-11 px-4 text-sm font-medium text-[#111318] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
                >
                  <svg
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                      fill='#4285F4'
                    ></path>
                    <path
                      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                      fill='#34A853'
                    ></path>
                    <path
                      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                      fill='#FBBC05'
                    ></path>
                    <path
                      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                      fill='#EA4335'
                    ></path>
                  </svg>
                  Google
                </button>
                <button
                  type='button'
                  className='flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-11 px-4 text-sm font-medium text-[#111318] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
                >
                  <svg
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 23 23'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M0 0h11.377v11.372H0z' fill='#f25022'></path>
                    <path
                      d='M11.377 0h11.372v11.372H11.377z'
                      fill='#7fba00'
                    ></path>
                    <path d='M0 11.372h11.377v11.372H0z' fill='#00a4ef'></path>
                    <path
                      d='M11.377 11.372h11.372v11.372H11.377z'
                      fill='#ffb900'
                    ></path>
                  </svg>
                  Microsoft
                </button>
              </div>
            </form>

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
