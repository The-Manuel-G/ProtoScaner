// src/components/StatusBoard.tsx

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import {
    getPacienteById,
    avanzarEstatusPaciente,
    retrocederEstatusPaciente,
    avanzarEstatusProtesis,
    retrocederEstatusProtesis
} from '../services/PacienteService';
import { Paciente } from '../types/Paciente';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft, FaArrowRight, FaUser, FaRobot } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'; // Importación actualizada
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface StatusBoardProps {
    pacienteId: number;
}

const StatusBoard: React.FC<StatusBoardProps> = ({ pacienteId }) => {
    const [paciente, setPaciente] = useState<Paciente | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Nombres de los estatus
    const estatusPacienteNames = [
        'Pendiente Definitivo',
        'Prueba',
        'Pendiente Definitivo Cita',
        'Completado',
        'Definitivo'
    ];

    const estatusProtesisNames = [
        'Pendiente Definitivo',
        'Pendiente Diseño',
        'Impreso',
        'Pendiente de Entrega',
        'Entregado'
    ];

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const data = await getPacienteById(pacienteId);
                setPaciente(data);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener el paciente:", error);
                toast.error('Error al obtener los datos del paciente.');
                setLoading(false);
            }
        };

        fetchPaciente();
    }, [pacienteId]);

    // Funciones para manejar avances y retrocesos
    const handleAvanzarPaciente = async () => {
        try {
            await avanzarEstatusPaciente(pacienteId);
            const updatedPaciente = await getPacienteById(pacienteId);
            setPaciente(updatedPaciente);
            toast.success('Estatus de paciente avanzado.');
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data || 'No se pudo avanzar el estatus de paciente.');
        }
    };

    const handleRetrocederPaciente = async () => {
        try {
            await retrocederEstatusPaciente(pacienteId);
            const updatedPaciente = await getPacienteById(pacienteId);
            setPaciente(updatedPaciente);
            toast.success('Estatus de paciente retrocedido.');
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data || 'No se pudo retroceder el estatus de paciente.');
        }
    };

    const handleAvanzarProtesis = async () => {
        try {
            await avanzarEstatusProtesis(pacienteId);
            const updatedPaciente = await getPacienteById(pacienteId);
            setPaciente(updatedPaciente);
            toast.success('Estatus de prótesis avanzado.');
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data || 'No se pudo avanzar el estatus de prótesis.');
        }
    };

    const handleRetrocederProtesis = async () => {
        try {
            await retrocederEstatusProtesis(pacienteId);
            const updatedPaciente = await getPacienteById(pacienteId);
            setPaciente(updatedPaciente);
            toast.success('Estatus de prótesis retrocedido.');
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data || 'No se pudo retroceder el estatus de prótesis.');
        }
    };

    // Función para manejar arrastrar y soltar
    const onDragEnd = async (result: DropResult) => {
        const { destination, draggableId } = result;

        if (!destination) return;

        // Determinar si se está moviendo estatus de paciente o prótesis
        const [tipo, id] = draggableId.split('-');

        if (tipo === 'paciente') {
            const newIndex = destination.index + 1; // Los estatus comienzan en 1
            const currentIndex = paciente?.idEstatusPaciente || 1;

            if (newIndex > currentIndex) {
                await handleAvanzarPaciente();
            } else if (newIndex < currentIndex) {
                await handleRetrocederPaciente();
            }
        } else if (tipo === 'protesis') {
            const newIndex = destination.index + 1;
            const currentIndex = paciente?.idEstatusProtesis || 1;

            if (newIndex > currentIndex) {
                await handleAvanzarProtesis();
            } else if (newIndex < currentIndex) {
                await handleRetrocederProtesis();
            }
        }
    };

    // Funciones para obtener los nombres de los estatus
    const getEstatusPacienteName = (id: number): string => {
        return estatusPacienteNames[id - 1] || 'Desconocido';
    };

    const getEstatusProtesisName = (id: number): string => {
        return estatusProtesisNames[id - 1] || 'Desconocido';
    };

    // Determinar si la prótesis debe estar visible
    const shouldShowProtesis = (): boolean => {
        if (!paciente?.idEstatusPaciente) return false;
        // La prótesis se muestra solo si el estatus del paciente es 'Prueba' o superior
        return paciente.idEstatusPaciente >= 2;
    };

    // Colores para los estatus
    const estatusPacienteColors = [
        'bg-yellow-200',
        'bg-blue-200',
        'bg-yellow-200',
        'bg-green-200',
        'bg-blue-500'
    ];

    const estatusProtesisColors = [
        'bg-yellow-200',
        'bg-pink-200',
        'bg-purple-200',
        'bg-orange-200',
        'bg-green-500'
    ];

    // Configuración de animaciones para las barras de progreso
    const progressVariants = {
        hidden: { width: 0 },
        visible: (width: number) => ({ width: `${width}%` }),
    };

    // Configuración de animaciones para los iconos
    const iconVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1 },
    };

    // Renderizado del Skeleton Loader
    if (loading) {
        return (
            <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-8">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Dashboard de Estatus</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Skeleton para Estatus del Paciente */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <Skeleton circle height={24} width={24} />
                                <Skeleton height={20} width={150} />
                            </div>
                            <div className="flex space-x-2">
                                <Skeleton height={30} width={30} />
                                <Skeleton height={30} width={30} />
                            </div>
                        </div>
                        <Skeleton height={10} width={`100%`} />
                    </div>

                    {/* Skeleton para Estatus de la Prótesis */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <Skeleton circle height={24} width={24} />
                                <Skeleton height={20} width={150} />
                            </div>
                            <div className="flex space-x-2">
                                <Skeleton height={30} width={30} />
                                <Skeleton height={30} width={30} />
                            </div>
                        </div>
                        <Skeleton height={10} width={`100%`} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Dashboard de Estatus</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Estatus del Paciente */}
                    <Droppable droppableId="droppable-paciente">
                        {(provided) => (
                            <div
                                className="bg-white p-6 rounded-lg shadow"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <h3 className="text-xl font-semibold mb-4 text-blue-700 flex items-center">
                                    <FaUser className="mr-2 text-blue-500" />
                                    Estatus del Paciente
                                </h3>
                                <Draggable draggableId={`paciente-${paciente.idPaciente}`} index={paciente.idEstatusPaciente - 1}>
                                    {(provided) => (
                                        <div
                                            className="flex items-center justify-between mb-4 cursor-pointer"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <span className="text-gray-700">{getEstatusPacienteName(paciente.idEstatusPaciente)}</span>
                                            <div className="flex space-x-2">
                                                <Button
                                                    onClick={handleRetrocederPaciente}
                                                    disabled={paciente.idEstatusPaciente === 1}
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <FaArrowLeft />
                                                </Button>
                                                <Button
                                                    onClick={handleAvanzarPaciente}
                                                    disabled={paciente.idEstatusPaciente === estatusPacienteNames.length}
                                                    variant="primary"
                                                    size="sm"
                                                >
                                                    <FaArrowRight />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                                {/* Barra de Progreso */}
                                <motion.div
                                    className={`w-full rounded-full h-4 relative ${estatusPacienteColors[paciente.idEstatusPaciente - 1]}`}
                                    variants={progressVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={(paciente.idEstatusPaciente / estatusPacienteNames.length) * 100}
                                    transition={{ duration: 0.5 }}
                                >
                                    <motion.div
                                        className="absolute top-0 left-0 flex items-center justify-center h-4 w-4 bg-white rounded-full"
                                        variants={iconVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.5, duration: 0.3 }}
                                    >
                                        {/* Icono representativo */}
                                        <FaUser className="text-blue-700" />
                                    </motion.div>
                                </motion.div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    {/* Estatus de la Prótesis */}
                    {shouldShowProtesis() && (
                        <Droppable droppableId="droppable-protesis">
                            {(provided) => (
                                <div
                                    className="bg-white p-6 rounded-lg shadow"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h3 className="text-xl font-semibold mb-4 text-green-700 flex items-center">
                                        <FaRobot className="mr-2 text-green-500" />
                                        Estatus de la Prótesis
                                    </h3>
                                    <Draggable draggableId={`protesis-${paciente.idPaciente}`} index={paciente.idEstatusProtesis - 1}>
                                        {(provided) => (
                                            <div
                                                className="flex items-center justify-between mb-4 cursor-pointer"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <span className="text-gray-700">{getEstatusProtesisName(paciente.idEstatusProtesis)}</span>
                                                <div className="flex space-x-2">
                                                    <Button
                                                        onClick={handleRetrocederProtesis}
                                                        disabled={paciente.idEstatusProtesis === 1}
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <FaArrowLeft />
                                                    </Button>
                                                    <Button
                                                        onClick={handleAvanzarProtesis}
                                                        disabled={paciente.idEstatusProtesis === estatusProtesisNames.length}
                                                        variant="primary"
                                                        size="sm"
                                                    >
                                                        <FaArrowRight />
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                    {/* Barra de Progreso */}
                                    <motion.div
                                        className={`w-full rounded-full h-4 relative ${estatusProtesisColors[paciente.idEstatusProtesis - 1]}`}
                                        variants={progressVariants}
                                        initial="hidden"
                                        animate="visible"
                                        custom={(paciente.idEstatusProtesis / estatusProtesisNames.length) * 100}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <motion.div
                                            className="absolute top-0 left-0 flex items-center justify-center h-4 w-4 bg-white rounded-full"
                                            variants={iconVariants}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ delay: 0.5, duration: 0.3 }}
                                        >
                                            {/* Icono representativo */}
                                            <FaRobot className="text-green-700" />
                                        </motion.div>
                                    </motion.div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    )}
                </div>
            </DragDropContext>

            {/* Notificaciones */}
            <toast.Container position="top-right" autoClose={5000} />
        </div>
    );

    export default StatusBoard;
}
