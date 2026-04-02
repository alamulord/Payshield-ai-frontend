// src/pages/ProfilePage.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/common/Avatar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const { currentUser, logout, isEmailVerified } = useAuth() || {};
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout?.();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
      toast.error('Failed to log out. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!currentUser) {
    return (
      <div className='flex-1 flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-gray-600 dark:text-gray-400'>
            Please sign in to view your profile.
          </p>
          <button
            onClick={() => navigate('/login')}
            className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const userInitial =
    currentUser.displayName?.charAt(0).toUpperCase() ||
    currentUser.email?.charAt(0).toUpperCase() ||
    'U';
  const userName =
    currentUser.displayName || currentUser.email?.split('@')[0] || 'User';
  const userEmail = currentUser.email || 'No email provided';
  const userSince = currentUser.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
    : 'N/A';

  return (
    <div className='flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow'>
          <div className='px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700'>
            <h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-white'>
              User Profile
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400'>
              Your personal information and account settings.
            </p>
          </div>

          <div className='px-4 py-5 sm:p-6'>
            <div className='flex flex-col items-center'>
              <div className='relative mb-4'>
                <div className='w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-3xl font-bold text-blue-600 dark:text-blue-400'>
                  {userInitial}
                </div>
                {isEmailVerified && (
                  <div className='absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1'>
                    <svg
                      className='w-4 h-4'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                )}
              </div>

              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-1'>
                {userName}
              </h2>
              <p className='text-gray-500 dark:text-gray-400 mb-6'>
                {userEmail}
              </p>

              <div className='w-full max-w-md space-y-4'>
                <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>
                  <h3 className='text-sm font-medium text-gray-900 dark:text-white mb-4'>
                    Account Information
                  </h3>
                  <dl className='space-y-3'>
                    <div className='flex justify-between pb-2 border-b border-gray-200 dark:border-gray-600'>
                      <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                        Email Status
                      </dt>
                      <dd className='text-sm text-gray-900 dark:text-white'>
                        {isEmailVerified ? (
                          <span className='inline-flex items-center text-green-600 dark:text-green-400'>
                            <svg
                              className='w-4 h-4 mr-1'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                clipRule='evenodd'
                              />
                            </svg>
                            Verified
                          </span>
                        ) : (
                          <span className='text-yellow-600 dark:text-yellow-400'>
                            Not Verified
                          </span>
                        )}
                      </dd>
                    </div>
                    <div className='flex justify-between pb-2 border-b border-gray-200 dark:border-gray-600'>
                      <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                        Account Created
                      </dt>
                      <dd className='text-sm text-gray-900 dark:text-white'>
                        {userSince}
                      </dd>
                    </div>
                    <div className='flex justify-between'>
                      <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                        Provider
                      </dt>
                      <dd className='text-sm text-gray-900 dark:text-white'>
                        {currentUser.providerData?.[0]?.providerId.replace(
                          '.com',
                          ''
                        ) || 'Email/Password'}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className='flex flex-col sm:flex-row gap-3 pt-2'>
                  <button
                    onClick={() => navigate('/app/settings')}
                    className='flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'
                  >
                    <span className='material-symbols-outlined text-lg'>
                      edit
                    </span>
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className='flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {isLoggingOut ? (
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
                        Signing out...
                      </>
                    ) : (
                      <>
                        <span className='material-symbols-outlined text-lg'>
                          logout
                        </span>
                        Sign Out
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
