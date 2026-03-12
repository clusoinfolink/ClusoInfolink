import React from 'react';

interface GlassNavbarProps {
  children: React.ReactNode;
}

export function GlassNavbar({ children }: GlassNavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-2xl border-b border-white/20 shadow-sm">
      {children}
    </nav>
  );
}
