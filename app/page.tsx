import { HeroBanner } from '@/components/sections/HeroBanner';
import { BlogCard } from '@/components/sections/BlogCard';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Directors } from '@/components/sections/Directors';
import { SoftwareSpeed } from '@/components/sections/SoftwareSpeed';
import { SoftwareVersatility } from '@/components/sections/SoftwareVersatility';
import { PeopleMatter } from '@/components/sections/PeopleMatter';
import { FullyOptimised } from '@/components/sections/FullyOptimised';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import TeamMember from '@/lib/models/TeamMember';

async function getLatestBlog() {
  try {
    await dbConnect();
    const post = await BlogPost.findOne({ published: true })
      .sort({ createdAt: -1 })
      .lean();
    return post ? JSON.parse(JSON.stringify(post)) : null;
  } catch {
    return null;
  }
}

async function getDirectors() {
  try {
    await dbConnect();
    const members = await TeamMember.find().sort({ order: 1 }).limit(3).lean();
    return JSON.parse(JSON.stringify(members));
  } catch {
    return [];
  }
}

export default async function Home() {
  const [latestBlog, directors] = await Promise.all([
    getLatestBlog(),
    getDirectors(),
  ]);

  return (
    <>
      {/* Section 1: Latest News / Blog Card */}
      {latestBlog && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogCard
              title={latestBlog.title}
              excerpt={latestBlog.excerpt || ''}
              author={latestBlog.author || 'cluso'}
              category={latestBlog.category || 'News'}
              slug={latestBlog.slug}
              coverImage={latestBlog.coverImage}
            />
          </div>
        </section>
      )}

      {/* Section 2: Hero Banner */}
      <HeroBanner />

      {/* Section 3: Why Choose Our Services */}
      <WhyChooseUs />

      {/* Section 4: Our Directors */}
      <Directors directors={directors} />

      {/* Section 5: Software Speed */}
      <SoftwareSpeed />

      {/* Section 6: Software Versatility */}
      <SoftwareVersatility />

      {/* Section 7: People Matter */}
      <PeopleMatter />

      {/* Section 8: Fully Optimised */}
      <FullyOptimised />
    </>
  );
}
