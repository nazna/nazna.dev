import { Footer } from '../components/footer.js';
import { Head } from '../components/head.js';
import { Header } from '../components/header.js';

export function Error404() {
  return (
    <html lang="ja">
      <Head title="This page is missing" />
      <body>
        <Header />
        <main>
          <section>
            <figure>
              <img src="/404.jpg" alt="404 Not Found" />
              <figcaption>This page is missing</figcaption>
            </figure>
          </section>
        </main>
        <Footer />
      </body>
    </html>
  );
}
