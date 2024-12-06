// src/components/Reportes/DistribucionEdadChart.tsx

import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { getDistribucionEdad } from '../../services/ReporteService';
import { DistribucionEdad } from '../../types/Reporte';

const DistribucionEdadChart: React.FC = () => {
    const [chartData, setChartData] = useState<any>({});
    const [chartOptions, setChartOptions] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDistribucionEdad();
                const data: DistribucionEdad[] = response.data;

                console.log('Datos de Distribución de Edad:', data); // Depuración

                const labels = data.map(item => item.rangoEdad);
                const counts = data.map(item => item.cantidad);

                const documentStyle = getComputedStyle(document.documentElement);
                const textColor = documentStyle.getPropertyValue('--text-color') || '#000';
                const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary') || '#6c757d';
                const surfaceBorder = documentStyle.getPropertyValue('--surface-border') || '#ccc';

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Rango de Edad',
                            data: counts,
                            backgroundColor: 'rgba(34, 197, 94, 0.6)', // Verde
                            borderColor: 'rgba(34, 197, 94, 1)',
                            borderWidth: 1,
                        },
                    ],
                });

                setChartOptions({
                    plugins: {
                        legend: {
                            labels: {
                                color: textColor,
                            },
                        },
                    },
                    scales: {
                        y: {
                            ticks: {
                                color: textColorSecondary,
                            },
                            grid: {
                                color: surfaceBorder,
                            },
                            beginAtZero: true,
                        },
                    },
                });

                setLoading(false); // Datos cargados
            } catch (error) {
                console.error('Error al obtener los datos de Distribución de Edad:', error);
                setLoading(false); // Terminar carga aunque haya error
            }
        };

        fetchData();
    }, []);

    return (
        <div className="card">
            {loading ? (
                <p className="text-center text-gray-500">Cargando datos...</p> // Mostrar mensaje de carga
            ) : (
                chartData.labels ? (
                    <Chart type="bar" data={chartData} options={chartOptions} />
                ) : (
                    <p className="text-center text-red-500">No hay datos disponibles</p>
                )
            )}
        </div>
    );
};

export default DistribucionEdadChart;
