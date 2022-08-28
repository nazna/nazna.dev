import { mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { buildAssets, buildPages } from './scripts/builder.js';

const SOURCE_DIR = resolve('./src');
const ASSETS_DIR = resolve('./public');
const DESTINATION_DIR = resolve('./dist');

const build = async () => {
  await rm(DESTINATION_DIR, { recursive: true, force: true });
  await mkdir(resolve(DESTINATION_DIR, 'posts'), { recursive: true });

  await buildAssets(ASSETS_DIR, DESTINATION_DIR);
  await buildPages(SOURCE_DIR, DESTINATION_DIR);
};

await build();
