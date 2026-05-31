import { glob } from 'node:fs/promises';

import { Feed } from 'feed';
import { createServer, isRunnableDevEnvironment, type Plugin } from 'vite';

import type { Post } from '../../types.ts';
import { markdown } from './markdown.ts';

interface MarkdownModule {
  default: Post;
}

const BASE_URL = 'https://nazna.dev';

export function rss(): Plugin {
  return {
    name: 'vite-plugin-rss',
    applyToEnvironment(environment) {
      return environment.name === 'client';
    },
    async generateBundle() {
      const server = await createServer({
        server: { middlewareMode: true },
        appType: 'custom',
        configFile: false,
        clearScreen: false,
        plugins: [markdown()],
      });

      if (!isRunnableDevEnvironment(server.environments.ssr)) {
        throw new Error('Invalid vite environment');
      }

      const feed = new Feed({
        title: 'nazna.dev',
        description: "nazna's website",
        id: BASE_URL,
        link: BASE_URL,
        language: 'ja',
        author: {
          name: 'nazna',
        },
        feedLinks: {
          atom: `${BASE_URL}/atom.xml`,
        },
      });

      const posts: Post[] = [];

      for await (const markdownPath of glob('./posts/*.md')) {
        const module = await server.environments.ssr.runner.import<MarkdownModule>(markdownPath);
        posts.push(module.default);
      }

      posts
        .filter((post) => post.draft === false)
        .toSorted((a, b) => Temporal.Instant.compare(b.updatedAt, a.updatedAt))
        .slice(0, 10)
        .forEach((post) =>
          feed.addItem({
            title: post.title,
            link: `${BASE_URL}/posts/${post.slug}`,
            id: `${BASE_URL}/posts/${post.slug}`,
            published: new Date(post.createdAt.epochMilliseconds),
            date: new Date(post.updatedAt.epochMilliseconds),
            description: post.description,
          }),
        );

      this.emitFile({
        type: 'asset',
        fileName: 'atom.xml',
        source: feed.atom1(),
      });

      await server.close();
    },
  };
}
