'use client';

import React from 'react';

interface GlassModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function GlassModal({ open, onClose, children }: GlassModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      />
      <div className="relative bg-white/15 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4">
        {children}
      </div>
    </div>
  );
}
