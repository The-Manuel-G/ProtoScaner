// src/components/Reportes/TiposAmputacionComponent.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart'; // Componente de gráfico
import { getTiposAmputacion } from '../../services/ReporteService'; // Asegúrate de que esta ruta sea la correcta
import { TiposAmputacion } from '../../types/Reporte'; // Asumiendo que tienes este tipo ya definido

const TiposAmputacionComponent: React.FC = () => {
    const [tiposAmputacion, setTiposAmputacion] = useState<TiposAmputacion[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const toastRef = useRef<Toast>(null);

    // Función para obtener los tipos de amputación
    const fetchTiposAmputacion = async (generoId?: number, ladoAmputacionId?: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getTiposAmputacion(generoId, ladoAmputacionId);
            setTiposAmputacion(response.data);
        } catch (err) {
            console.error('Error al obtener los tipos de amputacion:', err);
            setError('Error al cargar los datos de tipos de amputación.');
            toastRef.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los datos de tipos de amputacion.', life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    // Cargar los datos al montar el componente
    useEffect(() => {
        fetchTiposAmputacion(); // Puedes pasar parámetros si quieres filtrar por género o lado de amputación
    }, []);

    // Datos para el gráfico de barras
    const chartData = {
        labels: tiposAmputacion.map((item) => `${item.TipoAmputacion} - ${item.LadoAmputacion}`), // Combinamos tipo y lado de amputación como etiqueta
        datasets: [
            {
                label: 'Cantidad de Pacientes',
                data: tiposAmputacion.map((item) => item.cantidad), // Cantidad de pacientes por tipo y lado
                backgroundColor: '#FF7043', // Color de las barras
                borderColor: '#D32F2F',
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
                text: 'Tipos de Amputacion por Genero y Lado',
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
                    text: 'Tipo y Lado de Amputacion',
                },
                ticks: {
                    maxRotation: 90,
                    minRotation: 45
                }
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
            <Button label="Recargar Datos" icon="pi pi-refresh" onClick={() => fetchTiposAmputacion()} className="mb-4" />

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

export default TiposAmputacionComponent;
