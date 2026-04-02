// src/components/layout/RootLayout.tsx
import type { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>PayShield - Secure Payment Platform</title>
        <meta
          name='description'
          content='Secure payment processing and financial management'
        />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className='min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200'>
        {children}
      </body>
    </html>
  );
};
