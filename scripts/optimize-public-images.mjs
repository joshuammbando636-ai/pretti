import { readdir, rename, stat } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve(import.meta.dirname, '../public/images');

async function optimize() {
  const files = await readdir(IMAGES_DIR);
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const filePath = path.join(IMAGES_DIR, file);
    const tmpPath = `${filePath}.tmp`;
    const before = (await stat(filePath)).size;

    const pipeline = sharp(filePath).resize({
      width: 1600,
      height: 1600,
      fit: 'inside',
      withoutEnlargement: true,
    });
    if (ext === '.png') {
      await pipeline.png({ quality: 75 }).toFile(tmpPath);
    } else {
      await pipeline.jpeg({ quality: 75, mozjpeg: true }).toFile(tmpPath);
    }

    const after = (await stat(tmpPath)).size;
    await rename(tmpPath, filePath);

    totalBefore += before;
    totalAfter += after;
    console.log(`${file}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
  }

  console.log(`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`);
}

optimize().catch(err => {
  console.error(err);
  process.exit(1);
});
