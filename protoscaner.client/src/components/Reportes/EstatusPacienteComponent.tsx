// src/components/Reportes/EstatusPaciente.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart'; // Componente de gráfico
import { getEstatusPacientes } from '../../services/ReporteService'; // Asegúrate de que esta ruta sea la correcta
import { EstatusPaciente } from '../../types/Reporte'; // Asumiendo que tienes este tipo ya definido

const EstatusPacienteComponent: React.FC = () => {
    const [estatusPacientes, setEstatusPacientes] = useState<EstatusPaciente[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const toastRef = useRef<Toast>(null);

    // Función para obtener estatus de pacientes
    const fetchEstatusPacientes = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getEstatusPacientes();
            setEstatusPacientes(response.data);
        } catch (err) {
            console.error('Error al obtener estatus de pacientes:', err);
            setError('Error al cargar los datos de estatus de pacientes.');
            toastRef.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los datos de estatus.', life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    // Cargar los datos al montar el componente
    useEffect(() => {
        fetchEstatusPacientes();
    }, []);

    // Formatear los datos para el gráfico
    const chartData = {
        labels: estatusPacientes.map((estatus) => estatus.nombre),
        datasets: [
            {
                data: estatusPacientes.map((estatus) => estatus.cantidad),
                backgroundColor: [
                    'rgba(99, 102, 241, 0.6)',
                    'rgba(34, 211, 238, 0.6)',
                    'rgba(16, 185, 129, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(237, 100, 121, 0.6)',
                    'rgba(249, 115, 22, 0.6)'
                ], // Colores para cada sección del gráfico
                hoverBackgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(34, 211, 238, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(237, 100, 121, 0.8)',
                    'rgba(249, 115, 22, 0.8)'
                ], // Colores al pasar el mouse
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
                        return `${context.label}: ${context.raw} pacientes`;
                    }
                }
            },
            title: {
                display: true,
                text: 'Distribución de Estatus de Pacientes',
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
            <Button label="Recargar Datos" icon="pi pi-refresh" onClick={fetchEstatusPacientes} className="p-button-success mb-4" />

            {/* Si está cargando, mostrar spinner */}
            {loading ? (
                <div className="flex justify-center">
                    <ProgressSpinner />
                </div>
            ) : (
                <div className="card">
                    {/* Gráfico de tipo Doughnut */}
                    <Chart type="doughnut" data={chartData} options={chartOptions} />
                </div>
            )}

            {/* Mostrar mensaje de error si ocurre */}
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
};

export default EstatusPacienteComponent;
