import React from 'react';
import { useCurrentTheme } from '../context/ThemeContext';

const TestPage = () => {
  const { bgClass, textClass, theme } = useCurrentTheme();

  return (
    <div className={`min-h-screen p-8 ${bgClass} ${textClass}`}>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6'>Theme Test Page</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
            <h2 className='text-xl font-semibold mb-4'>Theme Information</h2>
            <div className='space-y-2'>
              <p>
                <span className='font-medium'>Current Theme:</span> {theme.name}
              </p>
              <p>
                <span className='font-medium'>Background Class:</span> {bgClass}
              </p>
              <p>
                <span className='font-medium'>Text Class:</span> {textClass}
              </p>
              <p>
                <span className='font-medium'>Is Dark Mode:</span>{' '}
                {textClass === 'text-white' ? 'Yes' : 'No'}
              </p>
            </div>
          </div>

          <div className='p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
            <h2 className='text-xl font-semibold mb-4'>Test Content</h2>
            <p className='mb-4'>
              This is some test content to see how text appears.
            </p>
            <button className='px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors'>
              Test Button
            </button>
            <div className='mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded'>
              <p>This is a test container with a different background.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
