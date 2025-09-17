import React from 'react'
import { Link } from 'react-router-dom'
import { useSpaceTravel } from '../context/SpaceTravelContext.jsx'
import SpacecraftCard from '../components/SpacecraftCard.jsx'
import Loading from '../components/Loading.jsx'
import ErrorAlert from '../components/ErrorAlert.jsx'
import styles from './SpacecraftsPage.module.css'

export default function SpacecraftsPage() {
  const { spacecrafts, planets, loading, error, destroySpacecraftById } = useSpaceTravel()

  const planetName = (id) => planets.find(p => p.id === id)?.name || 'Unknown'

  return (
    <section>
      <div className={styles.header}>
        <h1>Spacecrafts</h1>
        <Link to="/spacecrafts/build" className={styles.build}>+ Build spacecraft</Link>
      </div>
      {loading && <Loading label="Fetching spacecrafts" />}
      <ErrorAlert message={error} />
      <div className="grid grid-3">
        {spacecrafts.map(craft => (
          <SpacecraftCard
            key={craft.id}
            craft={craft}
            planetName={planetName(craft.currentLocation)}
            onDestroy={async (id) => await destroySpacecraftById(id)}
          />
        ))}
      </div>
      {(!loading && spacecrafts.length === 0) && (
        <p className={styles.empty}>No spacecraft yet. <Link to="/spacecrafts/build">Build the first one</Link>.</p>
      )}
    </section>
  )
}
