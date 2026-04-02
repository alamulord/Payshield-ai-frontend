import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useTheme, useCurrentTheme } from '../../context/ThemeContext';

export const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { colorMode, toggleColorMode } = useTheme();
  const { bgClass, textClass } = useCurrentTheme();

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div
      className={`flex h-screen overflow-hidden ${bgClass} transition-colors duration-200`}
    >
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className='flex flex-1 flex-col overflow-hidden'>
        <TopBar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          isDarkMode={colorMode === 'dark'}
          onToggleTheme={toggleColorMode}
        />

        <main className='flex-1 overflow-y-auto p-4 md:p-6'>
          <div className={`mx-auto  ${textClass}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
