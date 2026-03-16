'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { GlassButton } from '@/components/ui/GlassButton';

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: string;
  category: string;
  slug: string;
  coverImage?: string;
}

export function BlogCard({ title, excerpt, author, category, slug, coverImage }: BlogCardProps) {
  return (
    <AnimatedSection direction="up">
      <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-cluso-light/10 border border-cluso-light/20">
        {/* Text Side */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <span className="text-cluso-green text-sm font-semibold uppercase tracking-wider mb-2">
            {category || 'News'}
          </span>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mb-3">By {author}</p>
          <p className="text-gray-600 mb-6 line-clamp-3">{excerpt}</p>
          <Link href={`/blog/${slug}`}>
            <GlassButton variant="primary">Continue reading</GlassButton>
          </Link>
        </div>
        {/* Image Side */}
        <div className="flex-1 relative min-h-[300px]">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              unoptimized={coverImage.startsWith('data:')}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cluso-deep to-cluso-sky flex items-center justify-center">
              <span className="text-white/50 text-lg">Cluso Infolink</span>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
