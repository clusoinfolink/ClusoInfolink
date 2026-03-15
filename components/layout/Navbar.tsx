'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { GlassButton } from '@/components/ui/GlassButton';
import clusoLogo from '@/assets/Cluso-Infolink-removebg-preview.png';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-2xl border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Cluso Infolink home">
            <Image
              src={clusoLogo}
              alt="Cluso Infolink"
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-cluso-deep transition-colors font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/getstarted">
              <GlassButton variant="primary" className="text-sm px-4 py-2">
                Get Started
              </GlassButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-2xl border-t border-white/20">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-700 hover:text-cluso-deep transition-colors font-medium py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/getstarted" onClick={() => setMobileOpen(false)}>
              <GlassButton variant="primary" className="w-full text-center mt-2">
                Get Started
              </GlassButton>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
