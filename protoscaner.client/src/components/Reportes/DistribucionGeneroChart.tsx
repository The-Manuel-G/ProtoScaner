// src/components/Reportes/DistribucionGeneroDoughnutChart.tsx

import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { getDistribucionGenero } from '../../services/ReporteService';
import { GeneroDistribucion } from '../../types/Reporte';
import SkeletonCard from '@/components/skeleton'; // Asegúrate de que la ruta es correcta

const DistribucionGeneroDoughnutChart: React.FC = () => {
    const [chartData, setChartData] = useState<any>({});
    const [chartOptions, setChartOptions] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDistribucionGenero();
                const data: GeneroDistribucion[] = response.data;

                console.log('Datos de Distribucion de Genero:', data); // Depuración

                const labels = data.map(item => item.genero);
                const counts = data.map(item => item.cantidad);

                const documentStyle = getComputedStyle(document.documentElement);
                const textColor = documentStyle.getPropertyValue('--text-color') || '#000';
                const surfaceBorder = documentStyle.getPropertyValue('--surface-border') || '#ccc';

                // Definir colores para cada género
                const backgroundColors = [
                    documentStyle.getPropertyValue('--blue-500') || 'rgba(59, 130, 246, 0.6)', // Masculino
                    documentStyle.getPropertyValue('--pink-500') || 'rgba(236, 72, 153, 0.6)', // Femenino
                    documentStyle.getPropertyValue('--green-500') || 'rgba(34, 197, 94, 0.6)',  // Otro
                    // Añade más colores si es necesario
                ];

                const hoverBackgroundColors = backgroundColors.map(color => color.replace('0.6', '0.8'));

                setChartData({
                    labels,
                    datasets: [
                        {
                            data: counts,
                            backgroundColor: backgroundColors,
                            hoverBackgroundColor: hoverBackgroundColors,
                        },
                    ],
                });

                setChartOptions({
                    plugins: {
                        legend: {
                            labels: {
                                color: textColor,
                                usePointStyle: true,
                            },
                        },
                    },
                });

                setLoading(false); // Datos cargados
            } catch (error) {
                console.error('Error al obtener los datos de Distribución de Genero:', error);
                setLoading(false); // Terminar carga aunque haya error
            }
        };

        fetchData();
    }, []);

    return (
        <div className="card flex justify-content-center">
            {loading ? (
                <SkeletonCard /> // Mostrar Skeleton mientras carga
            ) : (
                chartData.labels ? (
                    <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
                ) : (
                    <p>No hay datos disponibles</p>
                )
            )}
        </div>
    );
};

export default DistribucionGeneroDoughnutChart;
