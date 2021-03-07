import styles from '../styles/index.module.css'

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
          Web application engineer in Japan.
          <br />
          &mdash; also a gamer, reader and sleeper.
        </p>
      </section>
    </main>
  )
}
