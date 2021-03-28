import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/styles.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>nazna.dev</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
