import React from 'react'
import styles from './Loading.module.css'

export default function Loading({ label = 'Loading' }) {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner} aria-hidden="true" />
      <span className={styles.text}>{label}…</span>
    </div>
  )
}
