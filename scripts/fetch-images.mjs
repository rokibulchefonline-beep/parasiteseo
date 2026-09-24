// Downloads a featured stock photo for every article that has an `imageQuery`
// but no `cover`, saves it to src/assets/covers/<slug>.jpg and writes `cover`,
// `coverAlt` and `coverCredit` into the article's front matter.
//
//   PEXELS_API_KEY=xxxx npm run images      # best quality (free key: pexels.com/api)
//   npm run images                          # no key: falls back to Openverse (CC0 / CC BY)
//
// Options: --force re-downloads images for articles that already have a cover.
//          --only=<slug> processes a single article.

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ARTICLES = 'src/content/articles';
const COVERS = 'src/assets/covers';
const force = process.argv.includes('--force');
const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7);
const PEXELS_KEY = process.env.PEXELS_API_KEY;

const used = new Set(); // avoid giving two articles the same photo

async function fromPexels(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=15`;
  const res = await fetch(url, { headers: { Authorization: PEXELS_KEY } });
  if (!res.ok) throw new Error(`Pexels ${res.status}`);
  const { photos } = await res.json();
  return photos.map((photo) => ({
    key: `pexels:${photo.id}`,
    src: photo.src.large2x,
    alt: photo.alt,
    credit: `Photo: ${photo.photographer} / Pexels`,
  }));
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fromOpenverse(query) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&license=cc0,by&license_type=commercial,modification&aspect_ratio=wide&size=large&page_size=20`;
  // Anonymous Openverse requests are rate limited, so pace them and back off on 429.
  let res;
  for (let attempt = 0; attempt < 5; attempt++) {
    await sleep(process.env.OPENVERSE_DELAY_MS ? Number(process.env.OPENVERSE_DELAY_MS) : 4000);
    res = await fetch(url, { headers: { 'User-Agent': 'uk-magazine-image-fetcher' } });
    if (res.status !== 429) break;
    await sleep(30000 * (attempt + 1));
  }
  if (!res.ok) throw new Error(`Openverse ${res.status}`);
  const { results } = await res.json();
  return results.map((photo) => ({
    key: `ov:${photo.id}`,
    src: photo.url,
    alt: photo.title,
    credit: `Photo: ${photo.creator || 'Unknown'} / ${photo.source} (${`${photo.license.toUpperCase()} ${photo.license_version ?? ''}`.trim()})`,
  }));
}

// Stock titles are often file names ("IMG_1234.jpg"); fall back to the query.
function altText(title, query) {
  const t = (title ?? '').trim();
  if (t.split(/\s+/).length < 3 || /\.(jpe?g|png|webp)$|^(img|dsc|p)[-_ ]?\d+/i.test(t)) {
    return query.charAt(0).toUpperCase() + query.slice(1);
  }
  return t;
}

// Tries candidates in order until one downloads and decodes as an image.
async function download(candidates, out) {
  for (const photo of candidates) {
    if (used.has(photo.key)) continue;
    try {
      const img = await fetch(photo.src, { headers: { 'User-Agent': 'uk-magazine-image-fetcher' } });
      if (!img.ok) continue;
      const input = Buffer.from(await img.arrayBuffer());
      const { width = 0 } = await sharp(input).metadata();
      if (width < 1000) continue;
      await sharp(input)
        .resize({ width: 1600, height: 900, fit: 'cover', position: 'attention' })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(out);
      used.add(photo.key);
      return photo;
    } catch {
      // try the next candidate
    }
  }
  return null;
}

function setField(frontmatter, key, value) {
  const line = `${key}: ${JSON.stringify(value)}`;
  const re = new RegExp(`^${key}:.*$`, 'm');
  return re.test(frontmatter) ? frontmatter.replace(re, line) : `${frontmatter}\n${line}`;
}

await mkdir(COVERS, { recursive: true });
const files = (await readdir(ARTICLES)).filter((f) => f.endsWith('.md'));
let done = 0;

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  if (only && slug !== only) continue;
  const full = path.join(ARTICLES, file);
  const text = await readFile(full, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) continue;
  let fm = match[1];
  const query = fm.match(/^imageQuery:\s*"?(.*?)"?\s*$/m)?.[1];
  if (!query || (/^cover:/m.test(fm) && !force)) continue;

  try {
    const candidates = PEXELS_KEY ? await fromPexels(query) : await fromOpenverse(query);
    const out = path.join(COVERS, `${slug}.jpg`);
    const photo = await download(candidates, out);
    if (!photo) {
      console.warn(`– ${slug}: no usable image found for "${query}"`);
      continue;
    }

    fm = setField(fm, 'cover', `../../assets/covers/${slug}.jpg`);
    fm = setField(fm, 'coverAlt', altText(photo.alt, query));
    fm = setField(fm, 'coverCredit', photo.credit);
    await writeFile(full, text.replace(match[0], `---\n${fm}\n---\n`));
    console.log(`✓ ${slug}  (${photo.credit})`);
    done++;
  } catch (err) {
    console.warn(`✗ ${slug}: ${err.message}`);
  }
}

console.log(`\n${done} image(s) added. Check each one suits its article before publishing.`);
