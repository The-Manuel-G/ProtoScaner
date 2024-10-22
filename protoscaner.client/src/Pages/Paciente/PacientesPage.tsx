import React from 'react';

const PacientesComponent: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Gesti�n de Pacientes</h1>
            <p className="mt-4">Aqu� puedes administrar la informaci�n de los pacientes. Agrega, edita o elimina pacientes seg�n sea necesario.</p>
            {/* Puedes agregar una tabla o lista de pacientes aqu� */}
        </div>
    );
};

export default PacientesComponent;
