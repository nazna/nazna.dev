import styles from './style.module.css'

export function Profile() {
  return (
    <main className={styles.container}>
      <h1 className={styles.sparkle}>
        Hello~
        <br />
        I'm naoya.
      </h1>
      <section className={styles.description}>
        <p>
          Web application engineer in Tokyo.
          <br />
          &mdash; also a gamer, reader, sleeper.
        </p>
        <p>I'm currently a Node.js engineer.</p>
        <p>
          I write my thoughts on <a href="//blog.nazna.dev">here</a>.
        </p>
      </section>
    </main>
  )
}
