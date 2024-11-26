// src/main.tsx

import 'primereact/resources/themes/saga-blue/theme.css';  // Importa el tema de PrimeReact
import 'primereact/resources/primereact.min.css';          // Estilos de PrimeReact
import 'primeicons/primeicons.css';                        // Iconos de PrimeReact
import 'react-toastify/dist/ReactToastify.css';            // Estilos de Toastify
import { NextUIProvider } from '@nextui-org/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <NextUIProvider>
            <App />
        </NextUIProvider>
    </StrictMode>,
);
