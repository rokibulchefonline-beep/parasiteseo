# UK Business Journal: UK magazine website

A fast, static UK magazine built with [Astro](https://astro.build). The same code deploys unchanged to **Netlify**, **Vercel** and **Cloudflare Pages**.

- Front page, section (category) pages, article pages, author pages and paginated archives
- UK English throughout: `en-GB` locale, British date format, Europe/London timezone
- SEO: canonical URLs, Open Graph and Twitter cards, `NewsArticle`, `BreadcrumbList` and `NewsMediaOrganization` JSON-LD, sitemap, RSS feed, robots.txt
- Client-side search that needs no server
- Newsletter and contact forms (Netlify Forms out of the box)
- UK compliance pages: privacy notice (UK GDPR), cookie policy and consent banner (PECR), editorial policy, and an "Advertisement feature" label for sponsored posts (CAP Code / ASA)
- Responsive, dark mode, accessible (skip link, focus styles, semantic landmarks)
- Security headers and long-lived caching for hashed assets on all three hosts

## Quick start

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs the static site to dist/
npm run preview   # serves dist/ locally
```

Node 22 or newer is required.

## Rebrand it

Everything that identifies the magazine lives in **`src/config.ts`**: name, tagline, description, contact email, publisher details, social links, sections (categories) and authors. Also replace `public/favicon.svg` and `public/og-default.png` (1200×630).

## Trust settings

Also in `src/config.ts`:

- `email`, `publisher`: replace the placeholders with your real contact email and publisher details.
- `companyNumber`, `registeredOffice`, `icoNumber`: shown in the footer and on the ownership page once filled in.
- `social`: links that point only at a site's home page (e.g. `https://x.com/`) are hidden, so add your real profile URLs.
- `CONNECTED_BUSINESSES`: listed on `/ownership-and-funding/`. Keep it complete; every article with `partner:` must name one of them.
- `AUTHORS`: add real writers only, with a genuine bio.

The editorial policy, corrections policy and ownership pages are also published as structured data (`publishingPrinciples`, `correctionsPolicy`, `ownershipFundingInfo`) for search engines.

## Write an article

Add a Markdown file to `src/content/articles/`. The file name becomes the URL, e.g. `my-story.md` → `/articles/my-story/`.

```markdown
---
title: Headline, up to 110 characters
description: Standfirst / meta description, up to 200 characters
category: travel            # one of the slugs in src/config.ts
author: priya-shah          # one of the author keys in src/config.ts
publishDate: 2026-09-24
updatedDate: 2026-09-25     # optional
cover: ../../assets/covers/my-story.jpg # optional
coverAlt: Describe the image
coverCredit: "Photo: Name / Pexels" # optional
imageQuery: "search terms"  # used by npm run images
tags: [walking, coast]
location: Cornwall          # optional dateline
featured: false             # true puts it in the front-page lead slot
draft: false                # true hides it from production builds
sponsored: false            # true shows the "Advertisement feature" label
partner: ChefOnline         # optional: shows a disclosure that the featured business is connected to the publisher
---

Your article in Markdown…
```

Cover images are optimised automatically (responsive sizes, modern formats). Articles without a cover get a coloured section panel instead.

The eight general articles are sample content, so replace them with your own before launch. The 50 brand articles (10 each for chefonline.co.uk, chefonline.com, Salik & Co, ARTA and GTech Digital) use the `partner` field, so each one carries a disclosure of the business relationship.

## Featured images

Every article has an `imageQuery` (search terms for a stock photo). One command downloads a photo for each article that doesn't have a `cover` yet, crops it to 1600×900 in `src/assets/covers/`, and writes `cover`, `coverAlt` and `coverCredit` into the article:

```bash
PEXELS_API_KEY=your-key npm run images   # recommended: free key from https://www.pexels.com/api/
npm run images                           # no key: uses Openverse (CC0 / CC BY photos, credit shown)
npm run images -- --only=my-story        # one article
npm run images -- --force                # replace existing covers
```

Look over each photo before publishing and improve `coverAlt` if the stock description is vague. The credit appears under the image on the article page. You can also add your own photo: save it in `src/assets/covers/` and set `cover` yourself.

## Deploy

Set the **`SITE_URL`** environment variable to your public address (e.g. `https://www.yourmagazine.co.uk`) on whichever host you use. It is used for canonical links, the sitemap and RSS. Without it, the build falls back to the host's own URL.

### Netlify

1. **Add new site → Import an existing project** and pick this repository.
2. Settings are read from `netlify.toml` (build `npm run build`, publish `dist`, Node 22).
3. Add `SITE_URL` under **Site configuration → Environment variables**.
4. Forms: the newsletter and contact forms work automatically with Netlify Forms. Submissions appear under **Forms**.

### Vercel

1. **Add New → Project** and import this repository.
2. The framework preset is Astro. `vercel.json` sets the build command, the output directory, security headers and caching.
3. Add `SITE_URL` under **Settings → Environment Variables**.
4. Forms: Vercel has no built-in form handling. Change the `action` on the forms in `src/components/NewsletterBox.astro` and `src/pages/contact.astro` to your provider's endpoint (Mailchimp, Buttondown, Kit, Formspree, etc.).

### Cloudflare

`wrangler.toml` is set up for **Cloudflare Workers with static assets**, which is what **Workers & Pages → Create → Import a repository** creates today.

1. Import this repository.
2. Build command: `npm run build`. Deploy command: `npx wrangler deploy`.
3. The Worker's name in Cloudflare must match `name` in `wrangler.toml` (currently `parasiteseo`). Change one of them if they differ.
4. Add `SITE_URL` under **Settings → Variables and Secrets** (build variables).
5. `public/_headers` and `public/_redirects` are applied automatically, and unknown URLs show the 404 page.
6. Deploy from your own machine instead: `npx wrangler login`, then `npm run deploy:cloudflare`.
7. Forms: as with Vercel, point the form `action` at an external provider.

If you created a classic **Pages** project instead, set build command `npm run build` and output directory `dist` in the dashboard. Pages ignores this `wrangler.toml`.

### Headers and redirects

| File | Netlify | Vercel | Cloudflare |
| --- | --- | --- | --- |
| `public/_headers` | ✅ | – | ✅ |
| `public/_redirects` | ✅ | – | ✅ |
| `vercel.json` | – | ✅ | – |

If you add a header or redirect, add it to `public/_headers` or `public/_redirects` **and** to `vercel.json`.

## Google Search Console

1. In [Search Console](https://search.google.com/search-console) add a **URL prefix** property for your site and choose **HTML tag** verification.
2. Copy only the `content` value from the tag Google shows you, e.g. `<meta name="google-site-verification" content="AbC123…">` → `AbC123…`.
3. Paste it into `googleSiteVerification` in `src/config.ts` (replacing `PASTE_GSC_CODE_HERE`), **or** set the `PUBLIC_GOOGLE_SITE_VERIFICATION` environment variable on your host.
4. Redeploy, click **Verify**, then submit `https://your-domain/sitemap-index.xml` under **Sitemaps**.

A **Domain** property verified by DNS TXT record also works and needs no code change.

## Analytics and advertising

The site sets no non-essential cookies. If you add analytics or ads, load them only after consent. The banner fires a `cookie-consent` event with `accepted` or `rejected`, and stores the choice in `localStorage['cookie-consent']`:

```html
<script>
  function loadAnalytics() { /* inject your analytics script here */ }
  if (localStorage.getItem('cookie-consent') === 'accepted') loadAnalytics();
  document.addEventListener('cookie-consent', (e) => e.detail === 'accepted' && loadAnalytics());
</script>
```

## Project structure

```
src/
  config.ts            Site name, sections, authors, links
  content.config.ts    Article front-matter schema
  content/articles/    Articles (Markdown)
  components/          Header, footer, cards, newsletter, cookie banner
  layouts/             Base (SEO/meta) and simple page layouts
  pages/               Routes: home, articles, category, author, search, legal pages, RSS
  styles/global.css    Design tokens and global styles
public/                Static files, _headers, _redirects, favicon
netlify.toml · vercel.json · wrangler.toml
```
