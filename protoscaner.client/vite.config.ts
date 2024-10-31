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
    optimizeDeps: {
        include: [
            'primereact/resources/primereact.min.css',
            'primereact/resources/themes/saga-blue/theme.css',
            'primeicons/primeicons.css',
            'react-toastify/dist/ReactToastify.css'
        ]
    },
    server: {
        port: 5173
    }
});
