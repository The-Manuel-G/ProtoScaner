import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      strict: true, // Asegurar que solo se sirvan archivos permitidos
    },
  },
  build: {
    target: 'esnext', // Asegura que la compilación sea para entornos modernos
  },
});
