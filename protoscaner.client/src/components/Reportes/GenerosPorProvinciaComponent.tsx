// src/components/Reportes/GenerosPorProvinciaComponent.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart'; // Componente de gráfico
import { getGenerosPorProvincia } from '../../services/ReporteService'; // Asegúrate de que esta ruta sea la correcta
import { GenerosPorProvincia } from '../../types/Reporte'; // Asumiendo que tienes este tipo ya definido

const GenerosPorProvinciaComponent: React.FC = () => {
    const [generosPorProvincia, setGenerosPorProvincia] = useState<GenerosPorProvincia[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const toastRef = useRef<Toast>(null);

    // Función para obtener los géneros por provincia
    const fetchGenerosPorProvincia = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getGenerosPorProvincia();
            setGenerosPorProvincia(response.data);
        } catch (err) {
            console.error('Error al obtener géneros por provincia:', err);
            setError('Error al cargar los datos de géneros por provincia.');
            toastRef.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los datos de géneros por provincia.', life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    // Cargar los datos al montar el componente
    useEffect(() => {
        fetchGenerosPorProvincia();
    }, []);

    // Datos para el gráfico de barras
    const chartData = {
        labels: generosPorProvincia.map((provincia) => provincia.provincia), // Obtener las etiquetas de provincia
        datasets: [
            {
                label: 'Hombres',
                data: generosPorProvincia.map((provincia) => provincia.generos.hombres), // Obtener las cantidades de hombres
                backgroundColor: '#42A5F5', // Color de las barras de hombres
                borderColor: '#1E88E5',
                borderWidth: 1,
            },
            {
                label: 'Mujeres',
                data: generosPorProvincia.map((provincia) => provincia.generos.mujeres), // Obtener las cantidades de mujeres
                backgroundColor: '#FF7043', // Color de las barras de mujeres
                borderColor: '#FF5722',
                borderWidth: 1,
            }
        ]
    };

    // Opciones para el gráfico
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
                text: 'Distribución de Géneros por Provincia',
                font: {
                    size: 18,
                    weight: 'bold'
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Provincia',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Cantidad de Pacientes',
                },
                beginAtZero: true, // Asegura que el eje Y comience desde 0
            }
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg mt-8">
            {/* Toast para mostrar errores o mensajes */}
            <Toast ref={toastRef} />

            {/* Botón de recarga */}
            <Button label="Recargar Datos" icon="pi pi-refresh" onClick={fetchGenerosPorProvincia} className="mb-4" />

            {/* Mostrar gráfico o spinner mientras se carga */}
            {loading ? (
                <div className="flex justify-center">
                    <ProgressSpinner />
                </div>
            ) : error ? (
                <div className="p-4 text-center text-red-500">{error}</div>
            ) : (
                <Chart type="bar" data={chartData} options={chartOptions} />
            )}
        </div>
    );
};

export default GenerosPorProvinciaComponent;
