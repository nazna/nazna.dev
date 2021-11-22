import clsx from 'clsx'
import Link from 'next/link'
import styles from '../styles/index.module.css'

export function Header() {
  return (
    <header className={clsx(styles.header, styles.container)}>
      <Link href="/">
        <a className={styles.avatar}>
          <img width="48px" height="48px" src="avatar.png" alt="nazna's avatar" />
        </a>
      </Link>
    </header>
  )
}
