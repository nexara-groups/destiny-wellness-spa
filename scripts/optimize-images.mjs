import sharp from 'sharp';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join, basename, extname } from 'path';

const INPUT_DIR = './public/images/source';
const OUTPUT_DIR = './public/images/optimized';

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

const files = readdirSync(INPUT_DIR).filter(f =>
  ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase())
);

for (const file of files) {
  const input = join(INPUT_DIR, file);
  const name = basename(file, extname(file));

  await sharp(input)
    .resize({ width: 2400, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(join(OUTPUT_DIR, `${name}.webp`));

  await sharp(input)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(join(OUTPUT_DIR, `${name}@1x.webp`));

  console.log(`✓ ${name}.webp + ${name}@1x.webp`);
}

console.log('Image optimization complete.');
