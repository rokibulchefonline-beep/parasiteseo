// Everything that identifies the magazine lives here. Change these values to
// rebrand the site; no other file needs editing.

export const SITE = {
  name: 'The Albion',
  shortName: 'Albion',
  tagline: 'Business, property, food and technology across the UK',
  description:
    'The Albion is a UK magazine covering business, property, hospitality, technology and life across England, Scotland, Wales and Northern Ireland.',
  locale: 'en-GB',
  lang: 'en',
  timezone: 'Europe/London',
  email: 'editor@example.co.uk',
  // Registered-office style details shown in the footer and on the contact page.
  publisher: {
    name: 'The Albion',
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
  googleSiteVerification: 'iM2RCUPEN_LNGWTkSPn6TVQZS6nvaxmVeQpno3h2mA0',
  foundingYear: 2026,
  // Legal details shown in the footer when filled in. Leave empty to hide.
  companyNumber: '', // Companies House number, e.g. '12345678'
  registeredOffice: '', // e.g. '218a Brick Lane, London E1 6SA'
  icoNumber: '', // ICO data protection registration, e.g. 'ZA123456'
} as const;

// Businesses connected to the publisher. They are disclosed on every article
// that features them and listed on the ownership page.
export const CONNECTED_BUSINESSES = [
  { name: 'ChefOnline', url: 'https://www.chefonline.co.uk/', what: 'Online food ordering for diners and technology for UK restaurants and takeaways (chefonline.co.uk and chefonline.com).' },
  { name: 'GTech Digital', url: 'https://www.gtechdigital.co.uk/', what: 'Digital marketing agency: SEO, paid advertising, and web and app development.' },
  { name: 'Salik & Co', url: 'https://www.salikandco.com/', what: 'Independent estate and letting agent in East London.' },
  { name: 'ARTA', url: 'https://www.artauk.com/', what: 'The Asian Restaurant & Takeaway Awards.' },
] as const;

// Policy pages, also published in structured data for search engines.
export const POLICIES = {
  editorial: '/editorial-policy/',
  corrections: '/corrections/',
  ownership: '/ownership-and-funding/',
  feedback: '/contact/',
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

// Only list real people here. A byline should belong to someone readers can
// check; until writers join, articles are credited to the editorial team.
export const AUTHORS = {
  'editorial-team': {
    name: 'Editorial Team',
    role: 'The Albion',
    bio: 'Articles from The Albion editorial team, published under our editorial policy.',
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
  { href: '/corrections/', label: 'Corrections' },
  { href: '/ownership-and-funding/', label: 'Ownership & funding' },
  { href: '/terms/', label: 'Terms of use' },
  { href: '/accessibility/', label: 'Accessibility' },
  { href: '/privacy/', label: 'Privacy notice' },
  { href: '/cookies/', label: 'Cookie policy' },
  { href: '/rss.xml', label: 'RSS feed' },
];
