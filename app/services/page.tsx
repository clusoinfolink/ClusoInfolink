import { Metadata } from 'next';
import dbConnect from '@/lib/mongodb';
import Service from '@/lib/models/Service';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { CheckCircle, Shield, Search, UserCheck, FileText, Building, Fingerprint, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services — Cluso Infolink',
  description: 'Comprehensive background verification services including criminal checks, employment verification, and more.',
};

export const revalidate = 300;

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Shield, Search, UserCheck, FileText, Building, Fingerprint, Scale, CheckCircle,
};

async function getServices() {
  try {
    await dbConnect();
    const services = await Service.find({ active: true }).sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(services));
  } catch {
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-cluso-deep via-cluso-mid to-cluso-sky">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Comprehensive background verification solutions tailored to your business needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What We Offer"
            subtitle="Each service is designed with accuracy, speed, and transparency at its core."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Shield size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">Services coming soon.</p>
              </div>
            ) : (
              services.map((service: Record<string, string | string[]>) => {
                const IconComponent = iconMap[service.icon as string] || CheckCircle;
                return (
                  <GlassCard key={service._id as string} className="h-full">
                    <div className="w-12 h-12 rounded-xl bg-cluso-deep/10 flex items-center justify-center mb-4">
                      <IconComponent size={24} className="text-cluso-deep" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                      {service.title as string}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description as string}</p>
                    {service.features && (
                      <ul className="space-y-2">
                        {(service.features as string[]).map((feature: string) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle size={14} className="text-cluso-green shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </GlassCard>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
