import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        { src: 'src/Assets', dest: 'public' },
      ]
    }),
  ],
  build: {
    emptyOutDir: false,
    outDir: 'dist',
    assetsDir: 'Assets',
  },
  server: {
    port: 5000,
    proxy: {
      "/api": {
        target: "http://localhost:8000"
      }
    }
  }
})
