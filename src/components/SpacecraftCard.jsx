import React from 'react'
import { Link } from 'react-router-dom'
import styles from './SpacecraftCard.module.css'

export default function SpacecraftCard({ craft, planetName, onDestroy }) {
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.card__header}>
        <div className={styles.card__title}>
          <h3 className={styles.name}>{craft.name}</h3>
          <span className={styles.badge}>Cap: {craft.capacity}</span>
        </div>
        {onDestroy && (
          <button className={styles.destroy} onClick={() => onDestroy(craft.id)} aria-label={`Destroy ${craft.name}`}>
            Destroy
          </button>
        )}
      </div>
      <div className={styles.body}>
        <p className={styles.desc}>{craft.description}</p>
        <div className={styles.meta}>
          <span>Location: <strong>{planetName}</strong></span>
          {craft.pictureUrl && <img className={styles.img} src={craft.pictureUrl} alt={craft.name} />}
        </div>
      </div>
      <div className={styles.actions}>
        <Link to={`/spacecrafts/${craft.id}`} className={styles.link}>View details</Link>
      </div>
    </div>
  )
}
