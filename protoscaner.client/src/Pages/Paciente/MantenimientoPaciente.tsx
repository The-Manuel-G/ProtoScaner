import React from 'react';

// Componente MantenimientoPaciente definido como función
export function MantenimientoPaciente(): JSX.Element {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Mantenimiento</h1>
            <p className="mt-4">
                Genera reportes personalizados sobre pacientes, prótesis, mantenimientos y más.
            </p>
            {/* Puedes agregar opciones de filtros o generación de reportes */}
        </div>
    );
}

export default MantenimientoPaciente;
