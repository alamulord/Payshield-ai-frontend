// src/components/layout/Header.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import '../../styles/global.css';

export const Header = () => {
  const navigate = useNavigate();

  const { isAuthenticated, isEmailVerified, user, logout } = useAuth();

  return (
    <header className='sticky top-0 z-50 border-b border-gray-200 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 backdrop-blur-md'>
      <div className='px-4 md:px-10 py-3 flex items-center justify-between'>
        <div className='flex items-center gap-4 text-primary dark:text-white'>
          <div className='size-8 text-primary'>
            <span className='material-symbols-outlined text-3xl dark:text-blue-400 text-light'>
              shield_lock
            </span>
          </div>
          <Link
            to='/'
            className='text-xl font-bold text-blue-600 dark:text-white'
          >
            PayShield
          </Link>
        </div>
        <div className='hidden lg:flex flex-1 justify-center gap-8'>
          <a
            className='text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white text-sm font-medium transition-colors'
            href='#features'
          >
            Features
          </a>
          <a
            className='text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white text-sm font-medium transition-colors'
            href='#solutions'
          >
            Solutions
          </a>
          <a
            className='text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white text-sm font-medium transition-colors'
            href='#roles'
          >
            Roles
          </a>
          <a
            className='text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white text-sm font-medium transition-colors'
            href='#resources'
          >
            Resources
          </a>
        </div>

        <nav className='flex items-center space-x-6'>
          {isAuthenticated ? (
            <>
              {isEmailVerified && (
                <Link
                  to='/app/overview'
                  className='text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={logout}
                className='text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to='/login'
                className='text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
              >
                Log in
              </Link>
              <Link
                to='/register'
                className=''
              >
                <Button className='bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700'> Sign up</Button>
              </Link>
            </>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode preference
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.theme = newDarkMode ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'
      aria-label='Toggle dark mode'
    >
      {darkMode ? (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-4 6a1 1 0 100 2h.01a1 1 0 100-2H10z' />
        </svg>
      ) : (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
        </svg>
      )}
    </button>
  );
};
