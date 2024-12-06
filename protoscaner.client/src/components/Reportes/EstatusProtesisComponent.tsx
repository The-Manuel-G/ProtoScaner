// src/components/Reportes/EstatusProtesisComponent.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart'; // Componente de gráfico
import { getPacientesPorEstatusProtesis } from '../../services/ReporteService'; // Asegúrate de que esta ruta sea la correcta
import { PacientesPorEstatusProtesis } from '../../types/Reporte'; // Asumiendo que tienes este tipo ya definido

const EstatusProtesisComponent: React.FC = () => {
    const [estatusProtesis, setEstatusProtesis] = useState<PacientesPorEstatusProtesis[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const toastRef = useRef<Toast>(null);

    // Función para obtener el estatus de prótesis
    const fetchEstatusProtesis = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getPacientesPorEstatusProtesis();
            setEstatusProtesis(response.data);
        } catch (err) {
            console.error('Error al obtener estatus de prótesis:', err);
            setError('Error al cargar los datos de estatus de prótesis.');
            toastRef.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los datos de estatus de prótesis.', life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    // Cargar los datos al montar el componente
    useEffect(() => {
        fetchEstatusProtesis();
    }, []);

    // Datos para el gráfico
    const chartData = {
        labels: estatusProtesis.map((estatus) => estatus.estatus), // Obtener las etiquetas de estatus
        datasets: [
            {
                data: estatusProtesis.map((estatus) => estatus.cantidad), // Obtener las cantidades
                backgroundColor: [
                    'rgba(99, 102, 241, 0.6)', // Color 1
                    'rgba(34, 211, 238, 0.6)', // Color 2
                    'rgba(16, 185, 129, 0.6)', // Color 3
                    'rgba(255, 159, 64, 0.6)', // Color 4
                    'rgba(237, 100, 121, 0.6)', // Color 5
                    'rgba(249, 115, 22, 0.6)'  // Color 6
                ], // Colores diferentes para cada estatus
                hoverBackgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(34, 211, 238, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(237, 100, 121, 0.8)',
                    'rgba(249, 115, 22, 0.8)'
                ],
                borderColor: '#fff',
                borderWidth: 2,
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
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const value = context.raw || 0;
                        return `${context.label}: ${value} pacientes`; // Mostrar la cantidad de pacientes
                    }
                }
            },
            title: {
                display: true,
                text: 'Distribución de Pacientes por Estatus de Prótesis',
                font: {
                    size: 18,
                    weight: 'bold'
                }
            }
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg mt-8">
            {/* Toast para mostrar errores o mensajes */}
            <Toast ref={toastRef} />

            {/* Botón de recarga */}
            <Button label="Recargar Datos" icon="pi pi-refresh" onClick={fetchEstatusProtesis} className="mb-4" />

            {/* Cargando los datos si están en proceso */}
            {loading && (
                <div className="flex justify-center mt-6">
                    <ProgressSpinner />
                </div>
            )}

            {/* Mostrar gráfico solo cuando los datos estén cargados */}
            {!loading && !error && estatusProtesis.length > 0 && (
                <Chart type="pie" data={chartData} options={chartOptions} />
            )}

            {/* Mostrar mensaje de error si no se pueden cargar los datos */}
            {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
    );
};

export default EstatusProtesisComponent;
