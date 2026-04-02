import { useLocation } from 'react-router-dom';
import { themes, defaultTheme } from '../theme/themeConfig';

export const useRouteTheme = () => {
  const location = useLocation();

  // Get the current theme based on the route
  const currentTheme = () => {
    const path = location.pathname.split('/')[1] || 'dashboard';
    return themes[path as keyof typeof themes] || defaultTheme;
  };

  return { currentTheme: currentTheme() };
};
