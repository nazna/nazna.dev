import type { ReactNode } from 'react';
import { ArticleHeader } from '../components/article-header.js';
import { Footer } from '../components/footer.js';
import { Head } from '../components/head.js';
import { Header } from '../components/header.js';

interface PostProps {
  title: string;
  publishedAt: string;
  body: ReactNode;
}

export function Post(props: PostProps) {
  return (
    <html lang="ja">
      <Head title={props.title} />
      <body>
        <Header />
        <main>
          <section>
            <article className="post">
              <ArticleHeader title={props.title} publishedAt={props.publishedAt} />
              {props.body}
            </article>
          </section>
        </main>
        <Footer />
      </body>
    </html>
  );
}
