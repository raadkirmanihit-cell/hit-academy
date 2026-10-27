import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps the build portable: it runs from any folder or host.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { assetsInlineLimit: 0, chunkSizeWarningLimit: 900 },
})
