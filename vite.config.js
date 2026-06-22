import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias lottie-web to the light version to avoid 'eval' warnings during build
      'lottie-web': 'lottie-web/build/player/lottie_light.js',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'recharts'],
          ui: ['lucide-react', 'swiper', 'lottie-react', 'lottie-web'],
        },
      },
    },
    // Bump chunk size warning limit to 1000kB since index.js is around 946kB
    chunkSizeWarningLimit: 1000,
  },
})
