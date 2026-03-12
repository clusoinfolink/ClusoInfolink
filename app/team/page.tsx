export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import TeamMember from '@/lib/models/TeamMember';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Facebook, Twitter, Youtube, Instagram, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Team — Cluso Infolink',
  description: 'Meet the people behind Cluso Infolink — our leadership team and professionals.',
};

export const revalidate = 300;

interface Member {
  _id: string;
  name: string;
  role: string;
  photo?: string;
  bio?: string;
  socials?: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
  };
}

async function getTeam() {
  try {
    await dbConnect();
    const members = await TeamMember.find().sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(members)) as Member[];
  } catch {
    return [];
  }
}

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-cluso-deep via-cluso-mid to-cluso-sky">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Team
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Meet the experts behind Cluso Infolink&apos;s commitment to transparent verification.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Leadership"
            subtitle="Experienced professionals committed to excellence in background verification."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Users size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">Team members coming soon.</p>
              </div>
            ) : (
              team.map((member: Member) => (
              <GlassCard key={member._id} className="text-center">
                {/* Photo */}
                <div className="w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-cluso-deep to-cluso-sky">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={144}
                      height={144}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-4xl font-heading font-bold">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>

                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-cluso-deep font-medium mb-4">{member.role}</p>

                {member.bio && (
                  <p className="text-gray-600 text-sm mb-6">{member.bio}</p>
                )}

                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  {member.socials?.facebook && (
                    <a href={member.socials.facebook} className="text-gray-400 hover:text-cluso-deep transition-colors" aria-label="Facebook">
                      <Facebook size={20} />
                    </a>
                  )}
                  {member.socials?.twitter && (
                    <a href={member.socials.twitter} className="text-gray-400 hover:text-cluso-deep transition-colors" aria-label="Twitter">
                      <Twitter size={20} />
                    </a>
                  )}
                  {member.socials?.youtube && (
                    <a href={member.socials.youtube} className="text-gray-400 hover:text-cluso-deep transition-colors" aria-label="YouTube">
                      <Youtube size={20} />
                    </a>
                  )}
                  {member.socials?.instagram && (
                    <a href={member.socials.instagram} className="text-gray-400 hover:text-cluso-deep transition-colors" aria-label="Instagram">
                      <Instagram size={20} />
                    </a>
                  )}
                </div>
              </GlassCard>
            ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
