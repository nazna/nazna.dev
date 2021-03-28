import clsx from 'clsx'
import styles from '../styles/index.module.css'

export function Header() {
  return (
    <header className={clsx(styles.header, styles.container)}>
      <a className={styles.avatar} href="/">
        <img width="48px" height="48px" src="avatar.png" alt="nazna's avatar" />
      </a>
    </header>
  )
}
