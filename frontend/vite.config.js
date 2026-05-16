import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'react-helmet-async'],
          'icons': ['react-icons', 'react-icons/fi', 'react-icons/fa6']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
