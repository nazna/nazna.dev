import { basename } from 'node:path';

import type { Paragraph, Root, Text } from 'mdast';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit, EXIT } from 'unist-util-visit';
import type { Plugin } from 'vite';
import { parse } from 'yaml';

import { FrontmatterSchema, type Post, type Frontmatter } from '../../types.ts';
import { remarkBlockquote } from '../remark/blockquote.ts';
import { remarkImage } from '../remark/image.ts';
import { remarkSection } from '../remark/section.ts';
import { remarkShiki } from '../remark/shiki.ts';

interface MarkdownData {
  frontmatter: Frontmatter;
  body: string;
}

const FRONTMATTER_REGEX = /^---\n(?<frontmatter>.*?)\n---(?<body>.*)/s;
const DATETIME_REGEX = /^(?<date>\d{8})/;

function splitMarkdown(markdown: string): MarkdownData {
  const matched = FRONTMATTER_REGEX.exec(markdown) as RegExpMatchArray & {
    groups: { frontmatter: string; body: string };
  };

  if (!matched?.groups) {
    throw new Error('Invalid frontmatter format');
  }

  return {
    frontmatter: FrontmatterSchema.parse(parse(matched.groups.frontmatter)),
    body: matched.groups.body.trim(),
  };
}

function extractDescription(mdast: Root): string {
  let description: string | undefined;

  visit(mdast, 'paragraph', (node: Paragraph) => {
    const text = node.children
      .filter((child): child is Text => child.type === 'text')
      .map((child) => child.value)
      .join('');

    if (text) {
      description = text;
      return EXIT;
    }

    return undefined;
  });

  return description ?? "nazna's website";
}

function extractInstantFromFileName(fileName: string): Temporal.Instant {
  const matched = DATETIME_REGEX.exec(fileName) as RegExpExecArray & {
    groups: { date: string };
  };

  if (!matched?.groups) {
    throw new Error(`Invalid fileName format: ${JSON.stringify(fileName)}`);
  }

  return Temporal.PlainDate.from(matched.groups.date).toZonedDateTime('Asia/Tokyo').toInstant();
}

export function markdown(): Plugin {
  return {
    name: 'vite-plugin-markdown',
    async transform(code, id) {
      if (!id.endsWith('.md')) {
        return;
      }

      const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkBlockquote)
        .use(remarkImage)
        .use(remarkShiki)
        .use(remarkSection);
      const { frontmatter, body } = splitMarkdown(code);

      const mdast = (await processor.run(processor.parse(body))) as Root;

      const description = extractDescription(mdast);

      const post: Post = {
        createdAt: extractInstantFromFileName(basename(id)),
        slug: basename(id, '.md'),
        title: frontmatter.title,
        updatedAt: frontmatter.updatedAt,
        draft: frontmatter.draft,
        description,
        nodes: mdast.children,
      };

      return `export default {
        ...${JSON.stringify(post)},
        createdAt: Temporal.Instant.from("${post.createdAt}"),
        updatedAt: Temporal.Instant.from("${post.updatedAt}"),
      }`;
    },
  };
}
