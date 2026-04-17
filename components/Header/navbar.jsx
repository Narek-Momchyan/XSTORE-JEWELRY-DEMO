
import styles from './Header.module.css'
import Link from 'next/link'
export default function NavBar({ navbar }) {
  return (
    <div className={styles.navbar}>
      {
        navbar.map(item => (
          <Link key={item.id} className={styles.link} href={item.route}>
            {item.label}
          </Link>
        ))
      }

    </div>
  )
}
