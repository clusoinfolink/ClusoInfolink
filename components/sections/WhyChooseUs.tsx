'use client';

import React from 'react';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GlassButton } from '@/components/ui/GlassButton';

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Choose Our Services?"
          subtitle="Comprehensive background verification that empowers trust and informed decisions."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image with green overlay */}
          <AnimatedSection direction="left">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-cluso-deep to-cluso-mid rounded-2xl" />
              <div className="absolute inset-0 bg-cluso-green/20 rounded-2xl" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                  Empowering Trust Through Comprehensive Insights.
                </h3>
                <GlassButton variant="ghost">Investor stories</GlassButton>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Dark glass panel */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="glass-dark p-8 md:p-10">
              <blockquote className="text-white/90 text-lg italic font-heading mb-6">
                &ldquo;Transparency isn&apos;t just our theme — it&apos;s how we operate.
                Every verification we perform shines light on the truth.&rdquo;
              </blockquote>
              <p className="text-white/70 leading-relaxed">
                Our comprehensive screening services cover everything from criminal background
                checks to employment verification, education validation, and identity
                confirmation. We use advanced technology combined with meticulous human
                review to ensure every report is accurate and compliant.
              </p>
              <p className="text-white/70 leading-relaxed mt-4">
                With Cluso Infolink, you gain a partner committed to delivering results
                you can trust — quickly, accurately, and affordably.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
