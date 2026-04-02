// src/App.tsx
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/appRoutes';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';



// Debug component to verify React is working
// const DebugBanner = () => (
//   <div
//     style={{
//       position: 'fixed',
//       bottom: '5px',
//       left: '10px',
//       backgroundColor: 'red',
//       color: 'white',
//       padding: '5px',
//       zIndex: 9999,
//       borderRadius: '10px',
//       fontSize: '9px',
//       fontFamily: 'monospace',
//     }}
//   >
//     React is working!
//   </div>
// );

// Create a component that wraps the app with providers
const AppWithProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <AuthProvider>
      {children}
      {/* <AppRoutes /> */}
      {/* <DebugBanner /> */}
    </AuthProvider>
  </ThemeProvider>
);

function App() {
  return (
    <AppWithProviders>
      <RouterProvider router={router} />
    </AppWithProviders>
  );
}

export default App;
