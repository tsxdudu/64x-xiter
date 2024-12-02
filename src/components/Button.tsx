import { ButtonHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-colors',
        {
          'bg-primary hover:bg-primary-dark text-white': variant === 'primary',
          'bg-surface hover:bg-gray-800 text-white': variant === 'secondary',
          'border-2 border-primary text-primary hover:bg-primary hover:text-white':
            variant === 'outline',
        },
        className
      )}
      {...props}
    />
  );
}