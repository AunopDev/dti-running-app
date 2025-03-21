import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // กำหนด base URL เป็น root
  server:{
    port: 5566,
    host: true  // อนุญาตให้เข้าถึงจากภายนอกได้
  }
})
