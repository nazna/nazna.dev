import { Feed } from 'feed';
import { writeFile } from 'node:fs/promises';
import { renderToStaticMarkup } from 'react-dom/server';
import { Error404 } from '../pages/404.js';
import { Index } from '../pages/index.js';
import { Post } from '../pages/post.js';
import { Posts } from '../pages/posts.js';
import { Content, patchHtml } from './lib.js';

export const renderIndex = async (destinationPath: string, contents: Content[]) => {
  const sliced = contents.slice(0, 5);

  const html = renderToStaticMarkup(<Index contents={sliced} />);
  await writeFile(destinationPath, patchHtml(html));
};

export const renderPosts = async (destinationPath: string, contents: Content[]) => {
  const html = renderToStaticMarkup(<Posts contents={contents} />);
  await writeFile(destinationPath, patchHtml(html));
};

export const renderPost = async (destinationPath: string, { title, publishedAt, body }: Content) => {
  const html = renderToStaticMarkup(<Post title={title} publishedAt={publishedAt} body={body} />);
  await writeFile(destinationPath, patchHtml(html));
};

export const renderError404 = async (destinationPath: string) => {
  const html = renderToStaticMarkup(<Error404 />);
  await writeFile(destinationPath, patchHtml(html));
};

export const renderAtom = async (destinationPath: string, contents: Content[]) => {
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
      id: `https://nazna.dev/posts/${content.filename}`,
      link: `https://nazna.dev/posts/${content.filename}`,
      description: content.description,
      date: new Date(content.publishedAt),
    });
  });

  await writeFile(destinationPath, feed.atom1());
};
