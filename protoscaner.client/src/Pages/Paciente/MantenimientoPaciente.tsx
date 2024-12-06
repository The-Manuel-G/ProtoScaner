import React from 'react';

// Componente MantenimientoPaciente definido como funci�n
export function MantenimientoPaciente(): JSX.Element {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Mantenimiento</h1>
            <p className="mt-4">
                Genera reportes personalizados sobre pacientes, pr�tesis, mantenimientos y m�s.
            </p>
            {/* Puedes agregar opciones de filtros o generaci�n de reportes */}
        </div>
    );
}

export default MantenimientoPaciente;
