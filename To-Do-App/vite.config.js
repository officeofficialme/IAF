import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages project URL uses the repository name: /IAF/
export default defineConfig({
  plugins: [react()],
  base: '/IAF/',
})
