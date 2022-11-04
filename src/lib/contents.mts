import markdoc from '@markdoc/markdoc';
import { readdirSync, readFileSync } from 'node:fs';
import { basename, extname, resolve } from 'node:path';
import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import { parse } from 'yaml';
import { Image } from '../components/image.js';
import { config } from './transformer.mjs';

export interface Content {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  body: ReactNode;
  draft: boolean;
}

export async function getContents(sourceDir: string) {
  const targets = readdirSync(resolve(sourceDir, 'posts')).map((filename) => resolve(sourceDir, 'posts', filename));

  const contents: Content[] = await Promise.all(
    targets.map(async (path) => {
      const text = readFileSync(path, { encoding: 'utf-8' });

      const ast = markdoc.parse(text);
      const node = await markdoc.transform(ast, config);

      const frontmatter = parse(ast.attributes['frontmatter']);

      const body = markdoc.renderers.react(node, React, { components: { Image } });

      return {
        slug: basename(path, extname(path)),
        description: "nazna's website",
        title: frontmatter.title,
        publishedAt: frontmatter.publishedAt,
        draft: frontmatter.draft,
        body: (body as ReactElement).props.children,
      };
    })
  );

  return process.env['NODE_ENV'] === 'development' ? contents : contents.filter((c) => !c.draft);
}
