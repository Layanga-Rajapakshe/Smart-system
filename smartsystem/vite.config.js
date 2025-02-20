/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:5173,
    proxy:{
      '/api':{
        target:'http://localhost:3000'
      }
    }
  },
  envDir: './env',
})
*/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  envDir: './env',
  UNSPLASH_API_KEY:'U4mVpQ-eEGWhorkq7zou7HgumiSJGcZoqRj6Qxi7LOg',
});

