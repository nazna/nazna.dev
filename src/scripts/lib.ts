import markdoc from '@markdoc/markdoc';
import { readdir, readFile } from 'node:fs/promises';
import { basename, extname, resolve } from 'node:path';
import React from 'react';
import { parse } from 'yaml';
import { Blockquote } from '../components/blockquote.js';
import { Image } from '../components/image.js';
import type { PostProps } from '../pages/post.js';
import { calculateImageSize, createConfig, extractDescription } from './markdoc.js';

export interface Content extends PostProps {
  draft: boolean;
  filename: string;
  description: string;
}

export const isDevelopmentMode = () => process.env['NODE_ENV'] === 'development';

export const patchHtml = (html: string): string => {
  return `<!DOCTYPE html>${html}`.replace(/(<meta charSet=.*?>)/gi, (match) => match.toLowerCase());
};

export const loadContents = async (postsDir: string): Promise<Content[]> => {
  const filenames = await readdir(postsDir);

  const contents: Content[] = [];

  for (const filename of filenames) {
    const text = await readFile(resolve(postsDir, filename), { encoding: 'utf-8' });

    // prepare images size because markdoc.transform() does not suport async/await
    const imageInfo = await calculateImageSize(text);

    const ast = markdoc.parse(text);
    const frontmatter = parse(ast.attributes['frontmatter']);

    const node = markdoc.transform(ast, createConfig(frontmatter, imageInfo));

    const body = markdoc.renderers.react(node, React, { components: { Blockquote, Image } });

    contents.push({
      title: frontmatter['title'],
      publishedAt: frontmatter['publishedAt'],
      body,
      draft: frontmatter['draft'],
      filename: basename(filename, extname(filename)),
      description: extractDescription(ast, frontmatter),
    });
  }

  return contents
    .filter((content) => isDevelopmentMode() || !content.draft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};
