import styles from './Header.module.css'
import Link from 'next/link'

export default function Logo({ logo }) {

  return (
    <Link href={logo?.logo_route || "/"} className={styles.logo}>
      <span className={styles.logoTitle1}>{logo?.title || ""}</span>
      <span className={styles.logoTitle2}>{logo?.title2 || ""}</span>
    </Link>
  )
}