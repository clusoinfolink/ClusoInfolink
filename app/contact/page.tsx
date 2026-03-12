import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/settings';
import { ContactForm } from '@/components/sections/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us — Cluso Infolink',
  description: 'Get in touch with Cluso Infolink for background verification and screening services.',
};

export const revalidate = 300;

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-cluso-deep via-cluso-mid to-cluso-sky">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Ready to get started? Reach out and let&apos;s discuss how we can help.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-20 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm
            contactEmail={settings.contactEmail}
            contactPhone={settings.contactPhone}
            address={settings.address}
            siteName={settings.siteName}
          />
        </div>
      </section>
    </div>
  );
}
