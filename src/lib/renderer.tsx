import { Feed } from 'feed';
import { writeFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { Error404 } from '../pages/error-404.ts';
import { Index } from '../pages/index.ts';
import { PostList } from '../pages/post-list.ts';
import { Post } from '../pages/post.ts';
import type { Content } from './contents.ts';

export const patch = (html: string): string => {
  return `<!DOCTYPE html>${html}`.replace(/(<meta charSet=.*?>)/gi, (match) => match.toLowerCase());
};

export function renderIndex(path: string, contents: Content[]) {
  const html = renderToStaticMarkup(<Index contents={contents} />);
  writeFileSync(path, patch(html));
}

export function renderPostList(path: string, contents: Content[]) {
  const html = renderToStaticMarkup(<PostList contents={contents} />);
  writeFileSync(path, patch(html));
}

export function renderPost(path: string, content: Content) {
  const html = renderToStaticMarkup(
    <Post title={content.title} publishedAt={content.publishedAt} body={content.body} />
  );
  writeFileSync(path, patch(html));
}

export function renderError404(path: string) {
  const html = renderToStaticMarkup(<Error404 />);
  writeFileSync(path, patch(html));
}

export function renderAtom(path: string, contents: Content[]) {
  const feed = new Feed({
    title: 'nazna.dev',
    description: 'A website about nazna',
    id: 'https://nazna.dev',
    link: 'https://nazna.dev',
    language: 'ja',
    image: 'https://nazna.dev/favicon.svg',
    copyright: '© 2022 Naoya Yamashita',
    updated: new Date(),
  });

  contents.map((content) => {
    feed.addItem({
      title: content.title,
      id: `https://nazna.dev/posts/${content.slug}`,
      link: `https://nazna.dev/posts/${content.slug}`,
      description: content.description,
      date: new Date(content.publishedAt),
    });
  });

  writeFileSync(path, feed.atom1());
}
