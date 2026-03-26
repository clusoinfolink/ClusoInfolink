import { Metadata } from 'next';
import { CareersJoinForm } from '@/components/sections/CareersJoinForm';

export const metadata: Metadata = {
  title: 'Careers — Cluso Infolink',
  description: 'Join the Cluso Infolink team. Submit your details and resume to apply.',
};

export const revalidate = 300;

export default async function CareersPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-24 bg-gradient-to-br from-cluso-deep via-cluso-mid to-cluso-sky">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Careers</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Build your career with us and help create more transparent, trusted verification experiences.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CareersJoinForm />
        </div>
      </section>
    </div>
  );
}
