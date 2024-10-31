// postcss.config.js
module.exports = {
    plugins: {
        'postcss-import': {},    // Para importar archivos CSS en el orden adecuado
        'tailwindcss': {},       // Para ejecutar Tailwind CSS
        'postcss-nested': {},    // Para permitir CSS anidado
        'autoprefixer': {},      // Para agregar prefijos automáticamente
    },
};
