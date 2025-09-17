import React from 'react'
import styles from './ErrorAlert.module.css'

export default function ErrorAlert({ message }) {
  if (!message) return null
  return (
    <div className={styles.alert} role="alert">
      <strong>Error:</strong> {message}
    </div>
  )
}
