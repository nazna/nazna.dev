import { cpSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { getContents } from './lib/contents.mjs';
import { renderAtom, renderError404, renderIndex, renderPost, renderPostList } from './lib/renderer.js';

const sourceDir = resolve('./src');
const assetsDir = resolve('./public');
const destinationDir = resolve('./dist');

function clean() {
  rmSync(destinationDir, { recursive: true, force: true });
  mkdirSync(resolve(destinationDir, 'posts'), { recursive: true });
}

function assets() {
  const filenames = readdirSync(assetsDir);

  for (const filename of filenames) {
    cpSync(resolve(assetsDir, filename), resolve(destinationDir, filename));
  }
}

async function build() {
  const contents = await getContents(sourceDir);

  renderIndex(resolve(destinationDir, 'index.html'), contents.slice(0, 5));
  renderPostList(resolve(destinationDir, 'posts.html'), contents);
  renderError404(resolve(destinationDir, '404.html'));

  contents.forEach((content) => {
    renderPost(resolve(destinationDir, 'posts', `${content.slug}.html`), content);
  });

  renderAtom(resolve(destinationDir, 'atom.xml'), contents);
}

clean();
assets();
build();
