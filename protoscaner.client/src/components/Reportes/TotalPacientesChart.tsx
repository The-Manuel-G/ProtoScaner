// src/components/Reportes/TotalPacientesChart.tsx

import React, { useState, useEffect } from 'react';
import { getTotalPacientes } from '../../services/ReporteService';
import { TotalPacientes } from '../../types/Reporte';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

const TotalPacientesChart: React.FC = () => {
    const [data, setData] = useState<TotalPacientes | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTotalPacientes = async () => {
            try {
                const response = await getTotalPacientes();
                const data: TotalPacientes = response.data;
                setData(data);
                setLoading(false);
            } catch (err: any) {
                console.error('Error al obtener el total de pacientes:', err);
                setError(err.response?.data?.error || 'Ocurrió un error al cargar el total de pacientes.');
                setLoading(false);
            }
        };

        fetchTotalPacientes();
    }, []);

    return (
        <div className="text-center p-4 bg-gray-100 shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Total de Pacientes
            </h2>
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <ErrorMessage message={error} />
            ) : data ? (
                <p className="text-3xl font-bold text-blue-600">{data.TotalPacientes}</p>
            ) : (
                <p className="text-center text-red-500">No se encontraron datos disponibles.</p>
            )}
        </div>
    );
};

export default TotalPacientesChart;
