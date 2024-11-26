import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { baseUrl } from './src/utils/constants'

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 3000,
  },
  proxy:{
    target: baseUrl,
    changeOrigin: true,
  }
})
