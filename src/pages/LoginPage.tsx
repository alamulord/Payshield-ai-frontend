import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import payshieldApi from '../services/api/payshieldApi';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const sliderRef = useRef<Slider>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, login, sendVerificationEmail } = useAuth();
  const from = (location.state as any)?.from || '/app/overview';

  // Handle success message from email verification
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message from location state to prevent showing it again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    fade: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    appendDots: (dots: React.ReactNode) => (
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2'>
        {dots}
      </div>
    ),
    customPaging: (i: number) => (
      <div className='w-6 h-0.5 bg-white/30 rounded-full transition-all duration-300' />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
        },
      },
    ],
  };
  const carouselSlides = [
    {
      title: 'Fraud detection at the speed of light.',
      description:
        "Secure your transactions with the world's most advanced AI-driven risk analysis platform. Trusted by leading financial institutions.",
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD2b8Mq2XZLUiVstR6qgBqok67zSMhozVG-hPsBrbWpCDf5jD5kTdLkC4MbmbTuaiEDcKPuqqtg5hpv-GPG4Nn-dwGCAc64XKICZBaRbDtz_K8zDPJOfRh4Nkq-iYosA3BsKUZEjIzHUWiVHQ7P_MdJGBm9JQ7pGuoUPqDq1EvYSM3e2Yo45t5iUvXoP3EVIKmtcwGNcSHTWe6mSuWyE9gQ8YElZ-1VIpjmGO3b4U4QPnBA_OJfM3Zg6TmcX-WGkMTI6L_oUX9rV21c',
      overlay: 'from-primary/90 to-background-dark/80',
    },
    {
      title: 'Real-time Transaction Monitoring',
      description:
        'Get instant alerts and comprehensive insights into all transactions with our 24/7 monitoring system.',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      overlay: 'from-blue-900/90 to-blue-700/80',
    },
    {
      title: 'Advanced Security Protocols',
      description:
        'Multi-layered security with end-to-end encryption and biometric authentication to protect your financial data.',
      image:
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      overlay: 'from-indigo-900/90 to-purple-800/80',
    },
  ];
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setError('');
  //   setSuccessMessage('');

  //   if (!email || !password) {
  //     setError('Please enter both email and password');
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     const result = await login(email, password);

  //     if (!result.user.emailVerified) {
  //       await sendVerificationEmail(result.user);
  //       navigate('/verify-email', {
  //         state: { email: result.user.email },
  //         replace: true,
  //       });
  //       return;
  //     }

  //     // Successful login with verified email
  //     navigate(from, { replace: true });
  //   } catch (error: any) {
  //     console.error('Login error:', error);
  //     let errorMessage = 'Login failed. Please check your credentials.';

  //     // Handle specific Firebase auth errors
  //     switch (error.code) {
  //       case 'auth/user-not-found':
  //       case 'auth/wrong-password':
  //         errorMessage = 'Invalid email or password.';
  //         break;
  //       case 'auth/too-many-requests':
  //         errorMessage =
  //           'Too many failed login attempts. Please try again later or reset your password.';
  //         break;
  //       case 'auth/user-disabled':
  //         errorMessage =
  //           'This account has been disabled. Please contact support.';
  //         break;
  //     }

  //     setError(errorMessage);
  //     setIsLoading(false);
  //   }
  // };
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setError('');
  //   setSuccessMessage('');
  //   if (!email || !password) {
  //     setError('Please enter both email and password');
  //     return;
  //   }
  //   setIsLoading(true);
  //   try {
  //     // Call the login function from useAuth
  //     const result = await login(email, password);

  //     // The onAuthStateChanged in AuthProvider will handle the state update
  //     // So we don't need to manually navigate here
  //     // Just wait a moment for the state to update
  //     await new Promise((resolve) => setTimeout(resolve, 100));

  //     // Now check the currentUser from the auth context
  //     if (currentUser) {
  //       if (!currentUser.emailVerified) {
  //         await sendVerificationEmail(currentUser);
  //         navigate('/verify-email', {
  //           state: { email: currentUser.email },
  //           replace: true,
  //         });
  //       } else {
  //         // If email is verified, navigate to the intended destination
  //         navigate(from, { replace: true });
  //       }
  //     }
  //   } catch (error: any) {
  //     console.error('Login error:', error);
  //     let errorMessage = 'Login failed. Please check your credentials.';
  //     // Handle specific Firebase auth errors
  //     switch (error.code) {
  //       case 'auth/user-not-found':
  //       case 'auth/wrong-password':
  //         errorMessage = 'Invalid email or password.';
  //         break;
  //       case 'auth/too-many-requests':
  //         errorMessage =
  //           'Too many failed login attempts. Please try again later or reset your password.';
  //         break;
  //       case 'auth/user-disabled':
  //         errorMessage =
  //           'This account has been disabled. Please contact support.';
  //         break;
  //     }
  //     setError(errorMessage);
  //     setIsLoading(false);
  //   }
  // };
  // In LoginPage.tsx, update the handleSubmit function:
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setError('');
  //   setSuccessMessage('');

  //   if (!email || !password) {
  //     setError('Please enter both email and password');
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     // 1. Sign in the user
  //     const userCredential = await login(email, password).catch((error) => {
  //       console.error('Login error details:', error);
  //       throw error;
  //     });

  //     const user = userCredential.user;

  //     // 2. Check if email is verified
  //     if (!user.emailVerified) {
  //       try {
  //         await sendVerificationEmail(user);
  //         await firebaseSignOut(auth);
  //         navigate('/verify-email', {
  //           state: { email: user.email },
  //           replace: true,
  //         });
  //       } catch (emailError) {
  //         console.error('Email verification error:', emailError);
  //         throw new Error(
  //           'Failed to send verification email. Please try again.'
  //         );
  //       }
  //       return;
  //     }

  //     // 3. If email is verified, force token refresh
  //     try {
  //       await user.getIdToken(true);
  //       // Give some time for the auth state to update
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //       // Navigate to the intended destination
  //       navigate(from, { replace: true });
  //     } catch (tokenError) {
  //       console.error('Token refresh error:', tokenError);
  //       throw new Error('Session initialization failed. Please try again.');
  //     }
  //   } catch (error: any) {
  //     console.error('Login error:', error);
  //     let errorMessage =
  //       'Login failed. Please check your credentials and try again.';

  //     if (error.code) {
  //       switch (error.code) {
  //         case 'auth/invalid-credential':
  //         case 'auth/user-not-found':
  //         case 'auth/wrong-password':
  //           errorMessage =
  //             'Invalid email or password. Please check your credentials.';
  //           break;
  //         case 'auth/too-many-requests':
  //           errorMessage =
  //             'Too many failed login attempts. Please try again later or reset your password.';
  //           break;
  //         case 'auth/user-disabled':
  //           errorMessage =
  //             'This account has been disabled. Please contact support.';
  //           break;
  //         case 'auth/network-request-failed':
  //           errorMessage =
  //             'Network error. Please check your internet connection.';
  //           break;
  //         default:
  //           console.warn('Unhandled auth error code:', error.code);
  //       }
  //     } else if (error.message) {
  //       errorMessage = error.message;
  //     }

  //     setError(errorMessage);
  //     setIsLoading(false);
  //   }
  // };
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault(); // This prevents the default form submission
  //   setError('');
  //   setSuccessMessage('');

  //   if (!email || !password) {
  //     setError('Please enter both email and password');
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     const userCredential = await login(email, password);
  //     const user = userCredential.user;

  //     if (!user.emailVerified) {
  //       await sendVerificationEmail(user);
  //       await firebaseSignOut(auth);
  //       navigate('/verify-email', {
  //         state: { email: user.email },
  //         replace: true,
  //       });
  //       return;
  //     }

  //     // Force token refresh and wait for auth state to update
  //     await user.getIdToken(true);
  //     // Add a small delay to ensure state updates
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     // Navigate to the intended destination
  //     navigate(from, { replace: true });
  //   } catch (error: any) {
  //     console.error('Login error:', error);
  //     let errorMessage = 'Login failed. Please check your credentials.';

  //     if (error.code) {
  //       switch (error.code) {
  //         case 'auth/invalid-credential':
  //         case 'auth/user-not-found':
  //         case 'auth/wrong-password':
  //           errorMessage = 'Invalid email or password.';
  //           break;
  //         case 'auth/too-many-requests':
  //           errorMessage =
  //             'Too many failed login attempts. Please try again later.';
  //           break;
  //         case 'auth/user-disabled':
  //           errorMessage = 'This account has been disabled.';
  //           break;
  //       }
  //     }

  //     setError(errorMessage);
  //     setIsLoading(false);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    // ── Try backend JWT login first ──
    try {
      const tokenResponse = await payshieldApi.login({ email, password });
      // Store JWT token for subsequent API calls
      localStorage.setItem('token', tokenResponse.access_token);
      localStorage.setItem('user', JSON.stringify(tokenResponse.user));
      setSuccessMessage('Login successful!');
      navigate(from, { replace: true });
      return;
    } catch (backendErr: any) {
      console.log('Backend login failed, trying Firebase:', backendErr?.response?.status);
      // If backend returns 401/403, show error directly
      if (backendErr?.response?.status === 401 || backendErr?.response?.status === 403) {
        setError(backendErr?.response?.data?.detail || 'Invalid email or password.');
        setIsLoading(false);
        return;
      }
      // Otherwise fall through to Firebase auth
    }

    // ── Firebase auth fallback ──
    try {
      const userCredential = await login(email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        await sendVerificationEmail(user);
        await firebaseSignOut(auth);
        navigate('/verify-email', {
          state: { email: user.email, from },
          replace: true,
        });
        return;
      }

      const token = await user.getIdToken(true);
      console.log('Token refreshed:', !!token);
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed. Please check your credentials.';

      if (error.code) {
        switch (error.code) {
          case 'auth/invalid-credential':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            errorMessage = 'Invalid email or password.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed login attempts. Please try again later.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This account has been disabled.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your internet connection.';
            break;
        }
      }

      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className='font-display bg-background-light text-[#111318]'>
      <div className='flex min-h-screen w-full'>
        {/* Left side - Illustration */}
        <div className='hidden lg:flex lg:w-1/2 relative bg-surface-dark overflow-hidden'>
          <Slider
            ref={sliderRef}
            {...carouselSettings}
            className='h-full w-full'
          >
            {carouselSlides.map((slide, index) => (
              <div key={index} className='h-screen w-full relative'>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className='absolute inset-0 w-full h-full object-cover'
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${slide.overlay} mix-blend-multiply`}
                ></div>

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
                        {slide.title}
                      </h2>
                      <p className='text-blue-100 text-lg md:text-xl opacity-90'>
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          <style>{`
            .slick-dots {
              left: -450px;
              bottom: 20px !important;
            }
            .slick-dots li {
              margin: 0 3px;
              width: auto;
              height: auto;
            }
            .slick-dots li.slick-active div {
              background-color: white !important;
              width: 1.5rem !important;
            }
            .slick-dots li div {
              transition: all 0.3s ease;
            }
            .slick-dots li div:hover {
              background-color: rgba(255, 255, 255, 0.7) !important;
            }
          `}</style>
        </div>

        {/* Right side - Login Form */}
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
                Welcome Back
              </h1>
              <p className='text-[#636f88] text-base font-normal leading-normal'>
                Enter your credentials to access the risk dashboard.
              </p>
            </div>

            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                <p className='text-red-600 text-sm'>{error}</p>
              </div>
            )}

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
                  className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dcdfe5] bg-white focus:border-primary h-12 placeholder:text-[#636f88] px-4 pr-12 text-base font-normal leading-normal transition-all'
                  placeholder='name@company.com'
                  style={{ backgroundColor: 'white' }}
                />
              </div>

              <div className='flex flex-col space-y-2'>
                <div className='flex justify-between items-center'>
                  <label className='text-[#111318] text-sm font-medium leading-normal'>
                    Password
                  </label>
                  <Link
                    to='/forgot-password'
                    className='text-primary text-sm font-medium hover:underline'
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className='relative flex w-full flex-1 items-center rounded-lg'>
                  <input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='current-password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dcdfe5] bg-white focus:border-primary h-12 placeholder:text-[#636f88] px-4 pr-12 text-base font-normal leading-normal transition-all'
                    placeholder='Enter your password'
                    style={{ backgroundColor: 'white' }}
                  />
                  <button
                    type='button'
                    onClick={togglePasswordVisibility}
                    className='absolute right-0 top-0 bottom-0 px-3 flex items-center text-[#636f88] hover:text-primary transition-colors'
                  >
                    <span
                      className='material-symbols-outlined'
                      style={{ fontSize: '20px' }}
                    >
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-primary/90 text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors shadow-sm'
              >
                <span
                  className='material-symbols-outlined mr-2'
                  style={{ fontSize: '20px' }}
                >
                  login
                </span>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className='relative flex py-2 items-center'>
                <div className='flex-grow border-t border-gray-200'></div>
                <span className='flex-shrink-0 mx-4 text-gray-400 text-xs uppercase font-medium'>
                  Or continue with
                </span>
                <div className='flex-grow border-t border-gray-200'></div>
              </div>

              <button
                type='button'
                className='flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-white border border-[#dcdfe5] hover:bg-gray-50 text-[#111318] text-base font-medium leading-normal tracking-[0.015em] transition-colors'
              >
                <span className='material-symbols-outlined mr-2 text-[20px] text-gray-600'>
                  domain
                </span>
                Sign in with SSO
              </button>
            </form>

            <div className='pt-6 text-center'>
              <p className='text-[#636f88]'>
                Don't have an account?{' '}
                <Link
                  to='/register'
                  className='font-medium text-primary hover:underline'
                >
                  Sign up
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

export default LoginPage;
