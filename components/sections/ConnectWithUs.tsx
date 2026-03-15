'use client';

import Link from 'next/link';
import { MessageCircle, PhoneCall, CalendarCheck } from 'lucide-react';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { GlassButton } from '@/components/ui/GlassButton';

const connectHighlights = [
  {
    icon: MessageCircle,
    title: 'Live consultation',
    description: 'Talk to our specialists and get the right verification workflow for your business.',
  },
  {
    icon: PhoneCall,
    title: 'Fast response',
    description: 'Our team replies quickly so your hiring and onboarding timelines stay on track.',
  },
  {
    icon: CalendarCheck,
    title: 'Guided onboarding',
    description: 'From setup to go-live, we help you launch smoothly with compliance-first practices.',
  },
];

export function ConnectWithUs() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 bg-[#eef6ff]">
      <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-cluso-sky/35 blur-3xl" />
      <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-cluso-green/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/70 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(59,123,214,0.16)] p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-center">
            <AnimatedSection direction="left" className="lg:col-span-2">
              <p className="text-cluso-green font-semibold tracking-[0.2em] uppercase text-xs mb-3">
                Connect With Us
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-cluso-deep font-bold leading-tight mb-4">
                Let&apos;s build a safer, smarter verification journey together.
              </h2>
              <p className="text-slate-700 leading-relaxed mb-6">
                Share your hiring or compliance goals and our team will design a verification
                approach tailored to your scale, timelines, and industry needs.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/getstarted">
                  <GlassButton variant="primary" className="!rounded-xl">Start a conversation</GlassButton>
                </Link>
                <Link href="/services">
                  <GlassButton variant="secondary" className="!rounded-xl">Explore services</GlassButton>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2} className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {connectHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-cluso-sky/20 bg-white/85 p-5 shadow-[0_10px_25px_rgba(59,123,214,0.12)]"
                  >
                    <div className="w-11 h-11 rounded-xl bg-cluso-deep text-white flex items-center justify-center mb-4">
                      <item.icon size={20} />
                    </div>
                    <h3 className="font-heading text-xl text-cluso-deep font-bold mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
