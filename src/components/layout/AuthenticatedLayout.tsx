// src/components/layout/AuthenticatedLayout.tsx
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const AuthenticatedLayout = () => {
  return (
    <div className='flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Top Bar */}
        <TopBar />

        {/* Main Content */}
        <main className='flex-1 overflow-y-auto p-4 md:p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
