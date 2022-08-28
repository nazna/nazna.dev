import { Footer } from '../components/footer.js';
import { Header } from '../components/header.js';
import { Time } from '../components/time.js';
import type { Content } from '../scripts/lib.js';

interface IndexProps {
  contents: Content[];
}

export const Index = ({ contents }: IndexProps) => (
  <html lang="ja">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="description" content="A website about nazna" />
      <link rel="stylesheet" type="text/css" href="/style.css" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <title>nazna.dev</title>
    </head>
    <body>
      <Header />
      <main>
        <section>
          <ol>
            {contents.map((content) => (
              <li key={content.filename}>
                <Time publishedAt={content.publishedAt} />
                <a href={`/posts/${content.filename}`}>{content.title}</a>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </body>
  </html>
);
