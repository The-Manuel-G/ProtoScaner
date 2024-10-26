import React from 'react';

// Componente MantenimientoComponent definido como función sin React.FC
export function MantenimientoPage(): JSX.Element {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Mantenimiento de Prótesis</h1>
            <p className="mt-4">
                Administra las solicitudes de mantenimiento de prótesis. Aquí puedes revisar y procesar los mantenimientos pendientes.
            </p>
        </div>
    );
}

export default MantenimientoPage;
