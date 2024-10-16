// src/App.tsx
import React from 'react';

import Silebar from './Silebar'

const App: React.FC = () => {
    return (
        <div>
            <Silebar/>
            <div className="text-center mt-4">
                <h1 className="text-2xl font-bold">Bienvenido a Mi App</h1>
                <p>Aquí puedes navegar por las diferentes secciones.</p>
            </div>
        </div>
    );
};

export default App;

