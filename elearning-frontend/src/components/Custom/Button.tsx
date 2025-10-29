import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { theme, Icons } from '../../theme';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  size?: 'small' | 'medium' | 'large';
  block?: boolean;
  loading?: boolean;
}

const Button = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  block = false,
  loading = false,
  disabled = false,
  className = '',
  style,
  ...props
}: ButtonProps) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: theme.typography.fontWeight.medium,
    borderRadius: theme.borderRadius.md,
    transition: 'all 0.2s',
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    width: block ? '100%' : 'auto',
    ...style
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: theme.colors.primary,
          color: '#ffffff'
        };
      case 'default':
        return {
          backgroundColor: '#ffffff',
          color: theme.colors.text.primary,
          border: `1px solid ${theme.colors.border}`
        };
      case 'dashed':
        return {
          backgroundColor: 'transparent',
          color: theme.colors.text.primary,
          border: `1px dashed ${theme.colors.border}`
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          color: theme.colors.text.primary
        };
      case 'link':
        return {
          backgroundColor: 'transparent',
          color: theme.colors.primary,
          textDecoration: 'underline'
        };
      default:
        return {};
    }
  };

  const sizeStyles = {
    small: {
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      fontSize: theme.typography.fontSize.sm
    },
    medium: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.typography.fontSize.base
    },
    large: {
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.lg
    }
  };

  const buttonStyles: React.CSSProperties = {
    ...baseStyles,
    ...getVariantStyles(),
    ...sizeStyles[size]
  };

  return (
    <button
      className={className}
      style={buttonStyles}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span style={{ marginRight: theme.spacing.xs }}>
          <Icons.Loading style={{ animation: 'spin 1s linear infinite' }} />
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;