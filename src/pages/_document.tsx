import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta name="theme-color" content="#0e8b9f" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="nazna.dev" />
          <link rel="icon" type="image/svg+xml" href="favicon.svg" />
          <link rel="manifest" href="nazna.dev.webmanifest" />
          <link rel="preconnect" href="//fonts.gstatic.com" />
          <link rel="stylesheet" href="//fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" />
          <script src="/__/firebase/8.3.1/firebase-app.js"></script>
          <script src="/__/firebase/init.js"></script>
        </Head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
