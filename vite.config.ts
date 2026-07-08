import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      'lottie-web': path.resolve(
        __dirname,
        'node_modules/lottie-web/build/player/esm/lottie.min.js',
      ),
    },
  },
  optimizeDeps: {
    include: ['lottie-react', 'lottie-web'],
  },
})
