import React, { useState } from 'react'
import { useSpaceTravel } from '../context/SpaceTravelContext.jsx'
import Loading from '../components/Loading.jsx'
import ErrorAlert from '../components/ErrorAlert.jsx'
import PlanetCard from '../components/PlanetCard.jsx'
import styles from './PlanetsPage.module.css'

export default function PlanetsPage() {
  const { planets, spacecrafts, loading, error, sendSpacecraftToPlanet } = useSpaceTravel()
  const [localError, setLocalError] = useState('')

  const onSend = async (spacecraftId, targetPlanetId) => {
    setLocalError('')
    const res = await sendSpacecraftToPlanet({ spacecraftId, targetPlanetId })
    if (res.isError) setLocalError(res.data)
  }

  return (
    <section>
      <h1>Planets</h1>
      {(loading) && <Loading label="Fetching planets" />}
      <ErrorAlert message={error || localError} />
      <div className="grid grid-3">
        {planets.map(planet => (
          <PlanetCard
            key={planet.id}
            planet={planet}
            allPlanets={planets}
            spacecrafts={spacecrafts}
            onSend={onSend}
          />
        ))}
      </div>
    </section>
  )
}
