import React, { useMemo, useState } from 'react'
import styles from './PlanetCard.module.css'

export default function PlanetCard({ planet, allPlanets, spacecrafts, onSend }) {
  const [selected, setSelected] = useState('')

  const stationed = useMemo(() => spacecrafts.filter(s => s.currentLocation === planet.id), [spacecrafts, planet.id])

  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.name}>{planet.name}</h3>
          <div className={styles.meta}>Population: {planet.currentPopulation.toLocaleString()}</div>
        </div>
        {planet.pictureUrl && <img className={styles.img} src={planet.pictureUrl} alt={planet.name} />}
      </div>

      {stationed.length === 0 ? (
        <div className={styles.empty}>No spacecraft stationed here.</div>
      ) : (
        <ul className={styles.list}>
          {stationed.map(craft => (
            <li key={craft.id} className={styles.list__item}>
              <div className={styles.craft}>
                <span className={styles.craft__name}>{craft.name}</span>
                <span className={styles.craft__cap}>Cap: {craft.capacity}</span>
              </div>
              <div className={styles.controls}>
                <select
                  aria-label={`Choose destination for ${craft.name}`}
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option value="">Send to…</option>
                  {allPlanets.filter(p => p.id !== planet.id).map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <button disabled={!selected} onClick={() => onSend(craft.id, Number(selected))}>Send</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
