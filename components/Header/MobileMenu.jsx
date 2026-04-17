"use client"
import { useState } from 'react'
import { FaBars, FaXmark } from "react-icons/fa6"
import styles from './Header.module.css'

export default function MobileMenu({ navbar }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className={styles.burgerIcon} onClick={toggleMenu}>
        <FaBars />
      </div>

      <div className={`${styles.mobileMenu} ${isOpen ? styles.menuActive : ''}`}>
        <div className={styles.menuHeader}>
          <FaXmark className={styles.closeIcon} onClick={toggleMenu} />
        </div>

        <div className={styles.menuContent}>
          <nav className={styles.mobileNav}>
            {navbar.map((item) => (
              <a 
                key={item.id} 
                href={item.route} 
                className={styles.mobileLink}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </>
  )
}