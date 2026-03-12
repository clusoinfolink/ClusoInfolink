import { unstable_cache } from 'next/cache';
import dbConnect from '@/lib/mongodb';
import SiteSetting from '@/lib/models/SiteSetting';

export interface SiteSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
}

const defaults: SiteSettings = {
  siteName: 'Cluso Infolink',
  tagline: "Let's Make It Transparent",
  contactEmail: '',
  contactPhone: '',
  address: '',
  socialLinks: { facebook: '', twitter: '', linkedin: '', instagram: '' },
};

async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    await dbConnect();
    const doc = await SiteSetting.findOne().lean();
    if (!doc) return defaults;
    const s = doc as Record<string, unknown>;
    const social = (s.socialLinks ?? {}) as Record<string, string>;
    return {
      siteName: (s.siteName as string) || defaults.siteName,
      tagline: (s.tagline as string) || defaults.tagline,
      contactEmail: (s.contactEmail as string) || defaults.contactEmail,
      contactPhone: (s.contactPhone as string) || defaults.contactPhone,
      address: (s.address as string) || defaults.address,
      socialLinks: {
        facebook: social.facebook || '',
        twitter: social.twitter || '',
        linkedin: social.linkedin || '',
        instagram: social.instagram || '',
      },
    };
  } catch {
    return defaults;
  }
}

export const getSiteSettings = unstable_cache(
  fetchSiteSettings,
  ['site-settings'],
  { revalidate: 300 }
);
