import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: process.env.NETLIFY ? '/' : '/TTA/',
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/TTA/api/endpoints': {
        target: 'http://localhost/TTA/api/endpoints',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/TTA\/api\/endpoints/, ''),
      },
      '/api/endpoints': {
        target: 'http://localhost/TTA/api/endpoints',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/endpoints/, ''),
      },
    },
  },
})
