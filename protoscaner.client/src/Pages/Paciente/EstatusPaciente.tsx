// src/pages/Paciente/EstatusPaciente.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import StatusBoard from '../../components/StatusBoard';
import MiniMenu from '../../components/ui/MiniMenu'; // Importación correcta

interface RouteParams {
    id: string;
}

const EstatusPaciente: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const pacienteId = parseInt(id || '0', 10);

    console.log("EstatusPaciente: id =", id, "pacienteId =", pacienteId); // Depuración

    // Manejar el caso donde el id no es válido
    if (isNaN(pacienteId) || pacienteId <= 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500 text-lg">ID de paciente inválido.</p>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Integrar el MiniMenu */}
            <MiniMenu />
            <div className="p-5 bg-gray-50 rounded-lg shadow-md mt-16"> {/* Añadir margen superior para evitar superposición */}
                <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
                    Dashboard de Estatus del Paciente
                </h1>
                <StatusBoard pacienteId={pacienteId} />
            </div>
        </div>
    );
};

export default EstatusPaciente;
