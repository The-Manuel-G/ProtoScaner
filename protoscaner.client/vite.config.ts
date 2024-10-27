import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // Alias configurado para la carpeta src
        }
    },
    server: {
        port: 5173,
        // Elimina la configuración de HTTPS si no es necesaria.
    }
});
