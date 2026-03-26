import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { getSiteSettings } from '@/lib/settings';

const footerLinks = {
  about: [
    { label: 'Our Culture', href: '/about' },
    { label: 'Our History', href: '/about' },
  ],
  resources: [
    { label: 'Services', href: '/services' },
    { label: 'Latest News', href: '/blog' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

export async function Footer() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  const socialIcons = [
    { key: 'facebook', icon: Facebook, label: 'Facebook', href: settings.socialLinks.facebook },
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: settings.socialLinks.linkedin },
    { key: 'instagram', icon: Instagram, label: 'Instagram', href: settings.socialLinks.instagram },
  ].filter((s) => s.href);

  return (
    <footer className="bg-[#333] text-white">
      <div className="glass-dark border-0 rounded-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <h3 className="font-heading text-2xl font-bold mb-4">
                <span className="text-cluso-sky">Cluso</span> Infolink
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Let&apos;s Make It Transparent. Trust and accuracy are our top priorities
                in delivering exceptional background verification services.
              </p>
            </div>

            {/* About */}
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4">About</h4>
              <ul className="space-y-2">
                {footerLinks.about.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-cluso-sky transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-cluso-sky transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4">
                <Link href="/contact" className="hover:text-cluso-sky transition-colors">
                  Contact Us
                </Link>
              </h4>
              <p className="text-white/70 text-sm">
                Use the contact form to reach the right department quickly.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              &copy; {year} {settings.siteName}. All rights reserved.
            </p>
            {socialIcons.length > 0 && (
              <div className="flex items-center space-x-4">
                {socialIcons.map((social) => (
                  <a
                    key={social.key}
                    href={social.href}
                    className="text-white/50 hover:text-cluso-sky transition-colors"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
