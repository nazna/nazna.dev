import { cp, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { loadContents } from './lib.js'
import { renderAtom, renderError404, renderIndex, renderPost, renderPosts } from './renderer.js'

export const buildAssets = async (assetsDir: string, destinationDir: string) => {
  const filenames = await readdir(assetsDir)

  for (const filename of filenames) {
    await cp(resolve(assetsDir, filename), resolve(destinationDir, filename))
  }
}

export const buildPages = async (sourceDir: string, destinationDir: string) => {
  const contents = await loadContents(resolve(sourceDir, 'posts'))

  await renderIndex(resolve(destinationDir, 'index.html'), contents)
  await renderPosts(resolve(destinationDir, 'posts.html'), contents)
  await renderError404(resolve(destinationDir, '404.html'))

  for (const content of contents) {
    await renderPost(resolve(destinationDir, 'posts', `${content.filename}.html`), content)
  }

  await renderAtom(resolve(destinationDir, 'feed.xml'), contents)
}
