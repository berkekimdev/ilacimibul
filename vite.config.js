import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Docker'da çalışırken sunucunun dışarıya açılmasını sağlar
    port: 5173, // Vite'nin kullandığı port
    watch: {
      usePolling: true, // Dosya değişikliklerini algılamak için polling kullanır
    },
  },
})
