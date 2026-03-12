'use client';

import React from 'react';
import Image from 'next/image';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Facebook, Twitter, Youtube } from 'lucide-react';

interface Director {
  _id: string;
  name: string;
  role: string;
  photo?: string;
  socials?: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
  };
}

interface DirectorsProps {
  directors: Director[];
}

export function Directors({ directors }: DirectorsProps) {
  if (directors.length === 0) return null;

  return (
    <section className="py-20 bg-[#f5f5f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Our Directors" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {directors.map((director, index) => (
            <AnimatedSection key={director._id} direction="up" delay={index * 0.15}>
              <GlassCard className="text-center">
                {/* Photo */}
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-cluso-deep to-cluso-sky">
                  {director.photo ? (
                    <Image
                      src={director.photo}
                      alt={director.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl font-heading font-bold">
                      {director.name.charAt(0)}
                    </div>
                  )}
                </div>

                <h3 className="font-heading text-xl font-bold text-gray-900 mb-1">
                  {director.name}
                </h3>
                <p className="text-cluso-deep font-medium text-sm mb-4">{director.role}</p>

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  {director.socials?.facebook && (
                    <a href={director.socials.facebook} className="text-gray-400 hover:text-cluso-deep transition-colors" aria-label="Facebook">
                      <Facebook size={18} />
                    </a>
                  )}
                  {director.socials?.twitter && (
                    <a href={director.socials.twitter} className="text-gray-400 hover:text-cluso-deep transition-colors" aria-label="Twitter">
                      <Twitter size={18} />
                    </a>
                  )}
                  {director.socials?.youtube && (
                    <a href={director.socials.youtube} className="text-gray-400 hover:text-cluso-deep transition-colors" aria-label="YouTube">
                      <Youtube size={18} />
                    </a>
                  )}
                </div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
