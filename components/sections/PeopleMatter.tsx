'use client';

import React from 'react';
import Image from 'next/image';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Heart, ShieldCheck } from 'lucide-react';
import peopleFirstImage from '@/assets/People First.png';

export function PeopleMatter() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="People Matter At Cluso Infolink"
          subtitle="Creating safer workplaces through personalized, thorough background screening."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Icon + Text */}
          <AnimatedSection direction="up">
            <div>
              {/* Green circle icon */}
              <div className="w-16 h-16 rounded-full bg-cluso-green flex items-center justify-center mb-6">
                <Heart className="text-white" size={28} />
              </div>

              <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Your Safety &amp; Trust, Our Priority
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Cluso Infolink, we understand that behind every verification request
                is a person — someone seeking opportunity, someone building a team,
                someone creating a safer environment.
              </p>
              <p className="text-gray-600 leading-relaxed">
                That&apos;s why our approach combines cutting-edge technology with human
                empathy. We handle every case with the discretion and care it deserves,
                maintaining compliance with data protection regulations while delivering
                actionable insights.
              </p>

              <div className="flex items-center space-x-3 mt-6 p-4 rounded-xl bg-cluso-green/10">
                <ShieldCheck className="text-cluso-green shrink-0" size={24} />
                <span className="text-gray-700 font-medium">
                  100% data security guaranteed with enterprise-grade encryption
                </span>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Image placeholder */}
          <AnimatedSection direction="up" delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-cluso-peach/30 to-cluso-cream/30">
              <Image
                src={peopleFirstImage}
                alt="People First"
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
