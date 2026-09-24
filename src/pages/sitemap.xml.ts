import type { APIContext } from 'astro';

// Astro's sitemap integration writes /sitemap-index.xml and /sitemap-0.xml.
// Many tools and people look for /sitemap.xml, so serve the same index here.
export function GET({ site }: APIContext) {
  const loc = new URL('/sitemap-0.xml', site).href;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${loc}</loc></sitemap>
</sitemapindex>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
