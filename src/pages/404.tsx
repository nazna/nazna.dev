import { Footer } from '../components/footer.js'
import { Header } from '../components/header.js'

export const Error404 = () => (
  <html lang="ja">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <link rel="stylesheet" type="text/css" href="/style.css" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <title>ページが見つかりません</title>
    </head>
    <body>
      <Header />
      <main>
        <section>
          <figure>
            <img src="/404.jpg" alt="404 Not Found" />
            <figcaption>ページが見つかりません</figcaption>
          </figure>
        </section>
      </main>
      <Footer />
    </body>
  </html>
)
