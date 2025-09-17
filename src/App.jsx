import React from 'react'
import { SpaceTravelProvider } from './context/SpaceTravelContext.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import Navbar from './components/Navbar.jsx'
import styles from './styles/App.module.css'

export default function App() {
  return (
    <SpaceTravelProvider>
      <div className={styles.app}>
        <Navbar />
        <main className={styles.main}>
          <AppRoutes />
        </main>
        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Space Travel</span>
        </footer>
      </div>
    </SpaceTravelProvider>
  )
}
