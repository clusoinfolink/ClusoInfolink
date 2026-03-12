'use client';

import React from 'react';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { Layers } from 'lucide-react';

export function SoftwareVersatility() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Left */}
          <AnimatedSection direction="left">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-cluso-deep to-cluso-mid">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Layers size={64} className="mx-auto mb-4 opacity-80" />
                  <p className="text-xl font-heading font-semibold">Seamless Integration</p>
                </div>
              </div>
            </div>
            {/* Green accent bar */}
            <div className="h-1 w-full bg-cluso-green rounded-full mt-4" />
          </AnimatedSection>

          {/* Text Right */}
          <AnimatedSection direction="right" delay={0.2}>
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Layers className="text-cluso-green" size={20} />
                <span className="text-cluso-green text-sm font-semibold uppercase tracking-wider">
                  VERSATILE SOLUTIONS
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Cluso Emerges As The Ideal Solution For All Your Business Requirements.
              </h2>
              <p className="text-gray-600 leading-relaxed">
                From employment verification to criminal record checks, education validation
                to identity confirmation — our platform handles every aspect of background
                screening with equal precision and thoroughness.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Our APIs integrate seamlessly with your existing HR systems, applicant
                tracking software, and onboarding workflows. Cluso adapts to your
                business — not the other way around.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
