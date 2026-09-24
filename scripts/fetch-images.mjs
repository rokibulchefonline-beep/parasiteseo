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
  const photo = photos.find((p) => !used.has(`pexels:${p.id}`));
  if (!photo) return null;
  used.add(`pexels:${photo.id}`);
  return {
    src: photo.src.large2x,
    alt: photo.alt || query,
    credit: `Photo: ${photo.photographer} / Pexels`,
  };
}

async function fromOpenverse(query) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&license=cc0,by&license_type=commercial,modification&aspect_ratio=wide&size=large&page_size=20`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Openverse ${res.status}`);
  const { results } = await res.json();
  const photo = results.find((p) => !used.has(`ov:${p.id}`));
  if (!photo) return null;
  used.add(`ov:${photo.id}`);
  const license = `${photo.license.toUpperCase()} ${photo.license_version ?? ''}`.trim();
  return {
    src: photo.url,
    alt: photo.title || query,
    credit: `Photo: ${photo.creator || 'Unknown'} / ${photo.source} (${license})`,
  };
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
    const photo = PEXELS_KEY ? await fromPexels(query) : await fromOpenverse(query);
    if (!photo) {
      console.warn(`– ${slug}: no image found for "${query}"`);
      continue;
    }
    const img = await fetch(photo.src);
    if (!img.ok) throw new Error(`download ${img.status}`);
    const out = path.join(COVERS, `${slug}.jpg`);
    await sharp(Buffer.from(await img.arrayBuffer()))
      .resize({ width: 1600, height: 900, fit: 'cover' })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(out);

    fm = setField(fm, 'cover', `../../assets/covers/${slug}.jpg`);
    fm = setField(fm, 'coverAlt', photo.alt);
    fm = setField(fm, 'coverCredit', photo.credit);
    await writeFile(full, text.replace(match[0], `---\n${fm}\n---\n`));
    console.log(`✓ ${slug}  (${photo.credit})`);
    done++;
  } catch (err) {
    console.warn(`✗ ${slug}: ${err.message}`);
  }
}

console.log(`\n${done} image(s) added. Check each one suits its article before publishing.`);
