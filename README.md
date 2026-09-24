# The Albion Review: UK magazine website

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
cover: ./images/my-story.jpg # optional, relative to the Markdown file
coverAlt: Describe the image
tags: [walking, coast]
location: Cornwall          # optional dateline
featured: false             # true puts it in the front-page lead slot
draft: false                # true hides it from production builds
sponsored: false            # true shows the "Advertisement feature" label
---

Your article in Markdown…
```

Cover images are optimised automatically (responsive sizes, modern formats). Articles without a cover get a coloured section panel instead.

The eight articles included are sample content. Replace them with your own before launch.

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

### Cloudflare Pages

1. **Workers & Pages → Create → Pages → Connect to Git** and pick this repository.
2. Framework preset: **Astro**. Build command: `npm run build`. Output directory: `dist`.
3. Add `SITE_URL` (and `NODE_VERSION=22` if needed) under **Settings → Environment variables**.
4. `public/_headers` and `public/_redirects` are applied automatically. `wrangler.toml` also lets you deploy from the command line: `npm run build && npx wrangler pages deploy`.
5. Forms: as with Vercel, point the form `action` at an external provider.

### Headers and redirects

| File | Netlify | Vercel | Cloudflare Pages |
| --- | --- | --- | --- |
| `public/_headers` | ✅ | – | ✅ |
| `public/_redirects` | ✅ | – | ✅ |
| `vercel.json` | – | ✅ | – |

If you add a header or redirect, add it to `public/_headers` or `public/_redirects` **and** to `vercel.json`.

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
