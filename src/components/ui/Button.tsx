import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'red' | 'yellow' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-sm';

  const variants = {
    primary:
      'bg-meatin-green text-white hover:bg-meatin-green-hover focus:ring-meatin-green shadow-green-glow/20 hover:shadow-green-glow/40',
    red:
      'bg-meatin-red text-white hover:bg-meatin-red-hover focus:ring-meatin-red shadow-red-glow/20 hover:shadow-red-glow/40',
    yellow:
      'bg-meatin-yellow text-slate-950 font-semibold hover:bg-meatin-yellow-hover focus:ring-meatin-yellow hover:shadow-md',
    outline:
      'border-2 border-meatin-green text-meatin-green hover:bg-meatin-green hover:text-white focus:ring-meatin-green',
    ghost:
      'text-slate-700 hover:bg-slate-100 hover:text-meatin-green focus:ring-slate-300 shadow-none',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5 font-semibold',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
