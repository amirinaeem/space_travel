import React from 'react'
import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <section className={styles.home}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Command the Evacuation</h1>
        <p className={styles.tagline}>
          Welcome, Commander. Use <strong>Space Travel</strong> to marshal spacecraft, move populations,
          and secure humanity's future among the stars.
        </p>
        <div className={styles.cta}>
          <Link to="/spacecrafts" className={styles.btnPrimary}>View Spacecrafts</Link>
          <Link to="/planets" className={styles.btnSecondary}>Dispatch to Planets</Link>
        </div>
      </div>
      <div className="grid grid-3" style={{marginTop: '2rem'}}>
        <div className="card">
          <h3>🛰️ Manage Fleet</h3>
          <p>List all spacecraft, inspect details, build new ships, and decommission outdated vessels.</p>
        </div>
        <div className="card">
          <h3>🪐 Planetary Operations</h3>
          <p>Survey colonies, see which ships are stationed where, and send ships between planets.</p>
        </div>
        <div className="card">
          <h3>⏱️ Smooth UX</h3>
          <p>Loading states, client-side routing, and graceful fallbacks keep things clear under pressure.</p>
        </div>
      </div>
    </section>
  )
}
