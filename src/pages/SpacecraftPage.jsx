import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSpaceTravel } from '../context/SpaceTravelContext.jsx'
import Loading from '../components/Loading.jsx'
import ErrorAlert from '../components/ErrorAlert.jsx'
import styles from './SpacecraftPage.module.css'

export default function SpacecraftPage() {
  const { id } = useParams()
  const { getSpacecraftById, planets, loading } = useSpaceTravel()
  const [craft, setCraft] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      const res = await getSpacecraftById(id)
      if (res.isError) setError(res.data); else setCraft(res.data)
    })()
  }, [id, getSpacecraftById])

  if (loading && !craft) return <Loading label="Loading spacecraft" />
  if (error) return <ErrorAlert message={error} />
  if (!craft) return <p>Spacecraft not found. <Link to="/spacecrafts">Back</Link></p>

  const planetName = planets.find(p => p.id === craft.currentLocation)?.name || 'Unknown'

  return (
    <section className={styles.wrap}>
      <Link to="/spacecrafts" className={styles.back}>← Back to list</Link>
      <div className="card">
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>{craft.name}</h1>
            <div className={styles.meta}>
              <span>Capacity: <strong>{craft.capacity}</strong></span>
              <span>Location: <strong>{planetName}</strong></span>
            </div>
          </div>
          {craft.pictureUrl && <img className={styles.img} src={craft.pictureUrl} alt={craft.name} />}
        </header>
        <p className={styles.desc}>{craft.description}</p>
      </div>
    </section>
  )
}
