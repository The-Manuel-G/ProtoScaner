import React from 'react';

// Componente Reportepage definido como funci�n sin React.FC
export function EntregaPaciente(): JSX.Element {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Generaci�n de informe de entrega de protesis por paciente </h1>
            <p className="mt-4">
                Genera reportes personalizados sobre pacientes, pr�tesis, mantenimientos y m�s.
            </p>
            {/* Puedes agregar opciones de filtros o generaci�n de reportes */}
        </div>
    );
}

export default EntregaPaciente;