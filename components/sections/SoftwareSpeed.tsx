'use client';

import React from 'react';
import Image from 'next/image';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { Zap } from 'lucide-react';
import speedImage from '@/assets/Our Software Prioritizes Speed, Efficiency, Ensuring Precise Insights..jpg';

export function SoftwareSpeed() {
  return (
    <section className="py-20 bg-[#f5f5f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Left */}
          <AnimatedSection direction="left">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="text-cluso-green" size={20} />
                <span className="text-cluso-green text-sm font-semibold uppercase tracking-wider">
                  ENSURING YOUR SYSTEMS ARE OPTIMAL
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Software Prioritizes Speed, Efficiency, Ensuring Precise Insights.
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Built on lean architecture and modern infrastructure, our verification
                platform processes checks at unprecedented speed without compromising
                accuracy. Real-time data pipelines ensure that every screening result
                is delivered when you need it — not days or weeks later.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Whether you&apos;re onboarding a single candidate or screening thousands,
                our system scales effortlessly to meet your demands while maintaining
                the highest standards of data integrity and compliance.
              </p>
            </div>
          </AnimatedSection>

          {/* Image Right */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-cluso-mid to-cluso-sky">
              <Image
                src={speedImage}
                alt="Lightning Fast Verification"
                fill
                className="object-cover"
                priority
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
