// src/components/layout/Footer.tsx
export const Footer = () => {
  return (
    <footer className='bg-white dark:bg-background-dark border-t border-gray-200 dark:border-border-dark p-7'>
      <div className='container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm'>
        © {new Date().getFullYear()} PayShield. All rights reserved.
      </div>
    </footer>
  );
};
