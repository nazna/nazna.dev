import type { ReactNode } from 'react'
import { Footer } from '../components/footer.js'
import { Header } from '../components/header.js'
import { Time } from '../components/time.js'

export interface PostProps {
  title: string
  publishedAt: string
  body: ReactNode
}

export const Post = ({ title, publishedAt, body }: PostProps) => (
  <html lang="ja">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <link rel="stylesheet" type="text/css" href="/style.css" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <title>{title}</title>
    </head>
    <body>
      <Header />
      <main>
        <section>
          <Time publishedAt={publishedAt} />
          <h1>{title}</h1>
          {body}
        </section>
      </main>
      <Footer />
    </body>
  </html>
)
