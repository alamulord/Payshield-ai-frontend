export interface ThemeConfig {
  light: string;
  dark: string;
  name: string;
}

export const themes: Record<string, ThemeConfig> = {
  dashboard: {
    name: 'Dashboard',
    light: 'bg-[#f6f6f8]',
    dark: 'bg-slate-900',
  },
  models: {
    name: 'AI Models',
    light: 'bg-[#f6f8f8]',
    dark: 'bg-[#102022]',
  },
  transactions: {
    name: 'Transactions',
    light: 'bg-[#f6f6f8]',
    dark: 'bg-[#111621]',
  },
  integrations: {
    name: 'Integration',
    light: 'bg-[#f6f6f8]',
    dark: 'bg-[#111621]',
  },
  alert: {
    name: 'Alert',
    light: 'bg-[#f8f7f5]',
    dark: 'bg-[#221910]',
  },
  settings: {
    name: 'Settings',
    light: 'bg-gray-50',
    dark: 'bg-gray-900',
  },
  risk: {
    name: 'Risk Management',
    light: 'bg-amber-50',
    dark: 'bg-amber-950',
  },
  analytics: {
    name: 'Analytics',
    light: 'bg-[#f6f8f8]',
    dark: 'bg-[#102022]',
  },
  users: {
    name: 'User Management',
    light: 'bg-violet-50',
    dark: 'bg-violet-950',
  },
};

export const defaultTheme = themes.dashboard;
