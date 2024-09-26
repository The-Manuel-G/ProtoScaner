// src/App.tsx
import React from 'react';
import NavigationMenu from './NavigationMenu'; // Importa el NavigationMenu desde la carpeta components

const App: React.FC = () => {
    return (
        <div>
            <NavigationMenu />
            <div className="text-center mt-4">
                <h1 className="text-2xl font-bold">Bienvenido a Mi App</h1>
                <p>Aqu� puedes navegar por las diferentes secciones.</p>
            </div>
        </div>
    );
};

export default App;

