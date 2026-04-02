// // import React, { useState, useRef, useEffect } from 'react';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import { useAuth } from '../../context/AuthContext';
// // import { Avatar } from '../common/Avatar';
// // import { useClickOutside } from '../../hooks/useClickOutside';

// // declare global {
// //   namespace JSX {
// //     interface IntrinsicElements {
// //       [elemName: string]: any;
// //     }
// //   }
// // }

// // interface Notification {
// //   id: number;
// //   text: string;
// //   time: string;
// //   read: boolean;
// //   type: 'alert' | 'info' | 'success' | 'warning';
// //   link?: string;
// // }

// // interface TopBarProps {
// //   onMenuClick: () => void;
// //   isDarkMode: boolean;
// //   onToggleTheme: () => void;
// // }

// // export const TopBar: React.FC<TopBarProps> = ({ onMenuClick, isDarkMode, onToggleTheme }) => {
// //   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
// //   const [isProfileOpen, setIsProfileOpen] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const { user, logout } = useAuth() || {};
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const searchInputRef = useRef<HTMLInputElement>(null);
// //   const notificationsRef = useClickOutside(() => setIsNotificationsOpen(false));
// //   const profileRef = useClickOutside(() => setIsProfileOpen(false));
// //   // ... rest of your component logic ...

// //   // Sample notifications - in a real app, these would come from an API
// //   const [notifications, setNotifications] = useState<Notification[]>([
// //     {
// //       id: 1,
// //       text: 'New high-risk transaction detected',
// //       time: '2 min ago',
// //       read: false,
// //       type: 'alert',
// //       link: '/transactions/123',
// //     },
// //     {
// //       id: 2,
// //       text: 'New alert rule created',
// //       time: '1 hour ago',
// //       read: true,
// //       type: 'info',
// //       link: '/rules/456',
// //     },
// //     {
// //       id: 3,
// //       text: 'Scheduled maintenance tonight',
// //       time: '5 hours ago',
// //       read: true,
// //       type: 'info',
// //     },
// //   ]);

// //   const unreadCount = notifications.filter((n) => !n.read).length;

// //   const handleSearch = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (searchQuery.trim()) {
// //       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
// //       setSearchQuery('');
// //     }
// //   };

// //   const markAsRead = (id: number) => {
// //     setNotifications(
// //       notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
// //     );
// //   };

// //   const markAllAsRead = () => {
// //     setNotifications(notifications.map((n) => ({ ...n, read: true })));
// //   };

// //   const handleNotificationClick = (notification: Notification) => {
// //     markAsRead(notification.id);
// //     if (notification.link) {
// //       navigate(notification.link);
// //     }
// //     setIsNotificationsOpen(false);
// //   };

// //   const handleLogout = async () => {
// //     try {
// //       await logout();
// //       navigate('/login');
// //     } catch (error) {
// //       console.error('Failed to log out', error);
// //     }
// //   };

// //   // Close dropdowns when route changes
// //   useEffect(() => {
// //     setIsNotificationsOpen(false);
// //     setIsProfileOpen(false);
// //   }, [location.pathname]);

// //   // Focus search input when search icon is clicked (mobile)
// //   const focusSearch = () => {
// //     searchInputRef.current?.focus();
// //   };

// //   return (
// //     <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
// //       <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
// //         <div className="flex items-center">
// //           <button
// //             type="button"
// //             className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
// //             onClick={onMenuClick}
// //             aria-label="Toggle sidebar"
// //           >
// //             <span className="sr-only">Open sidebar</span>
// //             <span className="material-symbols-outlined">menu</span>
// //           </button>
// //         </div>

// //         <div className="flex items-center space-x-4">
// //           <button
// //             type="button"
// //             className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
// //             onClick={onToggleTheme}
// //             aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
// //           >
// //             <span className="sr-only">Toggle theme</span>
// //             <span className="material-symbols-outlined">
// //               {isDarkMode ? 'light_mode' : 'dark_mode'}
// //             </span>
// //           </button>

// //           <div className="relative">
// //             <div className="flex items-center">
// //               <div className="ml-3 relative">
// //                 <div className="flex items-center">
// //                   <div className="flex-shrink-0">
// //                     <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
// //                       {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
// //                     </div>
// //                   </div>
// //                   <div className="ml-3">
// //                     <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
// //                       {user?.name || 'User'}
// //                     </p>
// //                     <p className="text-xs text-gray-500 dark:text-gray-400">
// //                       {user?.email || 'user@example.com'}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //     <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
// //       <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
// //         <div className="flex items-center">
// //           <button
// //             type="button"
// //             className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
// //             onClick={onMenuClick}
// //             aria-label="Toggle sidebar"
// //           >
// //             <span className="sr-only">Open sidebar</span>
// //             <span className="material-symbols-outlined">menu</span>
// //           </button>
// //         </div>

// //         <div className="flex items-center space-x-4">
// //           <button
// //             type="button"
// //             className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
// //             onClick={onToggleTheme}
// //             aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
// //           >
// //             <span className="sr-only">Toggle theme</span>
// //             <span className="material-symbols-outlined">
// //               {isDarkMode ? 'light_mode' : 'dark_mode'}
// //             </span>
// //           </button>

// //           <div className="relative">
// //             <div className="flex items-center">
// //               <div className="ml-3 relative">
// //                 <div className="flex items-center">
// //                   <div className="flex-shrink-0">
// //                     <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
// //                       {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
// //                     </div>
// //                   </div>
// //                   <div className="ml-3">
// //                     <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
// //                       {user?.name || 'User'}
// //                     </p>
// //                     <p className="text-xs text-gray-500 dark:text-gray-400">
// //                       {user?.email || 'user@example.com'}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //     <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
// //       <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
// //         <div className="flex items-center">
// //           <button
// //             type="button"
// //             className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
// //             onClick={onMenuClick}
// //             aria-label="Toggle sidebar"
// //           >
// //             <span className="sr-only">Open sidebar</span>
// //             <span className="material-symbols-outlined">menu</span>
// //           </button>
// //         </div>

// //         <div className="flex items-center">
// //           <button
// //             type="button"
// //             className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
// //             onClick={onToggleTheme}
// //             aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
// //           >
// //             <span className="sr-only">Toggle theme</span>
// //             <span className="material-symbols-outlined">
// //               {isDarkMode ? 'light_mode' : 'dark_mode'}
// //             </span>
// //           </button>

// //           <div className="ml-4 flex items-center md:ml-6">
// //             <div className="relative">
// //               <div className="flex items-center">
// //                 <div className="ml-3 relative">
// //                   <div className="flex items-center">
// //                     <div className="flex-shrink-0">
// //                       <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
// //                         {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
// //                       </div>
// //                     </div>
// //                     <div className="ml-3">
// //                       <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
// //                         {user?.name || 'User'}
// //                       </p>
// //                       <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
// //                         {user?.email || 'user@example.com'}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //     <div className='border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'>
// //       <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
// //         <div className="flex items-center">
// //           <button
// //             type="button"
// //             className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
// //             onClick={onMenuClick}
// //             aria-label="Toggle sidebar"
// //           >
// //             <span className="sr-only">Open sidebar</span>
// //             <span className="material-symbols-outlined">menu</span>
// //           </button>
// //                 }
// //               }}
// //               aria-label={`Notifications ${
// //                 unreadCount > 0 ? `(${unreadCount} unread)` : ''
// //               }`}
// //               aria-expanded={isNotificationsOpen}
// //               aria-haspopup='true'
// //             >
// //               <span className='material-symbols-outlined'>notifications</span>
// //               {unreadCount > 0 && (
// //                 <span className='absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800'></span>
// //               )}
// //             </button>

// //             {isNotificationsOpen && (
// //               <div className='origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10 divide-y divide-gray-100 dark:divide-gray-700'>
// //                 <div className='px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center'>
// //                   <p className='text-sm font-medium text-gray-700 dark:text-gray-200'>
// //                     Notifications
// //                   </p>
// //                   <button
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                       markAllAsRead();
// //                     }}
// //                     className='text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'
// //                   >
// //                     Mark all as read
// //                   </button>
// //                 </div>
// //                 <div className='max-h-96 overflow-y-auto'>
// //                   {notifications.length > 0 ? (
// //                     notifications.map((notification) => (
// //                       <div
// //                         key={notification.id}
// //                         className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
// //                           !notification.read
// //                             ? 'bg-blue-50 dark:bg-blue-900/30'
// //                             : ''
// //                         }`}
// //                         onClick={() => handleNotificationClick(notification)}
// //                       >
// //                         <div className='flex items-start'>
// //                           <span
// //                             className={`inline-flex items-center justify-center h-6 w-6 rounded-full flex-shrink-0 ${
// //                               notification.type === 'alert'
// //                                 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
// //                                 : notification.type === 'warning'
// //                                 ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
// //                                 : notification.type === 'success'
// //                                 ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
// //                                 : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
// //                             }`}
// //                           >
// //                             <span className='material-symbols-outlined text-sm'>
// //                               {notification.type === 'alert'
// //                                 ? 'warning_amber'
// //                                 : notification.type === 'warning'
// //                                 ? 'warning'
// //                                 : notification.type === 'success'
// //                                 ? 'check_circle'
// //                                 : 'info'}
// //                             </span>
// //                           </span>
// //                           <div className='ml-3 flex-1'>
// //                             <p className='text-sm text-gray-700 dark:text-gray-200'>
// //                               {notification.text}
// //                             </p>
// //                             <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
// //                               {notification.time}
// //                             </p>
// //                           </div>
// //                           {!notification.read && (
// //                             <span className='ml-2 h-2 w-2 rounded-full bg-blue-500'></span>
// //                           )}
// //                         </div>
// //                       </div>
// //                     ))
// //                   ) : (
// //                     <div className='px-4 py-6 text-center'>
// //                       <span className='material-symbols-outlined text-gray-400 text-4xl mx-auto'>
// //                         notifications_off
// //                       </span>
// //                       <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
// //                         No new notifications
// //                       </p>
// //                     </div>
// //                   )}
// //                 </div>
// //                 <div className='px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-center'>
// //                   <Link
// //                     to='/alerts'
// //                     className='text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'
// //                     onClick={() => setIsNotificationsOpen(false)}
// //                   >
// //                     View all notifications
// //                   </Link>
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Profile dropdown */}
// //           <div
// //             className='relative ml-2'
// //             ref={profileRef}
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <button
// //               type='button'
// //               className={`flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
// //                 isProfileOpen ? 'ring-2 ring-blue-500' : ''
// //               }`}
// //               id='user-menu'
// //               aria-expanded={isProfileOpen}
// //               aria-haspopup='true'
// //               onClick={() => {
// //                 setIsProfileOpen(!isProfileOpen);
// //                 setIsNotificationsOpen(false);
// //               }}
// //             >
// //               <span className='sr-only'>Open user menu</span>
// //               <Avatar
// //                 src={user?.avatar || ''}
// //                 name={user?.name || 'User'}
// //                 size='sm'
// //                 className={`border-2 ${
// //                   isProfileOpen
// //                     ? 'border-blue-500'
// //                     : 'border-white dark:border-gray-800'
// //                 }`}
// //               />
// //               <span className='ml-2 text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:inline'>
// //                 {user?.name || 'User'}
// //               </span>
// //               <span
// //                 className={`ml-1 text-gray-400 transition-transform ${
// //                   isProfileOpen ? 'transform rotate-180' : ''
// //                 }`}
// //               >
// //                 <span className='material-symbols-outlined'>expand_more</span>
// //               </span>
// //             </button>

// //             {isProfileOpen && (
// //               <div
// //                 className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10 divide-y divide-gray-100 dark:divide-gray-700'
// //                 role='menu'
// //                 aria-orientation='vertical'
// //                 aria-labelledby='user-menu'
// //               >
// //                 <div className='px-4 py-3'>
// //                   <p className='text-sm text-gray-900 dark:text-white font-medium truncate'>
// //                     {user?.name || 'User'}
// //                   </p>
// //                   <p className='text-sm text-gray-500 dark:text-gray-400 truncate'>
// //                     {user?.email || 'user@example.com'}
// //                   </p>
// //                 </div>
// //                 <div className='py-1'>
// //                   <Link
// //                     to='/profile'
// //                     className='px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center'
// //                     role='menuitem'
// //                     onClick={() => setIsProfileOpen(false)}
// //                   >
// //                     <span className='material-symbols-outlined mr-2 text-lg'>
// //                       person
// //                     </span>
// //                     Your Profile
// //                   </Link>
// //                   <Link
// //                     to='/settings'
// //                     className='px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center'
// //                     role='menuitem'
// //                     onClick={() => setIsProfileOpen(false)}
// //                   >
// //                     <span className='material-symbols-outlined mr-2 text-lg'>
// //                       settings
// //                     </span>
// //                     Settings
// //                   </Link>
// //                   <Link
// //                     to='/help'
// //                     className='px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center'
// //                     role='menuitem'
// //                     onClick={() => setIsProfileOpen(false)}
// //                   >
// //                     <span className='material-symbols-outlined mr-2 text-lg'>
// //                       help_center
// //                     </span>
// //                     Help & Support
// //                   </Link>
// //                 </div>
// //                 <div className='py-1'>
// //                   <button
// //                     onClick={handleLogout}
// //                     className='w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center'
// //                     role='menuitem'
// //                   >
// //                     <span className='material-symbols-outlined mr-2 text-lg'>
// //                       logout
// //                     </span>
// //                     Sign out
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Mobile search input - only visible when search is active */}
// //       <div className='md:hidden px-4 pb-3'>
// //         <form onSubmit={handleSearch} className='relative'>
// //           <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
// //             <span className='material-symbols-outlined text-gray-400'>
// //               search
// //             </span>
// //           </div>
// //           <input
// //             ref={searchInputRef}
// //             type='text'
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             className='block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors'
// //             placeholder='Search...'
// //             aria-label='Search'
// //           />
// //           {searchQuery && (
// //             <button
// //               type='button'
// //               onClick={() => setSearchQuery('')}
// //               className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300'
// //               aria-label='Clear search'
// //             >
// //               <span className='material-symbols-outlined text-lg'>close</span>
// //             </button>
// //           )}
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };
// // src/components/layout/TopBar.tsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// interface TopBarProps {
//   onMenuClick: () => void;
//   isDarkMode: boolean;
//   onToggleTheme: () => void;
// }

// export const TopBar: React.FC<TopBarProps> = ({ onMenuClick, isDarkMode, onToggleTheme }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const { user, logout } = useAuth() || {};

//   return (
//     <header className="z-10 flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:px-8">
//       {/* Left side - Menu button and search */}
//       <div className="flex flex-1 items-center gap-4">
//         <button
//           type="button"
//           className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 md:hidden"
//           onClick={onMenuClick}
//         >
//           <span className="material-symbols-outlined">menu</span>
//         </button>

//         <div className="relative hidden max-w-xl flex-1 md:block">
//           <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//             search
//           </span>
//           <input
//             type="text"
//             placeholder="Search transactions, users, or rules..."
//             className="w-full rounded-lg border-0 bg-slate-100 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Right side - Actions and profile */}
//       <div className="flex items-center gap-4">
//         <button
//           type="button"
//           className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
//           onClick={onToggleTheme}
//           aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
//         >
//           <span className="material-symbols-outlined">
//             {isDarkMode ? 'light_mode' : 'dark_mode'}
//           </span>
//         </button>

//         <button
//           type="button"
//           className="relative text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
//         >
//           <span className="material-symbols-outlined">notifications</span>
//           <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
//             3
//           </span>
//         </button>

//         <div className="relative">
//           <button
//             type="button"
//             className="flex items-center gap-2"
//             onClick={() => setIsProfileOpen(!isProfileOpen)}
//           >
//             <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
//               {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
//             </div>
//             <span className="hidden text-sm font-medium text-slate-700 dark:text-slate-200 md:inline">
//               {user?.name || 'User'}
//             </span>
//             <span className="material-symbols-outlined text-slate-400">expand_more</span>
//           </button>

//           {/* Profile dropdown */}
//           {isProfileOpen && (
//             <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-slate-800 dark:ring-white/10">
//               <Link
//                 to="/profile"
//                 className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
//                 onClick={() => setIsProfileOpen(false)}
//               >
//                 Your Profile
//               </Link>
//               <Link
//                 to="/settings"
//                 className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
//                 onClick={() => setIsProfileOpen(false)}
//               >
//                 Settings
//               </Link>
//               <button
//                 onClick={() => {
//                   logout?.();
//                   setIsProfileOpen(false);
//                 }}
//                 className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
//               >
//                 Sign out
//               </button>
//             </div>
//           )}
// src/components/layout/TopBar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Hook to handle clicks outside of an element
const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

interface TopBarProps {
  onMenuClick: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onMenuClick,
  isDarkMode,
  onToggleTheme,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser, logout } = useAuth() || {};
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useClickOutside(profileRef, () => {
    if (isProfileOpen) setIsProfileOpen(false);
  });

  const handleLogout = async () => {
    try {
      await logout?.();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className='z-10 flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:px-8'>
      {/* Left side - Menu button and search */}
      <div className='flex flex-1 items-center gap-4'>
        <button
          type='button'
          className='text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 md:hidden'
          onClick={onMenuClick}
        >
          <span className='material-symbols-outlined'>menu</span>
        </button>

        <div className='relative hidden max-w-xl flex-1 md:block'>
          <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'>
            search
          </span>
          <input
            type='text'
            placeholder='Search transactions, users, or rules...'
            className='w-full rounded-lg border-0 bg-slate-100 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Right side - Actions and profile */}
      <div className='flex items-center gap-4'>
        <button
          type='button'
          className='text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          onClick={onToggleTheme}
          aria-label={
            isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
          }
        >
          <span className='material-symbols-outlined'>
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <button
          type='button'
          className='relative text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
        >
          <span className='material-symbols-outlined'>notifications</span>
          <span className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white'>
            3
          </span>
        </button>

        <div className='relative' ref={profileRef}>
          <button
            type='button'
            className='flex items-center gap-2 rounded-full p-1 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            aria-expanded={isProfileOpen}
            aria-haspopup='true'
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
              {currentUser?.displayName
                ? currentUser.displayName.charAt(0).toUpperCase()
                : 'U'}
            </div>
            <span className='hidden text-sm font-medium text-slate-700 dark:text-slate-200 md:inline'>
              {currentUser?.displayName || 'User'}
            </span>
            <span className='material-symbols-outlined text-slate-400'>
              {isProfileOpen ? 'expand_less' : 'expand_more'}
            </span>
          </button>

          {/* Profile dropdown */}
          {isProfileOpen && (
            <div className='absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-slate-800 dark:ring-white/10'>
              <Link
                to='/app/profile'
                className='block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50'
                onClick={() => setIsProfileOpen(false)}
              >
                Your Profile
              </Link>
              <Link
                to='/app/settings'
                className='block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50'
                onClick={() => setIsProfileOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  logout?.();
                  setIsProfileOpen(false);
                }}
                className='block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20'
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
