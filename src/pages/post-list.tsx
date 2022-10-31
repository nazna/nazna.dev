import { Footer } from '../components/footer.js';
import { Head } from '../components/head.js';
import { Header } from '../components/header.js';
import { Time } from '../components/time.js';
import type { Content } from '../lib/contents.mjs';

interface PostsProps {
  contents: Content[];
}

export function PostList(props: PostsProps) {
  return (
    <html lang="ja">
      <Head title="すべての投稿" />
      <body>
        <Header />
        <main>
          <section>
            <ol>
              {props.contents.map((content) => (
                <li key={content.slug}>
                  <article>
                    <Time publishedAt={content.publishedAt} />
                    <a href={`/posts/${content.slug}`}>{content.title}</a>
                  </article>
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
