// import { lazy } from 'react';
// import { createBrowserRouter } from 'react-router-dom';
// import { ProtectedRoute } from './ProtectedRoute';
// import { MainLayout } from '../components/layout/MainLayout';

// // Lazy load page components
// const LandingPage = lazy(() => import('../pages/LandingPage'));
// const ProfilePage = lazy(() => import('../pages/ProfilePage'));
// const TransactionDetailPage = lazy(
//   () => import('../pages/TransactionDetailPage')
// );
// const InvestigationDetailPage = lazy(
//   () => import('../pages/investigations/InvestigationDetailPage')
// );

// // Create and export the router
// export const router = createBrowserRouter([
//   // Public routes
//   {
//     path: '/',
//     element: <LandingPage />,
//   },
//   {
//     path: '/login',
//     element: <LoginPage />,
//   },
//   {
//     path: '/register',
//     element: <RegisterPage />,
//   },
//   // Protected routes
//   {
//     element: (
//       <ProtectedRoute>
//         <MainLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       {
//         index: true,
//         element: <OverviewPage />,
//       },
//       {
//         path: '/overview',
//         element: <OverviewPage />,
//       },
//       {
//         path: '/dashboard',
//         element: <DashboardPage />,
//       },
//       {
//         path: '/transactions',
//         element: <TransactionsPage />,
//       },
//       {
//         path: '/alerts',
//         element: <AlertsPage />,
//       },
//       {
//         path: '/investigations',
//         children: [
//           // {
//           //   index: true,
//           //   element: <InvestigationsPage />,
//           // },
//           {
//             path: ':caseId',
//             element: <InvestigationDetailPage />,
//           },
//         ],
//       },
//       {
//         path: '/models',
//         element: <ModelsPage />,
//       },
//       {
//         path: '/analytics',
//         element: <AnalyticsPage />,
//       },
//       {
//         path: '/rules',
//         element: <RulesPage />,
//       },
//       {
//         path: '/settings',
//         element: <SettingsPage />,
//       },
//       {
//         path: '/integrations',
//         element: <IntegrationsPage />,
//       },
//       {
//         path: '/profile',
//         element: <ProfilePage />,
//       },
//       {
//         path: '/transactions/:transactionId',
//         element: <TransactionDetailPage />,
//       },
//       {
//         path: '*',
//         element: (
//           <div className='flex items-center justify-center min-h-screen'>
//             <div className='text-center'>
//               <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>
//                 404 - Not Found
//               </h1>
//               <p className='mt-2 text-gray-600 dark:text-gray-300'>
//                 The page you're looking for doesn't exist.
//               </p>
//             </div>
//           </div>
//         ),
//       },
//     ],
//   },
// ]);

import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { MainLayout } from '../components/layout/MainLayout';
import { RootRedirect } from '../components/RootRedirect';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import EmailVerificationPage from '../pages/EmailVerificationPage';
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage'));
const PasswordResetPage = lazy(() => import('../pages/PasswordResetPage'));

// Lazy load page components
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const OverviewPage = lazy(() => import('../pages/OverviewPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const TransactionsPage = lazy(() => import('../pages/TransactionsPage'));
const AlertsPage = lazy(() => import('../pages/AlertsPage'));
const ModelsPage = lazy(() => import('../pages/ModelsPage'));
const AnalyticsPage = lazy(() => import('../pages/AnalyticsPage'));
const RulesPage = lazy(() => import('../pages/RulesPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const IntegrationsPage = lazy(() => import('../pages/IntegrationsPage'));
const InvestigationsPage = lazy(() => import('../pages/IntegrationsPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const TransactionDetailPage = lazy(
  () => import('../pages/TransactionDetailPage'),
);
const InvestigationDetailPage = lazy(
  () => import('../pages/investigations/InvestigationDetailPage'),
);

const LoadingFallback = () => (
  <div className='flex items-center justify-center min-h-screen'>
    <LoadingSpinner />
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: '/verify-email',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <EmailVerificationPage />
      </Suspense>
    ),
  },
  {
    path: '/verify-email/:token',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <EmailVerificationPage />
      </Suspense>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ForgotPasswordPage />
      </Suspense>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PasswordResetPage />
      </Suspense>
    ),
  },
  // Protected routes
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <MainLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to='/app/overview' replace />,
      },
      {
        path: 'overview',
        element: <OverviewPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'transactions',
        element: <TransactionsPage />,
      },
      {
        path: 'alerts',
        element: <AlertsPage />,
      },
      {
        path: 'models',
        element: <ModelsPage />,
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
      {
        path: 'rules',
        element: <RulesPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'integrations',
        element: <IntegrationsPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'transactions/app/:transactionId',
        element: <TransactionDetailPage />,
      },
      {
        path: 'investigations/app/:caseId',
        element: <InvestigationDetailPage />,
      },
    ],
  },
  // 404 route
  {
    path: '*',
    element: (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold'>404 - Not Found</h1>
          <p className='mt-2 text-gray-600'>
            The page you're looking for doesn't exist.
          </p>
        </div>
      </div>
    ),
  },
]);
