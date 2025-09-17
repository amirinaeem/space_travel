import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// No base path set so the app works in any hosting context. For GitHub Pages we use HashRouter.
export default defineConfig({
  plugins: [react()],
})
