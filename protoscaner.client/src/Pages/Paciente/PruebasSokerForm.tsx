import React from 'react';

// Componente Reportepage definido como función sin React.FC
export function PruebasSokerForm(): JSX.Element {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Pruebas de soker </h1>
            <p className="mt-4">
                Genera reportes personalizados sobre pacientes, prótesis, mantenimientos y más.
            </p>
            {/* Puedes agregar opciones de filtros o generación de reportes */}
        </div>
    );
}

export default PruebasSokerForm;