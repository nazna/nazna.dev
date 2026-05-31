import pkg from '../../package.json' with { type: 'json' };
import { Footer } from '../components/footer.tsx';
import { Header } from '../components/header.tsx';
import { Helmet } from '../components/helmet.tsx';
import { Time } from '../components/time.tsx';
import type { Post } from '../types.ts';

const modules = import.meta.glob<Post>('../../posts/*.md', { eager: true, import: 'default' });
const posts = Object.values(modules)
  .filter((p) => import.meta.env.DEV || !p.draft)
  .toReversed();

export function render(_props: never) {
  return (
    <html lang="ja">
      <Helmet title={`すべての記事 - ${pkg.name}`} description={pkg.description} url={`${pkg.homepage}/posts`} />
      <body>
        <Header />
        <main>
          <section>
            <ol>
              {posts.map((post) => (
                <li key={post.slug}>
                  <Time createdAt={post.createdAt} updatedAt={post.updatedAt} />
                  <a href={`/posts/${post.slug}`}>{post.title}</a>
                </li>
              ))}
            </ol>
          </section>
        </main>
        <Footer />
      </body>
    </html>
  );
}
