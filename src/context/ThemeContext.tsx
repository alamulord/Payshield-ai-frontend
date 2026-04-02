// src/context/ThemeContext.tsx
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { ThemeConfig } from '../theme/themeConfig';
import { defaultTheme } from '../theme/themeConfig';

type ColorMode = 'light' | 'dark';

interface ThemeContextType {
  colorMode: ColorMode;
  currentTheme: ThemeConfig;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [colorMode, setColorMode] = useState<ColorMode>('dark');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ColorMode | null;
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (savedTheme) {
      setColorMode(savedTheme);
    } else if (systemPrefersDark) {
      setColorMode('dark');
    } else {
      setColorMode('light');
    }
  }, []);

  // Apply theme class to document element
  useEffect(() => {
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', colorMode);
  }, [colorMode]);

  const toggleColorMode = () => {
    setColorMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Default theme, will be overridden by useRouteTheme in components
  const contextValue = useMemo(
    () => ({
      colorMode,
      currentTheme: defaultTheme, // This will be overridden by useRouteTheme
      toggleColorMode,
    }),
    [colorMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// This hook should be used within components that are inside a Router
import { useRouteTheme } from '../hooks/useRouteTheme';

export const useCurrentTheme = () => {
  const { currentTheme, colorMode } = useTheme();
  const { currentTheme: routeTheme } = useRouteTheme(); // This will use the route-based theme

  return {
    theme: routeTheme || currentTheme,
    isDark: colorMode === 'dark',
    bgClass:
      colorMode === 'dark'
        ? routeTheme?.dark || currentTheme.dark
        : routeTheme?.light || currentTheme.light,
    textClass: colorMode === 'dark' ? 'text-white' : 'text-gray-900',
  };
};
