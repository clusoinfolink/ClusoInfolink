export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    await dbConnect();
    const post = await BlogPost.findOne({ slug, published: true }).lean();
    if (!post) return { title: 'Post Not Found' };
    const p = JSON.parse(JSON.stringify(post));
    return {
      title: `${p.title} — Cluso Infolink`,
      description: p.excerpt || p.title,
    };
  } catch {
    return { title: 'Blog — Cluso Infolink' };
  }
}

export async function generateStaticParams() {
  try {
    await dbConnect();
    const posts = await BlogPost.find({ published: true }).select('slug').lean();
    return posts.map((post: Record<string, string>) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    await dbConnect();
    const raw = await BlogPost.findOne({ slug, published: true }).lean();
    post = raw ? JSON.parse(JSON.stringify(raw)) : null;
  } catch {
    post = null;
  }

  if (!post) notFound();

  return (
    <article className="py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="text-cluso-deep hover:text-cluso-mid transition-colors text-sm mb-8 inline-block"
        >
          &larr; Back to Blog
        </Link>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              unoptimized={post.coverImage.startsWith('data:')}
            />
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6">
          {post.category && (
            <span className="bg-cluso-green/10 text-cluso-green text-xs font-semibold px-3 py-1 rounded-full">
              {post.category}
            </span>
          )}
          <span className="text-gray-400 text-sm">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="text-gray-400 text-sm">By {post.author || 'cluso'}</span>
        </div>

        {/* Title */}
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
          {post.title}
        </h1>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-cluso-deep"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
