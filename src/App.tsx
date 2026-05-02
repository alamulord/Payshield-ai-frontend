// src/App.tsx
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/appRoutes';
import { ThemeProvider } from './context/ThemeContext';

// Create a component that wraps the app with providers
const AppWithProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

function App() {
  return (
    <AppWithProviders>
      <RouterProvider router={router} />
    </AppWithProviders>
  );
}

export default App;
