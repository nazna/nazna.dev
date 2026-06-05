import type { JSXNode } from 'hono/jsx';
import { createServer, isRunnableDevEnvironment, type Plugin } from 'vite';

import { markdown } from './markdown.ts';

interface RenderModule {
  render: (props: { slug?: string }) => JSXNode;
}

interface Route {
  pattern: URLPattern;
  renderer: string;
}

interface RouteResult {
  renderer: string;
  params: { slug?: string };
  outputFileName: string;
}

const routes: Route[] = [
  { pattern: new URLPattern({ pathname: '/' }), renderer: './src/pages/index.tsx' },
  { pattern: new URLPattern({ pathname: '/posts' }), renderer: './src/pages/posts.tsx' },
  { pattern: new URLPattern({ pathname: '/posts/:slug' }), renderer: './src/pages/post-entry.tsx' },
];

function findMatchedRoute(routes: Route[], pathname: string): RouteResult | undefined {
  const matches = routes.flatMap((route) => {
    const result = route.pattern.exec({ pathname });
    const slug = result?.pathname.groups['slug'];
    return result
      ? [
          {
            renderer: route.renderer,
            params: slug ? { slug } : {},
            outputFileName: buildOutputFileName(result.pathname.input),
          },
        ]
      : [];
  });

  return matches[0] ?? undefined;
}

function buildOutputFileName(pathname: string): string {
  return pathname === '/' ? 'index.html' : `${pathname.slice(1)}.html`;
}

function isJSXNode(node: unknown): node is JSXNode {
  return node != null && typeof node === 'object' && 'tag' in node;
}

function isFunctionNode(node: JSXNode): node is JSXNode & { tag: (...args: unknown[]) => unknown } {
  return typeof node.tag === 'function';
}

function extractRelativeLinks(node: JSXNode): string[] {
  const links: string[] = [];

  if (isFunctionNode(node)) {
    const child = node.tag(node.props);

    if (isJSXNode(child)) {
      links.push(...extractRelativeLinks(child));
    }

    return links;
  }

  if (typeof node.tag === 'string') {
    const props = node.props as Record<string, unknown>;
    const href = props['href'];

    if (typeof href === 'string' && href.startsWith('/')) {
      links.push(href);
    }
  }

  for (const child of node.children) {
    if (isJSXNode(child)) {
      links.push(...extractRelativeLinks(child));
    }
  }

  return [...new Set(links)];
}

export function prerender(): Plugin {
  return {
    name: 'vite-plugin-prerender',
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

      const visited = new Set<string>();
      const queue: string[] = ['/'];

      while (queue.length > 0) {
        const pathname = queue.shift();

        if (!pathname || visited.has(pathname)) {
          continue;
        }

        visited.add(pathname);

        const route = findMatchedRoute(routes, pathname);

        if (!route) {
          continue;
        }

        const module = await server.environments.ssr.runner.import<RenderModule>(route.renderer);

        const node = module.render(route.params);
        const html = await node.toString();

        for (const link of extractRelativeLinks(node)) {
          if (!visited.has(link) && !queue.includes(link)) {
            queue.push(link);
          }
        }

        this.emitFile({
          type: 'asset',
          fileName: route.outputFileName,
          source: `<!DOCTYPE html>${html}`,
        });
      }

      await server.close();
    },
  };
}
