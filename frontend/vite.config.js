import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          motion: ['framer-motion'],
          supabase: ['@supabase/supabase-js'],
          booking: ['react-datepicker', 'react-hook-form', '@hookform/resolvers', 'zod', 'date-fns'],
          markdown: ['react-markdown'],
          icons: ['react-icons', 'react-icons/fi', 'react-icons/fa6']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
