module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}', // Escanea todas las carpetas dentro de src
        './public/index.html',        // Escanea el archivo index.html en public
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'], // Fuente sin espacios extra
            },
        },
    },
    plugins: [],
};
