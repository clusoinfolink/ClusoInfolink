import React from 'react';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export function GlassButton({ children, variant = 'primary', className = '', ...props }: GlassButtonProps) {
  const styles: Record<string, string> = {
    primary: 'bg-cluso-green/90 border-cluso-green/30 hover:bg-cluso-green text-white shadow-[0_4px_14px_rgba(92,184,92,0.3)]',
    secondary: 'bg-cluso-deep/80 border-cluso-mid/30 hover:bg-cluso-deep text-white shadow-[0_4px_14px_rgba(59,123,214,0.3)]',
    ghost: 'bg-white/10 border-white/20 hover:bg-white/20 text-white',
  };

  return (
    <button
      className={`backdrop-blur-sm border font-medium px-6 py-3 rounded-2xl transition-all duration-300 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
