// src/components/Reportes/DistribucionCausasPolarAreaChart.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'primereact/chart';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { getCausasFiltradas } from '../../services/ReporteService';  // Usamos el servicio correcto
import { DistribucionCausas } from '../../types/Reporte';
import { generos, tiposAmputacion, ladosAmputacion } from '../../constants';
import { FaSyncAlt } from 'react-icons/fa';
import { Card } from 'primereact/card';

const DistribucionCausasPolarAreaChart: React.FC = () => {
    // Estados para los filtros
    const [selectedGeneros, setSelectedGeneros] = useState<number[]>([]);
    const [selectedTiposAmputacion, setSelectedTiposAmputacion] = useState<number[]>([]);
    const [selectedLadosAmputacion, setSelectedLadosAmputacion] = useState<number[]>([]);

    // Estados para los datos del gráfico
    const [causasData, setCausasData] = useState<DistribucionCausas[]>([]);

    // Estados de carga y error
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Referencia para el Toast
    const toastRef = useRef<Toast>(null);

    // Función para obtener y procesar los datos filtrados
    const fetchCausasDistribucion = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getCausasFiltradas(
                selectedGeneros.length > 0 ? selectedGeneros[0] : undefined,
                selectedTiposAmputacion.length > 0 ? selectedTiposAmputacion[0] : undefined,
                selectedLadosAmputacion.length > 0 ? selectedLadosAmputacion[0] : undefined
            );
            setCausasData(response.data);
        } catch (err) {
            console.error('Error fetching Distribucion Causas:', err);
            setError('Error al cargar los datos.');
            toastRef.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los datos.', life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    // Efecto para cargar los datos al montar el componente o al cambiar los filtros
    useEffect(() => {
        fetchCausasDistribucion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedGeneros, selectedTiposAmputacion, selectedLadosAmputacion]);

    // Colores únicos para cada causa
    const generateColors = (num: number) => {
        const colors = [
            'rgba(99, 102, 241, 0.6)', 'rgba(34, 211, 238, 0.6)', 'rgba(16, 185, 129, 0.6)',
            'rgba(255, 159, 64, 0.6)', 'rgba(237, 100, 121, 0.6)', 'rgba(249, 115, 22, 0.6)',
            'rgba(59, 130, 246, 0.6)', 'rgba(6, 95, 70, 0.6)', 'rgba(255, 61, 61, 0.6)'
        ];
        return colors[num % colors.length];
    };

    // Formatear los datos para el gráfico de área polar
    const chartData = {
        labels: causasData.map((causa) => causa.causa),
        datasets: [
            {
                label: 'Cantidad',
                data: causasData.map((causa) => causa.cantidad),
                backgroundColor: causasData.map((_, index) => generateColors(index)),
                borderColor: causasData.map((_, index) => generateColors(index)),
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: 'Distribucion de Causas de Amputacion - Area Polar',
                font: {
                    size: 18,
                    weight: 'bold'
                }
            }
        },
        scales: {
            r: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg mt-8">
            <Toast ref={toastRef} />

            {/* Filtros */}
            <div className="mb-6 space-y-4">
                <div className="flex space-x-4">
                    <div className="w-full">
                        <MultiSelect
                            value={selectedGeneros}
                            options={generos}
                            onChange={(e) => setSelectedGeneros(e.value)}
                            optionLabel="label"
                            placeholder="Seleccionar Genero"
                            className="rounded-lg p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="w-full">
                        <MultiSelect
                            value={selectedTiposAmputacion}
                            options={tiposAmputacion}
                            onChange={(e) => setSelectedTiposAmputacion(e.value)}
                            optionLabel="label"
                            placeholder="Seleccionar Tipo de Amputacion"
                            className="rounded-lg p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="w-full">
                        <MultiSelect
                            value={selectedLadosAmputacion}
                            options={ladosAmputacion}
                            onChange={(e) => setSelectedLadosAmputacion(e.value)}
                            optionLabel="label"
                            placeholder="Seleccionar Lado de Amputacion"
                            className="rounded-lg p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button
                        icon={<FaSyncAlt />}
                        label="Actualizar"
                        onClick={fetchCausasDistribucion}
                        className="bg-blue-500 text-white rounded-lg hover:bg-blue-600 p-3"
                    />
                </div>
            </div>

            {/* Gráfico */}
            <Card className="mt-8">
                {loading ? (
                    <div className="flex justify-center">
                        <ProgressSpinner />
                    </div>
                ) : (
                    <Chart type="polarArea" data={chartData} options={chartOptions} />
                )}
            </Card>

            {error && (
                <div className="mt-4 text-red-500">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default DistribucionCausasPolarAreaChart;
