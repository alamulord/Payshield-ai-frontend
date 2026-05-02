import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SignIn } from '@clerk/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LoginPage = () => {
  const sliderRef = useRef<Slider>(null);

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

            <div className='flex flex-col space-y-5'>
              <SignIn signUpUrl='/register' />
            </div>

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
