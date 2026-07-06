import path from "path";
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    // This tells Vite not to use the aggressive scanner on certain folders
    entries: ['./src/main.tsx'], 
    // Add this inside defineConfig if you get loading errors
    exclude: ['./src/wasm_output.js', '@ffmpeg/ffmpeg', '@ffmpeg/util'],
  },
  server: {
    // Essential headers to enable SharedArrayBuffer for multi-threading
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
    watch: {
      usePolling: true,
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
