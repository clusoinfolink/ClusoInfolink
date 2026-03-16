export const dynamic = 'force-dynamic';

import { HeroBanner } from '@/components/sections/HeroBanner';
import { ConnectWithUs } from '@/components/sections/ConnectWithUs';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { SoftwareSpeed } from '@/components/sections/SoftwareSpeed';
import { SoftwareVersatility } from '@/components/sections/SoftwareVersatility';
import { PeopleMatter } from '@/components/sections/PeopleMatter';
import { TrustedCompanies } from '@/components/sections/TrustedCompanies';
import { getSiteSettings } from '@/lib/settings';

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* Section 1: Connect With Us */}
      <ConnectWithUs />

      {/* Section 2: Hero Banner */}
      <HeroBanner />

      {/* Section 3: Why Choose Our Services */}
      <WhyChooseUs />

      {/* Section 3.5: Trusted Companies */}
      <TrustedCompanies companies={settings.trustedCompanies} />

      {/* Section 5: Software Speed */}
      <SoftwareSpeed />

      {/* Section 6: Software Versatility */}
      <SoftwareVersatility />

      {/* Section 7: People Matter */}
      <PeopleMatter />
    </>
  );
}
