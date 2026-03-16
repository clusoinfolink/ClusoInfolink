import dbConnect from '@/lib/mongodb';
import SiteSetting from '@/lib/models/SiteSetting';

export interface SiteSettings {
  siteName: string;
  tagline: string;
  heroBackgroundImage: string;
  aboutMissionImage: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  trustedCompanies: string[];
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
  heroBackgroundImage: '',
  aboutMissionImage: '',
  contactEmail: '',
  contactPhone: '',
  address: '',
  trustedCompanies: [],
  socialLinks: { facebook: '', twitter: '', linkedin: '', instagram: '' },
};

async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    await dbConnect();
    const doc = await SiteSetting.findOne().lean();
    if (!doc) return defaults;
    const s = doc as Record<string, unknown>;
    const social = (s.socialLinks ?? {}) as Record<string, string>;
    const trusted = Array.isArray(s.trustedCompanies)
      ? s.trustedCompanies.filter((item): item is string => typeof item === 'string')
      : defaults.trustedCompanies;
    return {
      siteName: (s.siteName as string) || defaults.siteName,
      tagline: (s.tagline as string) || defaults.tagline,
      heroBackgroundImage: (s.heroBackgroundImage as string) || defaults.heroBackgroundImage,
      aboutMissionImage: (s.aboutMissionImage as string) || defaults.aboutMissionImage,
      contactEmail: (s.contactEmail as string) || defaults.contactEmail,
      contactPhone: (s.contactPhone as string) || defaults.contactPhone,
      address: (s.address as string) || defaults.address,
      trustedCompanies: trusted,
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

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchSiteSettings();
}
