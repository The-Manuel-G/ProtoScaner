// src/pages/Paciente/PruebasSokerPaciente.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PruebaSocket } from '../../types/PruebaSocket';
import { getPruebaSocket } from '../../services/PruebaSocketService';
import MiniMenu from '../../components/ui/MiniMenu';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const PruebasSokerPaciente: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [pruebaSocket, setPruebaSocket] = useState<PruebaSocket | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const pacienteId = parseInt(id || '0', 10);

    useEffect(() => {
        const fetchPruebaSocket = async () => {
            if (pacienteId <= 0) {
                toast.error('ID de paciente inválido');
                setLoading(false);
                return;
            }

            try {
                const data = await getPruebaSocket(pacienteId);
                setPruebaSocket(data);
                setLoading(false);
                toast.success('Datos de la prueba cargados correctamente');
            } catch (error: any) {
                console.error('Error fetching PruebaSocket:', error);
                toast.error('No se pudo obtener la prueba de soker. Aún no tienes prueba de soker.');
                setPruebaSocket(null);
                setLoading(false);
            }
        };

        fetchPruebaSocket();
    }, [pacienteId]);

    const handleTakeNewPrueba = () => {
        navigate(`/prueba-soker/${pacienteId}/nuevo`); // Ajusta la ruta según tu configuración
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <div className="relative">
            <MiniMenu />
            <div className="container mx-auto p-6 max-w-4xl">
                <h1 className="text-3xl font-bold text-center text-green-600 flex items-center justify-center gap-2">
                    Prueba de Soker del Paciente
                </h1>
                {pruebaSocket ? (
                    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                        <h2 className="text-xl font-semibold mb-4">Detalles de la Prueba</h2>
                        <p><strong>ID Prueba:</strong> {pruebaSocket.idPrueba}</p>
                        <p><strong>Modificación General:</strong> {pruebaSocket.ModificacionGeneral}</p>
                        <p><strong>Quién La Hizo:</strong> {pruebaSocket.QuienLaHizo}</p>
                        <p><strong>Fecha de Prueba:</strong> {pruebaSocket.FechaPrueba}</p>
                        <p><strong>Práctica de Marcha:</strong> {pruebaSocket.PracticaMarcha}</p>
                        <p><strong>Fecha de Mantenimiento Post Entrega:</strong> {pruebaSocket.FechaMantenimientoPostEntrega}</p>
                        <p><strong>Fallo del Socket:</strong> {pruebaSocket.SocketFallo}</p>
                        <p><strong>Fecha de Fallo:</strong> {pruebaSocket.FechaFallo}</p>
                        <p><strong>Material de Relleno Usado:</strong> {pruebaSocket.MaterialRellenoUsado}</p>
                        <p><strong>ID Componente:</strong> {pruebaSocket.IdComponente}</p>
                        <p><strong>ID Usuario:</strong> {pruebaSocket.IdUsuario}</p>
                        <p><strong>ID Socket:</strong> {pruebaSocket.IdSocket}</p>
                        <p><strong>Práctica Recibida:</strong> {pruebaSocket.PracticaRecibida}</p>
                        <p><strong>Duración de Terapia:</strong> {pruebaSocket.DuracionTerapia}</p>
                        <p><strong>Fecha de Práctica:</strong> {pruebaSocket.FechaPractica}</p>
                    </div>
                ) : (
                    <div className="bg-white shadow-lg rounded-lg p-6 mt-6 text-center">
                        <p className="text-gray-600">Aún no tienes prueba de soker.</p>
                        <Button
                            onClick={handleTakeNewPrueba}
                            className="mt-4 flex items-center justify-center gap-2"
                            variant="primary"
                        >
                            <FaPlus /> Tomar Nueva Prueba de Soker
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PruebasSokerPaciente;
