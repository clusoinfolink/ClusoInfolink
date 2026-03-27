import { Metadata } from 'next';
import Image from 'next/image';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Shield, Eye, Target, Award, Clock, Users } from 'lucide-react';
import ourMissionImage from '@/assets/Our Mission.png';

export const metadata: Metadata = {
  title: 'About Us — Cluso Infolink',
  description: 'Learn about Cluso Infolink — our mission, values, and commitment to transparent background verification.',
};

const values = [
  {
    icon: Shield,
    title: 'Trust',
    description: 'We build trust through thorough, accurate verification processes that leave no stone unturned.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'Our core principle — every process, every result, every interaction is open and clear.',
  },
  {
    icon: Target,
    title: 'Accuracy',
    description: 'Precision in every check. Our multi-layered verification ensures reliability you can count on.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for the highest standards in background screening, continuously improving our processes.',
  },
  {
    icon: Clock,
    title: 'Speed',
    description: 'Fast turnaround without compromising quality. Real-time results when you need them most.',
  },
  {
    icon: Users,
    title: 'People-First',
    description: 'Behind every verification is a person. We handle every case with empathy and discretion.',
  },
];

const milestones = [
  { year: '2007', event: 'Cluso Infolink started its journey with a mission to bring transparency to verification.' },
  { year: '2009', event: 'Built a structured process for identity and address verification checks.' },
  { year: '2011', event: 'Expanded into employment and education verification for business clients.' },
  { year: '2013', event: 'Introduced stronger quality review workflows to improve consistency and accuracy.' },
  { year: '2015', event: 'Strengthened compliance practices and documentation standards across all services.' },
  { year: '2017', event: 'Scaled operations to support larger verification volumes with reliable turnaround.' },
  { year: '2019', event: 'Digitized core workflows to speed up case processing and reporting transparency.' },
  { year: '2021', event: 'Crossed major verification milestones with high client trust and repeat partnerships.' },
  { year: '2023', event: 'Introduced smart automation and real-time tracking for faster status visibility.' },
  { year: '2025', event: 'Expanded nationwide support with stronger regional execution and service coverage.' },
  { year: '2026', event: 'Present: Continuing to innovate with technology and people-first verification processes.' },
];

export default async function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-cluso-deep via-cluso-mid to-cluso-sky">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            About Cluso Infolink
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            We&apos;re on a mission to make background verification transparent, accurate,
            and accessible for businesses of every size.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Cluso Infolink, we believe that trust is the foundation of every
                successful relationship — whether between employers and employees,
                businesses and partners, or organizations and stakeholders.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our mission is to empower organizations with verified, transparent
                information that enables confident decision-making. We achieve this
                through cutting-edge technology, meticulous processes, and an
                unwavering commitment to accuracy.
              </p>
              <p className="text-gray-600 leading-relaxed">
                &ldquo;Let&apos;s Make It Transparent&rdquo; isn&apos;t just our tagline — it&apos;s the
                principle that guides everything we do, from our verification methods
                to our client communications.
              </p>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-cluso-light/20 to-cluso-sky/20">
              <Image
                src={ourMissionImage}
                alt="Our mission"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Values"
            subtitle="The principles that define our approach to background verification."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="glass p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-cluso-green/10 flex items-center justify-center">
                  <value.icon className="text-cluso-green" size={28} />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Journey"
            subtitle="Key milestones in our mission to bring transparency to verification."
          />
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-6 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-cluso-deep flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-12 bg-cluso-sky/30 mt-2" />
                  )}
                </div>
                <p className="text-gray-600 pt-3">{milestone.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
