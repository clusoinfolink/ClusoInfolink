'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { GlassButton } from '@/components/ui/GlassButton';
import heroBG from '@/assets/Back 3.jpg';

const FALLBACK_HERO_BACKGROUND_IMAGE = heroBG;

interface HeroBannerProps {
  backgroundImage?: string;
}

export function HeroBanner({ backgroundImage }: HeroBannerProps) {
  const heroImage = backgroundImage || FALLBACK_HERO_BACKGROUND_IMAGE;
  const isDataUrl = typeof heroImage === 'string' && heroImage.startsWith('data:');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cluso-deep via-cluso-mid to-cluso-sky" />
      {/* Background Image */}
      <Image
        src={heroImage}
        alt="Cluso background"
        fill
        priority
        className="object-cover"
        unoptimized={isDataUrl}
      />
      {/* Dark Glass Overlay */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <AnimatedSection direction="left">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 italic">
            Trust And Accuracy Are Our Top Priorities. We Are Committed To Delivering
            Exceptional Customer Service And Ensuring Compliance With All Relevant Regulations.
          </h1>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <p className="text-cluso-green text-xl md:text-2xl font-semibold mb-8">
            Through Creativity, Integrity &amp; Innovation
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.4}>
          <Link href="/getstarted">
            <GlassButton variant="primary" className="text-lg px-8 py-4">
              Get started today
            </GlassButton>
          </Link>
        </AnimatedSection>
      </div>

      {/* Decorative glass shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cluso-sky/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cluso-cream/10 rounded-full blur-3xl" />
    </section>
  );
}
