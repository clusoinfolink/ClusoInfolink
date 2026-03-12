import React from 'react';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function GlassInput({ label, className = '', ...props }: GlassInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}
      <input
        className={`w-full bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50 focus:border-cluso-mid/50 transition-all ${className}`}
        {...props}
      />
    </div>
  );
}
