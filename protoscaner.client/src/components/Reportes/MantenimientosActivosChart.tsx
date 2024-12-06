// src/components/Reportes/MantenimientosActivosChart.tsx

import React, { useState, useEffect } from 'react';
import { getMantenimientosActivos } from '../../services/ReporteService';
import { MantenimientosActivosResponse } from '../../types/Reporte';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

const MantenimientosActivosChart: React.FC = () => {
    const [data, setData] = useState<MantenimientosActivosResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMantenimientosActivos = async () => {
            try {
                const result = await getMantenimientosActivos();
                setData(result);
                setLoading(false);
            } catch (err: any) {
                console.error('Error al obtener mantenimientos activos:', err);
                setError(err.response?.data?.Error || 'Ocurrió un error al cargar los mantenimientos activos.');
                setLoading(false);
            }
        };

        fetchMantenimientosActivos();
    }, []);

    return (
        <div className="card p-4 flex flex-col items-center justify-center h-40 bg-white shadow-md rounded-lg">
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <ErrorMessage message={error} />
            ) : data ? (
                <>
                    <h2 className="text-lg font-semibold text-gray-700">Mantenimientos Activos</h2>
                    <p className="text-3xl font-bold text-blue-600">{data.TotalMantenimientosActivos}</p>
                </>
            ) : (
                <ErrorMessage message="No se encontraron datos disponibles." />
            )}
        </div>
    );
};

export default MantenimientosActivosChart;
