import React from 'react';

const PacientesComponent: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Gestión de Pacientes</h1>
            <p className="mt-4">Aquí puedes administrar la información de los pacientes. Agrega, edita o elimina pacientes según sea necesario.</p>
            {/* Puedes agregar una tabla o lista de pacientes aquí */}
        </div>
    );
};

export default PacientesComponent;
