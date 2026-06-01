import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      usePolling: true,
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },
  optimizeDeps: {
    // This tells Vite not to use the aggressive scanner on certain folders
    entries: ['./src/main.tsx'], 
  },
})