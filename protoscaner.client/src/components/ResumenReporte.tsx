// src/components/Reportes/ResumenReporte.tsx
import React, { useEffect, useState } from 'react';
import { FaUserInjured, FaTools } from 'react-icons/fa';
import { getMantenimientosActivos, getTotalPacientes } from '../services/ReporteService';
import { MantenimientosActivos, TotalPacientes } from '../types/Reporte';

const ResumenReporte: React.FC = () => {
    const [mantenimientosActivos, setMantenimientosActivos] = useState<number | null>(null);
    const [totalPacientes, setTotalPacientes] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Para mostrar el indicador de carga
                const mantenimientoResponse = await getMantenimientosActivos();
                const pacientesResponse = await getTotalPacientes();

                // Asignar datos
                setMantenimientosActivos(mantenimientoResponse.totalMantenimientosActivos);
                setTotalPacientes(pacientesResponse.totalPacientes);
            } catch (err) {
                setError('Error al cargar los datos.');
                console.error(err);
            } finally {
                setLoading(false); // Ocultar indicador de carga
            }
        };

        fetchData();
    }, []);

    // Función para manejar la conversión y validación de los números
    const formatNumber = (number: number | null) => {
        if (number === null || isNaN(number)) {
            return 'Cargando...'; // O algún mensaje alternativo
        }
        return new Intl.NumberFormat().format(number); // Convertir el número a formato con comas
    };

    return (
        <div className="p-4 sm:ml-16">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                    {/* Total de Pacientes */}
                    <div className="flex flex-col items-center justify-between h-40 bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg rounded-lg dark:bg-gray-800 p-6 hover:scale-105 transition-all duration-300 ease-in-out">
                        <div className="flex items-center justify-between w-full">
                            <div className="text-left">
                                <span className="block text-gray-200 font-medium mb-1">Total de Pacientes</span>
                                <div className="text-3xl font-extrabold">{formatNumber(totalPacientes)}</div>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-full">
                                <FaUserInjured className="text-blue-500 text-3xl" />
                            </div>
                        </div>
                    </div>

                    {/* Mantenimientos Activos */}
                    <div className="flex flex-col items-center justify-between h-40 bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg dark:bg-gray-800 p-6 hover:scale-105 transition-all duration-300 ease-in-out">
                        <div className="flex items-center justify-between w-full">
                            <div className="text-left">
                                <span className="block text-gray-200 font-medium mb-1">Mantenimientos Activos</span>
                                <div className="text-3xl font-extrabold">{formatNumber(mantenimientosActivos)}</div>
                            </div>
                            <div className="bg-orange-100 p-2 rounded-full">
                                <FaTools className="text-orange-500 text-3xl" />
                            </div>
                        </div>
                    </div>

                    {/* Otros elementos */}
                </div>
            </div>
        </div>
    );
};

export default ResumenReporte;
