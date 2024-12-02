import { InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ className, label, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-200">{label}</label>
      )}
      <input
        className={cn(
          'w-full px-3 py-2 bg-surface border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white',
          className
        )}
        {...props}
      />
    </div>
  );
}