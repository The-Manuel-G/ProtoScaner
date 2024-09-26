
import './App.css';



// App.tsx
import React from 'react';
// Ajusta la ruta según tu estructura de carpetas

const App: React.FC = () => {
    return (
        <div>
           
            <div className="text-center mt-4">
                <h1 className="text-2xl font-bold">Bienvenido a Mi App</h1>
                <p>Aquí puedes navegar por las diferentes secciones.</p>
            </div>
            {/* Otras secciones de tu aplicación */}
        </div>
    );
};

export default App;
