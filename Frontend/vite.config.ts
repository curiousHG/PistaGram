import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 5000,
    proxy: {
      "/api": {
        target: "http://172.31.46.48/",
      }
    }
  }
})
