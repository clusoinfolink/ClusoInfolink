'use client';

import React from 'react';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { GlassButton } from '@/components/ui/GlassButton';
import { Monitor } from 'lucide-react';

export function FullyOptimised() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Dark background with glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Decorative blurred shapes */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-cluso-deep/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cluso-mid/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image placeholder */}
          <AnimatedSection direction="left">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] glass-dark">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Monitor size={64} className="mx-auto mb-4 text-cluso-sky/50" />
                  <p className="text-white/50 text-lg font-heading">Team Collaboration</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Text */}
          <AnimatedSection direction="right" delay={0.2}>
            <div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Fully Optimised: The Only Software You Need
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Our automated background check software combines every verification
                tool you need into one seamless platform. No more juggling multiple
                services — Cluso handles criminal checks, employment history, education
                records, identity verification, and more, all in one place.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                Built with cutting-edge technology and designed for scale, our platform
                delivers results faster and more accurately than traditional methods.
              </p>
              <GlassButton variant="primary" className="text-lg px-8 py-4">
                Coming Soon
              </GlassButton>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
