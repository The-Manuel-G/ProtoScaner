
import './App.css';



// App.tsx
import React from 'react';
// Ajusta la ruta seg�n tu estructura de carpetas

const App: React.FC = () => {
    return (
        <div>
           
            <div className="text-center mt-4">
                <h1 className="text-2xl font-bold">Bienvenido a Mi App</h1>
                <p>Aqu� puedes navegar por las diferentes secciones.</p>
            </div>
            {/* Otras secciones de tu aplicaci�n */}
        </div>
    );
};

export default App;
