import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User } from 'firebase/auth';

interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  badge?: number;
  isHeader?: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Overview', href: '/', icon: 'grid_view' },
  { name: 'PLATFORM', href: '#', icon: '', isHeader: true },
  { name: 'Dashboard', href: '/app/dashboard', icon: 'dashboard' },
  { name: 'Transactions', href: '/app/transactions', icon: 'credit_card' },
  { name: 'Alerts', href: '/app/alerts', icon: 'notifications', badge: 3 },
  { name: 'AI Models', href: '/app/models', icon: 'psychology' },
  { name: 'Analytics', href: '/app/analytics', icon: 'analytics' },
  { name: 'SETTINGS', href: '#', icon: '', isHeader: true },
  { name: 'Integration', href: '/app/integrations', icon: 'hub' },
  { name: 'Settings', href: '/app/settings', icon: 'settings' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 flex w-72 flex-col border-r border-slate-800 bg-slate-900 transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0`}
    >
      {/* Logo */}
      <div className='flex items-center gap-3 border-b border-slate-800/50 px-6 py-5'>
        <div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-900/20'>
          <span className='material-symbols-outlined text-[24px]'>
            shield_lock
          </span>
        </div>
        <div className='flex flex-col'>
          <h1 className='text-base font-bold leading-tight tracking-tight text-white'>
            PayShield AI
          </h1>
          <p className='text-xs font-normal text-slate-400'>
            Risk & Fraud Platform
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className='sidebar-scroll flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-6'>
        {navigation.map((item) => {
          if (item.isHeader) {
            return (
              <p
                key={item.name}
                className='mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500'
              >
                {item.name}
              </p>
            );
          }

          const isActive = location.pathname === item.href;

          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-slate-300 ${
                isActive
                  ? 'bg-blue-600/30 text-white shadow-lg shadow-blue-900/20'
                  : 'hover:bg-white/5 hover:text-white'
              }`}
              onClick={onClose}
            >
              <span
                className={`material-symbols-outlined text-[22px] ${
                  isActive ? 'text-white' : 'group-hover:text-white'
                }`}
              >
                {item.icon}
              </span>
              <span>{item.name}</span>
              {item.badge && (
                <span className='ml-auto rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white'>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* User Profile */}
      <div className='mt-auto border-t border-slate-800/50 p-4'>
        <div className='flex items-center gap-3 rounded-lg p-2 hover:bg-slate-800/50'>
          <div className='flex size-10 items-center justify-center rounded-full bg-slate-700 text-sm font-medium text-white'>
            {currentUser?.displayName?.[0] ||
              currentUser?.email?.[0]?.toUpperCase() ||
              'U'}
          </div>
          <div className='flex-1 min-w-0'>
            <p className='truncate text-sm font-medium text-white'>
              {currentUser?.displayName || currentUser?.email || 'User'}
            </p>
            <p className='truncate text-xs text-slate-400'>
              {currentUser?.email || 'No email'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
