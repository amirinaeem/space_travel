import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import SpaceTravelApi from '../services/SpaceTravelApi.js'

const SpaceTravelCtx = createContext(null)

export function SpaceTravelProvider({ children }) {
  const [planets, setPlanets] = useState([])
  const [spacecrafts, setSpacecrafts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setLoading(true)
    setError('')
    const [pRes, sRes] = await Promise.all([SpaceTravelApi.getPlanets(), SpaceTravelApi.getSpacecrafts()])
    if (pRes.isError) setError(pRes.data)
    if (sRes.isError) setError(prev => prev || sRes.data)
    if (!pRes.isError) setPlanets(pRes.data)
    if (!sRes.isError) setSpacecrafts(sRes.data)
    setLoading(false)
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const buildSpacecraft = useCallback(async (payload) => {
    setLoading(true)
    const res = await SpaceTravelApi.buildSpacecraft(payload)
    if (res.isError) setError(res.data); else await refresh()
    setLoading(false)
    return res
  }, [refresh])

  const destroySpacecraftById = useCallback(async (id) => {
    setLoading(true)
    const res = await SpaceTravelApi.destroySpacecraftById({ id })
    if (res.isError) setError(res.data); else await refresh()
    setLoading(false)
    return res
  }, [refresh])

  const sendSpacecraftToPlanet = useCallback(async ({ spacecraftId, targetPlanetId }) => {
    setLoading(true)
    const res = await SpaceTravelApi.sendSpacecraftToPlanet({ spacecraftId, targetPlanetId })
    if (res.isError) setError(res.data); else await refresh()
    setLoading(false)
    return res
  }, [refresh])

  const getSpacecraftById = useCallback(async (id) => {
    setLoading(true)
    const res = await SpaceTravelApi.getSpacecraftById({ id })
    if (res.isError) setError(res.data)
    setLoading(false)
    return res
  }, [])

  const value = useMemo(() => ({
    planets, spacecrafts, loading, error,
    refresh,
    buildSpacecraft,
    destroySpacecraftById,
    sendSpacecraftToPlanet,
    getSpacecraftById
  }), [planets, spacecrafts, loading, error, refresh, buildSpacecraft, destroySpacecraftById, sendSpacecraftToPlanet, getSpacecraftById])

  return <SpaceTravelCtx.Provider value={value}>{children}</SpaceTravelCtx.Provider>
}

export function useSpaceTravel() {
  const ctx = useContext(SpaceTravelCtx)
  if (!ctx) throw new Error('useSpaceTravel must be used within SpaceTravelProvider')
  return ctx
}
