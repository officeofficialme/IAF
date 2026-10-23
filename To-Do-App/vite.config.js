import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The app lives in the To-Do-App folder, but Pages URL uses the repository name.
export default defineConfig({
  plugins: [react()],
  base: '/IAF/',
})
