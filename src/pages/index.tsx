import { Footer } from '../components/footer.js';
import { Head } from '../components/head.js';
import { Header } from '../components/header.js';
import { Time } from '../components/time.js';
import type { Content } from '../lib/contents.mjs';

interface IndexProps {
  contents: Content[];
}

export function Index(props: IndexProps) {
  return (
    <html lang="ja">
      <Head title="nazna.dev" />
      <body>
        <Header />
        <main>
          <section>
            <ol>
              {props.contents.map((content) => (
                <li key={content.slug}>
                  <Time publishedAt={content.publishedAt} />
                  <a href={`/posts/${content.slug}`}>{content.title}</a>
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
