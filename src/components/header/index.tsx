import styles from './style.module.css'

export function Header() {
  return (
    <header className={styles.container}>
      <a className={styles.avatar} href="/">
        <img width="48px" height="48px" src="/avatar.jpg" />
      </a>
      <a className={styles.blog} href="//blog.nazna.dev">
        blog
      </a>
    </header>
  )
}
