// Everything that identifies the magazine lives here. Change these values to
// rebrand the site; no other file needs editing.

export const SITE = {
  name: 'The Albion Review',
  shortName: 'Albion',
  tagline: 'Independent journalism from across the United Kingdom',
  description:
    'The Albion Review is an independent UK magazine covering news, business, culture, food, travel and life across England, Scotland, Wales and Northern Ireland.',
  locale: 'en-GB',
  lang: 'en',
  timezone: 'Europe/London',
  email: 'editor@example.co.uk',
  // Registered-office style details shown in the footer and on the contact page.
  publisher: {
    name: 'The Albion Review Ltd',
    address: 'London, United Kingdom',
  },
  social: {
    x: 'https://x.com/',
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://www.linkedin.com/',
  },
  postsPerPage: 12,
  // Google Search Console: choose "HTML tag" verification and paste only the
  // content value here, e.g. 'AbC123...'. Leave the placeholder to skip the
  // tag. It can also be set with the PUBLIC_GOOGLE_SITE_VERIFICATION env var.
  googleSiteVerification: 'PASTE_GSC_CODE_HERE',
} as const;

export const CATEGORIES = [
  { slug: 'news', name: 'News', description: 'What is happening across the four nations, explained.' },
  { slug: 'business', name: 'Business', description: 'Money, work, enterprise and the British high street.' },
  { slug: 'culture', name: 'Culture', description: 'Books, film, music, theatre and the arts.' },
  { slug: 'food-drink', name: 'Food & Drink', description: 'Restaurants, recipes, pubs and producers.' },
  { slug: 'travel', name: 'Travel', description: 'Weekends away, coastlines, cities and countryside.' },
  { slug: 'property', name: 'Property', description: 'Buying, selling, renting and letting homes in the UK.' },
  { slug: 'lifestyle', name: 'Lifestyle', description: 'Home, health, style and everyday living.' },
  { slug: 'technology', name: 'Technology', description: 'The tech shaping how Britain lives and works.' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export const AUTHORS = {
  'editorial-team': {
    name: 'Editorial Team',
    role: 'The Albion Review',
    bio: 'Reporting and analysis from the Albion Review newsroom.',
  },
  'eleanor-hughes': {
    name: 'Eleanor Hughes',
    role: 'Culture Editor',
    bio: 'Eleanor writes about books, theatre and the regional arts scene. She is based in Manchester.',
  },
  'callum-reid': {
    name: 'Callum Reid',
    role: 'Business Correspondent',
    bio: 'Callum covers small business, retail and the UK economy from Edinburgh.',
  },
  'priya-shah': {
    name: 'Priya Shah',
    role: 'Food & Travel Writer',
    bio: 'Priya reviews restaurants and writes about British travel. She lives in Bristol.',
  },
} as const;

export type AuthorSlug = keyof typeof AUTHORS;

export const NAV = [
  ...CATEGORIES.map((c) => ({ href: `/category/${c.slug}/`, label: c.name })),
];

export const FOOTER_LINKS = [
  { href: '/about/', label: 'About us' },
  { href: '/contact/', label: 'Contact' },
  { href: '/editorial-policy/', label: 'Editorial policy' },
  { href: '/privacy/', label: 'Privacy notice' },
  { href: '/cookies/', label: 'Cookie policy' },
  { href: '/rss.xml', label: 'RSS feed' },
];
