import React from 'react';

// Componente Reportepage definido como función sin React.FC
export function Reportepage(): JSX.Element {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Generación de Reportes</h1>
            <p className="mt-4">
                Genera reportes personalizados sobre pacientes, prótesis, mantenimientos y más.
            </p>
            {/* Puedes agregar opciones de filtros o generación de reportes */}
        </div>
    );
}

export default Reportepage;
