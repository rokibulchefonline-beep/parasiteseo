// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The public URL is read from the SITE_URL environment variable so the same
// build works on Netlify, Vercel and Cloudflare Pages. Each host also exposes
// its own URL variable, which we fall back to for preview deploys.
const site =
  process.env.SITE_URL ||
  process.env.URL || // Netlify
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) || // Vercel
  process.env.CF_PAGES_URL || // Cloudflare Pages
  'https://www.example.co.uk';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en-GB' } } })],
});
