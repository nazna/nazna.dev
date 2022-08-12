import markdoc from '@markdoc/markdoc'
import { readdir, readFile } from 'node:fs/promises'
import { basename, extname, resolve } from 'node:path'
import React from 'react'
import { parse } from 'yaml'
import type { PostProps } from '../pages/post.js'

export interface Content extends PostProps {
  filename: string
  draft: boolean
}

export const isDevelopmentMode = () => process.env['NODE_ENV'] === 'development'

export const patchHtml = (html: string): string => {
  return `<!DOCTYPE html>${html}`.replace(/(<meta charSet=.*?>)/gi, (match) => match.toLowerCase())
}

export const loadContents = async (postsDir: string): Promise<Content[]> => {
  const filenames = await readdir(postsDir)

  const contents: Content[] = []

  for (const filename of filenames) {
    const text = await readFile(resolve(postsDir, filename), { encoding: 'utf-8' })

    const ast = markdoc.parse(text)
    const node = markdoc.transform(ast)
    const body = markdoc.renderers.react(node, React)

    const info = parse(ast.attributes['frontmatter'])

    contents.push({
      title: info['title'],
      publishedAt: info['publishedAt'],
      draft: info['draft'],
      filename: basename(filename, extname(filename)),
      body,
    })
  }

  return contents
    .filter((content) => isDevelopmentMode() || !content.draft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}
