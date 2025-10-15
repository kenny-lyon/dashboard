import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Necesario para GitHub Pages (ajusta si cambias el nombre del repo)
  base: '/dashboard/',
})