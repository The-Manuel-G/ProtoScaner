// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    // Configura el modo oscuro para que use la clase 'dark'
    darkMode: ['class'],

    // Especifica las rutas donde Tailwind debe buscar clases para generar estilos
    content: [
        './src/**/*.{js,ts,jsx,tsx}',       // Incluye todos los archivos JS, TS, JSX, TSX en src
        './public/index.html',              // Incluye el archivo de índice
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}', // NextUI
        './node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}',        // shadcn/ui
        './node_modules/primereact/**/*.{js,ts,jsx,tsx}',           // PrimeReact (Añadido para mayor compatibilidad)
    ],

    // Extiende el tema predeterminado de Tailwind
    theme: {
        extend: {
            // Personaliza los bordes redondeados utilizando variables CSS
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            // Define colores personalizados basados en variables CSS
            colors: {
                    'blue-50': '#ebf8ff',
                    'blue-200': '#bee3f8',
                    'green-50': '#f0fff4',
                    'green-200': '#c6f6d5',
             
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                },
                // Colores personalizados para Toastify
                toastify: {
                    dark: '#121212',
                    info: '#3498db',
                    success: '#07bc0c',
                    warning: '#f1c40f',
                    error: '#e74c3c'
                }
            }
        }
    },

    // Añade plugins adicionales
    plugins: [
        nextui(),                    // Integración con NextUI
        require("tailwindcss-animate"), // Plugin de animaciones
    ]
};
