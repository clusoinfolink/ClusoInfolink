export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { GlassCard } from '@/components/ui/GlassCard';

export const metadata: Metadata = {
  title: 'Blog — Cluso Infolink',
  description: 'Latest news, insights, and articles from Cluso Infolink.',
};

export const revalidate = 60;

async function getPosts() {
  try {
    await dbConnect();
    const posts = await BlogPost.find({ published: true })
      .select('title slug excerpt category createdAt coverImage')
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(posts));
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="py-20 bg-[#f5f5f0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest News &amp; Insights
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay informed with the latest from Cluso Infolink — industry insights,
            company updates, and background verification news.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: Record<string, string>) => (
              <Link key={post._id} href={`/blog/${post.slug}`}>
                <GlassCard className="h-full hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  {/* Cover Image */}
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-cluso-deep to-cluso-sky">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        unoptimized={post.coverImage.startsWith('data:')}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white/50 font-heading">Cluso</span>
                      </div>
                    )}
                  </div>
                  {/* Category Badge */}
                  {post.category && (
                    <span className="inline-block bg-cluso-green/10 text-cluso-green text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {post.category}
                    </span>
                  )}
                  <h2 className="font-heading text-xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                    {post.excerpt}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
