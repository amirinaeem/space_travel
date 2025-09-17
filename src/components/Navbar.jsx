import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <header className={styles.nav}>
      <nav className={styles.nav__inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>🚀</span>
          <span className={styles.title}>Space Travel</span>
        </div>
        <ul className={styles.links}>
          <li><NavLink to="/" className={({isActive}) => isActive ? styles.active : undefined}>Home</NavLink></li>
          <li><NavLink to="/spacecrafts" className={({isActive}) => isActive ? styles.active : undefined}>Spacecrafts</NavLink></li>
          <li><NavLink to="/planets" className={({isActive}) => isActive ? styles.active : undefined}>Planets</NavLink></li>
          <li><NavLink to="/spacecrafts/build" className={({isActive}) => isActive ? styles.active : undefined}>Build</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}
