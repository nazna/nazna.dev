import pkg from '../../package.json' with { type: 'json' };
import { Footer } from '../components/footer.tsx';
import { Header } from '../components/header.tsx';
import { Helmet } from '../components/helmet.tsx';
import { MarkdownRenderer } from '../components/markdown-renderer.tsx';
import { Time } from '../components/time.tsx';
import type { Post } from '../types.ts';

interface Props {
  slug: string;
}

const modules = import.meta.glob<Post>('../../posts/*.md', { eager: true, import: 'default' });

export function render(props: Props) {
  const post = modules[`../../posts/${props.slug}.md`];

  if (!post) {
    throw new Error('Post not found');
  }

  return (
    <html lang="ja">
      <Helmet
        title={`${post.title} - ${pkg.name}`}
        description={post.description}
        url={`${pkg.homepage}/posts/$${props.slug}`}
      />
      <body>
        <Header />
        <main>
          <article>
            <Time createdAt={post.createdAt} updatedAt={post.updatedAt} />
            <h1>{post.title}</h1>
            <MarkdownRenderer nodes={post.nodes} />
          </article>
        </main>
        <Footer />
      </body>
    </html>
  );
}
