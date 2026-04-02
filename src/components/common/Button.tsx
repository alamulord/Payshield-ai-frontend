// src/components/common/Button.tsx
import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
  ElementType,
} from 'react';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

type BaseProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: 'button';
  };

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as: 'a';
  };

type RouterLinkProps = BaseProps &
  Omit<LinkProps & { to: string }, keyof BaseProps> & {
    as: typeof Link;
  };

type Props = ButtonProps | AnchorProps | RouterLinkProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-blue-700 hover:text-gray-200 focus:ring-blue-500',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
  outline:
    'border border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800 focus:ring-blue-500',
  ghost:
    'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:ring-gray-500',
};

export const Button = ({
  variant = 'primary',
  children,
  className = '',
  as: Component = 'button',
  ...props
}: Props) => {
  const baseClasses =
    'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variantClass = variantClasses[variant] || variantClasses.primary;

  const commonProps = {
    className: `${baseClasses} ${variantClass} ${className}`,
    children,
  };

  // Handle different element types
  if (Component === 'a') {
    return (
      <a
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        {...commonProps}
      />
    );
  }

  if (Component === Link) {
    return <Link {...(props as LinkProps)} {...commonProps} />;
  }

  // Default to button
  return (
    <button
      type={(props as ButtonHTMLAttributes<HTMLButtonElement>).type || 'button'}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      {...commonProps}
    />
  );
};
