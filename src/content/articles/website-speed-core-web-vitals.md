---
title: "Is your website too slow? A guide to Core Web Vitals"
description: "Why site speed matters to customers and search engines, and practical ways to improve it."
category: technology
publishDate: 2026-09-02
tags: [website speed, Core Web Vitals, SEO, web development, GTech Digital]
partner: "GTech Digital"
imageQuery: "computer code"
---

A slow website costs you customers. People expect pages to load almost instantly, especially on phones, and many will give up and go elsewhere if they're kept waiting. Slow sites also frustrate visitors who do stay, making them less likely to enquire or buy.

Google measures real-world page experience through a set of metrics called **Core Web Vitals**. Here's what they mean and how to improve them.

## Why speed matters

### For customers

- **First impressions**: a slow site feels unprofessional.
- **Mobile users**: people on patchy mobile signals are especially affected.
- **Conversions**: every extra second of waiting gives visitors more reason to leave before enquiring or buying.

### For search engines

Google uses **page experience** signals, including Core Web Vitals, as part of its ranking systems. Speed alone won't make a page rank if the content isn't relevant and helpful, but a poor experience can hold back otherwise good pages.

## The three Core Web Vitals

### Largest Contentful Paint (LCP): loading

**What it measures:** how long it takes for the **largest visible element**, usually a main image or headline, to appear.

**Good:** **2.5 seconds or less**.

**Common causes of poor LCP:**

- large, unoptimised images
- slow server response times
- render-blocking CSS and JavaScript
- slow hosting.

### Interaction to Next Paint (INP): responsiveness

**What it measures:** how quickly the page **responds visually** when someone taps, clicks or types. INP replaced the older First Input Delay (FID) metric in 2024.

**Good:** **200 milliseconds or less**.

**Common causes of poor INP:**

- heavy JavaScript
- too many third-party scripts
- complex page builders and plugins.

### Cumulative Layout Shift (CLS): visual stability

**What it measures:** how much the page **jumps around** as it loads. You've probably tried to tap a button only for the page to shift and make you tap an advert instead.

**Good:** **0.1 or less**.

**Common causes of poor CLS:**

- images and videos without **width and height** set
- **ads, embeds or banners** that load late and push content down
- **web fonts** that cause text to reflow.

## How to check your site

### PageSpeed Insights

Google's free **PageSpeed Insights** tool shows:

- **field data**: real-world performance from Chrome users, where available
- **lab data**: a simulated test with detailed recommendations.

### Google Search Console

The **Core Web Vitals report** in Search Console shows how pages across your site perform, grouped by issue.

### Lighthouse

Built into Chrome's developer tools, **Lighthouse** gives detailed audits of performance, accessibility and SEO.

## Practical fixes

### 1. Optimise images

Images are often the biggest cause of slow pages.

- **Resize** images to the size they're displayed at.
- **Compress** them.
- Use modern formats such as **WebP** or **AVIF**.
- Use **responsive images**, so phones get smaller versions.
- **Lazy-load** images below the fold, but not the main hero image.

### 2. Improve hosting

Cheap shared hosting is often the bottleneck. Consider:

- **better hosting** with faster servers
- a **content delivery network (CDN)**, which serves files from locations close to your visitors
- **server-side caching**.

### 3. Reduce and defer JavaScript

- **Remove unused plugins and scripts**, especially on WordPress sites.
- **Defer** non-essential JavaScript.
- Avoid heavy **page builders** where possible.

### 4. Manage third-party scripts carefully

Chat widgets, social media embeds, tracking scripts, video embeds and ad scripts all add weight. Audit them regularly and ask whether each one is really needed. Load them only when necessary, and after cookie consent where required.

### 5. Prevent layout shifts

- Always set **width and height** on images and videos.
- **Reserve space** for ads, embeds and banners.
- Use **font-display** settings and preload key fonts.

### 6. Minimise CSS

- Remove **unused CSS**.
- Inline **critical CSS** for above-the-fold content.

### 7. Use caching

- **Browser caching** lets returning visitors load pages faster.
- **Page caching** on the server reduces processing time.

### 8. Keep things up to date

Keep your CMS, themes and plugins up to date for both **performance** and **security**.

## WordPress-specific tips

WordPress powers a huge share of small business websites. Common speed issues include:

- **too many plugins**
- **heavy themes** and **page builders**
- **unoptimised images**
- **cheap hosting**.

Caching plugins, image optimisation, a lightweight theme and good hosting can make a big difference.

## Speed is one part of the picture

Great Core Web Vitals won't compensate for weak content, and a fast site that doesn't answer customers' questions won't convert. Treat speed as part of an overall focus on **user experience**: clear navigation, helpful content, accessibility and easy ways to get in touch.

## Get a speed audit

If your site is slow and you're not sure why, a professional audit can identify the biggest issues and prioritise fixes. [GTech Digital](https://www.gtechdigital.co.uk/) offers web development and SEO services, including performance improvements for business websites.

## The bottom line

A fast website keeps visitors happy and supports your search visibility. Check your Core Web Vitals, focus on images, hosting, scripts and layout stability, and treat speed as part of a great overall experience.
