import { colors as baseColors } from './colors';
import { typography as baseTypography } from './typography';

export const theme = {
  colors: {
    primary: baseColors.primary,
    background: {
      secondary: '#F9FAFB',
      tertiary: '#F3F4F6',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      disabled: '#9CA3AF',
    },
    border: '#E5E7EB',
    success: '#10B981',
  },
  typography: {
    fontSize: {
      base: '1rem',
      sm: baseTypography.small.fontSize,
      lg: '1.125rem',
      '2xl': '1.5rem',
    },
    fontWeight: {
      medium: 500,
      semibold: 600,
    },
    lineHeight: {
      normal: 1.5,
      relaxed: 1.625,
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
} as const;

export type Theme = typeof theme;


