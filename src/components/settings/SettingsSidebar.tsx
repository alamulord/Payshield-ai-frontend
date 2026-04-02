import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children }) => (
  <div className='mb-6'>
    <p className='px-3 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2'>
      {title}
    </p>
    <div className='space-y-1'>{children}</div>
  </div>
);

interface NavItemProps {
  to: string;
  icon: string;
  children: React.ReactNode;
  badge?: number;
  exact?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  to,
  icon,
  children,
  badge,
  exact = false,
}) => {
  const location = useLocation();
  const isActive = exact
    ? location.pathname === to
    : location.pathname.startsWith(to);

  return (
    <NavLink
      to={to}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
        isActive
          ? 'bg-primary/10 text-primary dark:text-primary border border-primary/20'
          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f3639]'
      }`}
    >
      <span
        className={`material-symbols-outlined ${
          isActive
            ? 'text-primary'
            : 'text-slate-400 dark:text-slate-500 group-hover:text-primary'
        }`}
      >
        {icon}
      </span>
      <span className='text-sm font-medium'>{children}</span>
      {badge !== undefined && (
        <span className='ml-auto bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-1.5 py-0.5 rounded'>
          {badge}
        </span>
      )}
    </NavLink>
  );
};

const SettingsSidebar: React.FC = () => {
  return (
    <aside className='w-72 bg-card-light dark:bg-card-dark border-r border-border-light dark:border-border-dark flex flex-col h-full overflow-y-auto'>
      {/* Branding */}
      <div className='p-6 border-b border-border-light dark:border-border-dark flex items-center gap-3'>
        <div className='size-10 rounded-xl bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center text-[#102022] shadow-lg shadow-primary/20'>
          <span className='material-symbols-outlined text-2xl font-bold'>
            shield
          </span>
        </div>
        <div>
          <h1 className='text-base font-bold leading-none tracking-tight'>
            PayShield AI
          </h1>
          <p className='text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium'>
            Enterprise Admin
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 overflow-y-auto px-4 py-6 flex flex-col'>
        <SidebarSection title='Organization'>
          <NavItem to='/settings/general' icon='settings'>
            General Settings
          </NavItem>
          <NavItem to='/settings/team' icon='group' badge={12}>
            Team Management
          </NavItem>
        </SidebarSection>

        <div className='my-4 h-px bg-border-light dark:bg-border-dark mx-3'></div>

        <SidebarSection title='Platform'>
          <NavItem to='/settings/developer' icon='code' exact>
            Developer Settings
          </NavItem>
          <NavItem to='/settings/integrations' icon='api'>
            API & Integrations
          </NavItem>
          <NavItem to='/settings/notifications' icon='notifications'>
            Notifications
          </NavItem>
          <NavItem to='/settings/billing' icon='credit_card'>
            Billing & Usage
          </NavItem>
        </SidebarSection>

        <div className='my-4 h-px bg-border-light dark:bg-border-dark mx-3'></div>

        <SidebarSection title='Security'>
          <NavItem to='/settings/authentication' icon='lock'>
            Authentication
          </NavItem>
          <NavItem to='/settings/audit' icon='visibility'>
            Audit Logs
          </NavItem>
          <NavItem to='/settings/security' icon='security'>
            Security Rules
          </NavItem>
        </SidebarSection>
      </nav>
    </aside>
  );
};
export default SettingsSidebar;
