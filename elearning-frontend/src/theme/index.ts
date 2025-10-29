// Theme system exports
export { colors } from './colors';
export { typography } from './typography';
export { Icons } from './icons';

// Re-export types
export type { ColorKey } from './colors';
export type { TypographyKey } from './typography';
export type { IconName } from './icons';

// Import typography for theme object
import { typography as typographyConfig } from './typography';

// Theme configuration
export const theme = {
  colors: {
    primary: '#1890ff',
    secondary: '#52c41a',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff',
    text: {
      primary: '#262626',
      secondary: '#595959',
      disabled: '#bfbfbf',
    },
    background: {
      primary: '#ffffff',
      secondary: '#fafafa',
      tertiary: '#f5f5f5',
    },
    border: '#d9d9d9',
  },
  
  typography: typographyConfig,
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

export default theme;