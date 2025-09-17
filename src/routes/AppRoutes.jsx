import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'
import SpacecraftsPage from '../pages/SpacecraftsPage.jsx'
import SpacecraftPage from '../pages/SpacecraftPage.jsx'
import ConstructPage from '../pages/ConstructPage.jsx'
import PlanetsPage from '../pages/PlanetsPage.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/spacecrafts" element={<SpacecraftsPage />} />
      <Route path="/spacecrafts/build" element={<ConstructPage />} />
      <Route path="/spacecrafts/:id" element={<SpacecraftPage />} />
      <Route path="/planets" element={<PlanetsPage />} />
      {/* Redirect any unknown route to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
