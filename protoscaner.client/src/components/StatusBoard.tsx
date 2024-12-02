// src/components/StatusBoard.tsx

import React, { useEffect, useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import {
    FaArrowLeft,
    FaArrowRight,
    FaCheck,
    FaHourglassHalf,
    FaPrint,
    FaTrash,
    FaCalendarPlus,
    FaPencilRuler,
    FaStar,
    FaRuler,
    FaVial,
    FaWheelchair,
} from 'react-icons/fa';
import { GiRobotLeg } from 'react-icons/gi';
import {
    getPacienteById,
    avanzarEstatusPaciente,
    retrocederEstatusPaciente,
    avanzarEstatusProtesis,
    retrocederEstatusProtesis,
} from '@/services/PacienteService';
import { Paciente } from '@/types/Paciente';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Eliminar las siguientes líneas ya que no se utilizarán
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton'; // Importar Skeleton de ShadCN/UI
import './StatusBoard.css'; // Asegúrate de tener este archivo CSS para estilos adicionales

interface StatusBoardProps {
    pacienteId: number;
}

const StatusBoard: React.FC<StatusBoardProps> = ({ pacienteId }) => {
    const [paciente, setPaciente] = useState<Paciente | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false); // Estado para detectar pantalla pequeña

    const estatusPacienteNames = [
        'Medidas y Escaneo',         // ID 1
        'Pendiente de Prueba',       // ID 2
        'Prueba',                    // ID 3
        'Pendiente Definitivo Cita', // ID 4
        'Pendiente Definitivo',      // ID 5
        'Completado',                // ID 6
    ];

    const estatusProtesisNames = [
        'Pendiente Dise\u00F1o 1',   // ID 1
        'Impreso 1',                 // ID 2
        'Pendiente Dise\u00F1o 2',   // ID 3
        'Impreso 2',                 // ID 4
        'Entregado',                 // ID 5
        'Descartado',                // ID 6
    ];

    const estatusPacienteColors = [
        'from-gray-400 to-gray-200',     // Medidas y Escaneo
        'from-blue-600 to-blue-400',     // Pendiente de Prueba
        'from-green-400 to-green-200',   // Prueba
        'from-yellow-500 to-yellow-300', // Pendiente Definitivo Cita
        'from-orange-400 to-orange-200', // Pendiente Definitivo
        'from-purple-600 to-purple-400', // Completado
    ];

    const estatusProtesisColors = [
        'from-yellow-400 to-yellow-200', // Pendiente Dise\u00F1o 1
        'from-pink-400 to-pink-200',     // Impreso 1
        'from-blue-400 to-blue-200',     // Pendiente Dise\u00F1o 2
        'from-green-400 to-green-200',   // Impreso 2
        'from-purple-600 to-purple-400', // Entregado
        'from-red-600 to-red-400',       // Descartado
    ];

    const estatusPacienteIcons = [
        <FaRuler />,           // Medidas y Escaneo
        <FaHourglassHalf />,   // Pendiente de Prueba
        <FaVial />,            // Prueba
        <FaCalendarPlus />,    // Pendiente Definitivo Cita
        <FaHourglassHalf />,   // Pendiente Definitivo
        <FaStar />,            // Completado
    ];

    const estatusProtesisIcons = [
        <FaPencilRuler />, // Pendiente Dise\u00F1o 1
        <FaPrint />,       // Impreso 1
        <FaPencilRuler />, // Pendiente Dise\u00F1o 2
        <FaPrint />,       // Impreso 2
        <FaCheck />,       // Entregado
        <FaTrash />,       // Descartado
    ];

    // Refs para auto-scroll
    const pacienteRefs = useRef<(HTMLDivElement | null)[]>([]);
    const protesisRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Inicializar refs una sola vez
    useEffect(() => {
        pacienteRefs.current = estatusPacienteNames.map(() => null);
        protesisRefs.current = estatusProtesisNames.map(() => null);
    }, [estatusPacienteNames.length, estatusProtesisNames.length]);

    // Detectar tamaño de pantalla para scroll responsivo
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1024); // Breakpoint en 1024px
        };

        handleResize(); // Establecer valor inicial

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Obtener datos del paciente
    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const data = await getPacienteById(pacienteId);
                if (!data.idEstatusPaciente) {
                    data.idEstatusPaciente = 1;
                }
                if (!data.idEstatusProtesis) {
                    data.idEstatusProtesis = 1; // Por defecto en Pendiente Dise\u00F1o 1
                }
                setPaciente(data);
                setLoading(false);
            } catch (error) {
                toast.error('\u00C9rror al obtener los datos del paciente.'); // 'Érror' con Unicode Escape
                setLoading(false);
            }
        };

        fetchPaciente();
    }, [pacienteId]);

    const idEstatusPaciente = paciente?.idEstatusPaciente ?? 1;
    const idEstatusProtesis = paciente?.idEstatusProtesis ?? 1;

    // Manejar movimiento de estatus
    const handleMove = async (destinationIndex: number, type: 'paciente' | 'protesis') => {
        try {
            if (type === 'paciente') {
                if (destinationIndex + 1 > idEstatusPaciente) {
                    await avanzarEstatusPaciente(pacienteId);
                } else if (destinationIndex + 1 < idEstatusPaciente) {
                    await retrocederEstatusPaciente(pacienteId);
                }
            } else if (type === 'protesis') {
                if (destinationIndex + 1 > idEstatusProtesis) {
                    await avanzarEstatusProtesis(pacienteId);
                } else if (destinationIndex + 1 < idEstatusProtesis) {
                    await retrocederEstatusProtesis(pacienteId);
                }
            }
            const updatedPaciente = await getPacienteById(pacienteId);
            setPaciente(updatedPaciente);

            // Mostrar toast solo si el nuevo estatus es 'Completado' o 'Entregado'
            if (
                (type === 'paciente' && updatedPaciente.idEstatusPaciente === 6) ||
                (type === 'protesis' && updatedPaciente.idEstatusProtesis === 5)
            ) {
                const message =
                    type === 'paciente'
                        ? 'Estatus de paciente completado.' // Sin Unicode Escape
                        : 'Estatus de pr\u00F3tesis entregado.'; // 'Prótesis' con Unicode Escape
                toast.success(message);
            }

        } catch {
            toast.error('\u00DAltimo se pudo actualizar el \u00E9status.'); // 'Último' y 'éstatus' con Unicode Escapes
        }
    };

    // Manejar fin de drag-and-drop
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination, draggableId } = result;
        const [type, sourceIndexStr] = draggableId.split('-');
        const sourceIndex = parseInt(sourceIndexStr, 10);
        const [destType, destIndexStr] = destination.droppableId.split('-');
        const destinationIndex = parseInt(destIndexStr, 10);

        if (type === destType) {
            handleMove(destinationIndex, type as 'paciente' | 'protesis');
        }
    };

    // Manejar avanzar estatus del paciente
    const handleAvanzarPaciente = async () => {
        try {
            await avanzarEstatusPaciente(pacienteId);
            const updatedPaciente = await getPacienteById(pacienteId);
            setPaciente(updatedPaciente);
            // Mostrar toast solo si el nuevo estatus es 'Completado'
            if (updatedPaciente.idEstatusPaciente === 6) { // 'Completado'
                toast.success('Estatus de paciente completado.'); // Sin Unicode Escape
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data || '\u00DAltimo se pudo avanzar el \u00E9status de paciente.'); // 'Último' y 'éstatus' con Unicode Escapes
        }
    };

    // Manejar retroceder estatus del paciente
    const handleRetrocederPaciente = async () => {
        try {
            await retrocederEstatusPaciente(pacienteId);
            const updatedPaciente = await getPacienteById(pacienteId);
            setPaciente(updatedPaciente);
            // Mostrar toast solo si el nuevo estatus es 'Completado'
            if (updatedPaciente.idEstatusPaciente === 6) { // 'Completado'
                toast.success('Estatus de paciente completado.'); // Sin Unicode Escape
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data || '\u00DAltimo se pudo retroceder el \u00E9status de paciente.'); // 'Último' y 'éstatus' con Unicode Escapes
        }
    };

    // Manejar avanzar estatus de la prótesis
    const handleAvanzarProtesis = async () => {
        try {
            await avanzarEstatusProtesis(pacienteId);
            const updatedPaciente = await getPacienteById(pacienteId);
            setPaciente(updatedPaciente);
            // Mostrar toast solo si el nuevo estatus es 'Entregado'
            if (updatedPaciente.idEstatusProtesis === 5) { // 'Entregado'
                toast.success('Estatus de pr\u00F3tesis entregado.'); // 'Prótesis' con Unicode Escape
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data || 'No se pudo avanzar el estatus de pr\u00F3tesis.'); // 'Prótesis' con Unicode Escape
        }
    };

    // Manejar retroceder estatus de la prótesis
    const handleRetrocederProtesis = async () => {
        try {
            await retrocederEstatusProtesis(pacienteId);
            const updatedPaciente = await getPacienteById(pacienteId);
            setPaciente(updatedPaciente);
            // Mostrar toast solo si el nuevo estatus es 'Entregado'
            if (updatedPaciente.idEstatusProtesis === 5) { // 'Entregado'
                toast.success('Estatus de pr\u00F3tesis entregado.'); // 'Prótesis' con Unicode Escape
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data || 'No se pudo retroceder el estatus de pr\u00F3tesis.'); // 'Prótesis' con Unicode Escape
        }
    };

    const shouldShowProtesis = (): boolean => {
        return idEstatusPaciente >= 1 && idEstatusProtesis != null;
    };

    // Auto-scroll cuando cambia el estatus, solo en pantallas pequeñas
    useEffect(() => {
        if (paciente && isSmallScreen) { // Aplicar scroll solo si es pantalla pequeña
            // Scroll para estatus de paciente hacia abajo
            const currentPacienteIndex = idEstatusPaciente - 1;
            const pacienteRef = pacienteRefs.current[currentPacienteIndex];
            if (pacienteRef) {
                pacienteRef.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }

            // Scroll para estatus de prótesis hacia arriba
            if (shouldShowProtesis()) {
                const currentProtesisIndex = idEstatusProtesis - 1;
                const protesisRef = protesisRefs.current[currentProtesisIndex];
                if (protesisRef) {
                    protesisRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
    }, [idEstatusPaciente, idEstatusProtesis, paciente, isSmallScreen]);

    if (loading) {
        return (
            <div className="p-4 bg-white rounded-lg shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-center text-blue-600">
                    {'Dashboard de Estatus'}
                </h2>
                <div className="space-y-4">
                    {/* Skeleton para Estatus del Paciente */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-5 w-[150px]" />
                        </div>
                        <Skeleton className="h-2 w-full" />
                    </div>

                    {/* Skeleton para Estatus de la Prótesis */}
                    {shouldShowProtesis() && (
                        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <Skeleton className="h-6 w-6 rounded-full" />
                                <Skeleton className="h-5 w-[150px]" />
                            </div>
                            <Skeleton className="h-2 w-full" />
                        </div>
                    )}
                </div>
                {/* Contenedor de Notificaciones mientras carga */}
                <ToastContainer position="top-right" autoClose={5000} />
            </div>
        );
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-xl">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="space-y-8">
                    {/* Estatus del Paciente */}
                    <div>
                        <h3 className="text-lg font-semibold flex items-center justify-center">
                            <FaWheelchair className="mr-2 text-blue-500" />
                            {'Estatus del Paciente'}
                        </h3>
                        <div className="flex space-x-2 flex-wrap justify-center mt-4">
                            {estatusPacienteNames.map((estatus, index) => (
                                <Droppable key={`paciente-${index}`} droppableId={`paciente-${index}`}>
                                    {(providedDroppable) => (
                                        <div
                                            ref={(el) => {
                                                providedDroppable.innerRef(el);
                                                pacienteRefs.current[index] = el;
                                            }}
                                            {...providedDroppable.droppableProps}
                                            className={`status-card ${idEstatusPaciente === index + 1
                                                    ? `active bg-gradient-to-r ${estatusPacienteColors[index]}`
                                                    : 'inactive bg-gray-100'
                                                }`}
                                        >
                                            {/* Encabezado del Estatus */}
                                            <span className="status-title">
                                                {estatus}
                                            </span>
                                            {/* Icono Draggable si es el estatus actual */}
                                            {idEstatusPaciente === index + 1 && (
                                                <Draggable draggableId={`paciente-${index}`} index={index}>
                                                    {(providedDraggable, snapshot) => (
                                                        <div
                                                            ref={providedDraggable.innerRef}
                                                            {...providedDraggable.draggableProps}
                                                            {...providedDraggable.dragHandleProps}
                                                            className={`icon-container ${snapshot.isDragging ? 'dragging' : ''
                                                                }`}
                                                        >
                                                            {/* Ícono blanco para mejor visibilidad */}
                                                            <FaWheelchair
                                                                size={24}
                                                                className="icon-animation text-white"
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )}
                                            {providedDroppable.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            ))}
                        </div>
                        {/* Botones de Control Fuera de los Status */}
                        <div className="flex justify-center space-x-4 mt-4">
                            <Button
                                onClick={handleRetrocederPaciente}
                                disabled={idEstatusPaciente === 1}
                                variant="outline"
                                size="sm"
                            >
                                <FaArrowLeft />
                            </Button>
                            <Button
                                onClick={handleAvanzarPaciente}
                                disabled={idEstatusPaciente === estatusPacienteNames.length}
                                variant="primary"
                                size="sm"
                            >
                                <FaArrowRight />
                            </Button>
                        </div>
                        {/* Barra de Progreso con Iconos */}
                        <div className="relative mt-8">
                            <div className="absolute w-full h-3 bg-gray-300 rounded-full top-1/2 transform -translate-y-1/2"></div>
                            <div className="flex justify-between items-center">
                                {estatusPacienteNames.map((estatus, index) => (
                                    <div key={index} className="relative w-1/6 text-center">
                                        {/* Línea activa */}
                                        {index < idEstatusPaciente && (
                                            <div
                                                className={`absolute h-3 bg-gradient-to-r ${estatusPacienteColors[index]} rounded-full top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-in-out`}
                                                style={{ left: 0, right: '0%' }}
                                            ></div>
                                        )}
                                        {/* Punto con Icono */}
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${index < idEstatusPaciente
                                                    ? `bg-gradient-to-r ${estatusPacienteColors[index]} text-white animate-pulse`
                                                    : 'bg-gray-200 text-gray-500'
                                                }`}
                                        >
                                            {index < idEstatusPaciente ? (
                                                // Ícono blanco sobre fondo coloreado
                                                <span className="text-white">
                                                    {estatusPacienteIcons[index]}
                                                </span>
                                            ) : (
                                                // Ícono gris sobre fondo gris
                                                <span className="text-gray-500">
                                                    {estatusPacienteIcons[index]}
                                                </span>
                                            )}
                                        </div>
                                        {/* Etiqueta del Estatus */}
                                        <div className="text-xs mt-2 w-24 mx-auto">
                                            {estatus}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Estatus de la Prótesis */}
                    {shouldShowProtesis() && (
                        <div>
                            <h3 className="text-lg font-semibold flex items-center justify-center">
                                <GiRobotLeg className="mr-2 text-green-500" />
                                {'Estatus de la Pr\u00F3tesis'} {/* 'Prótesis' reemplaza 'Prótesis' */}
                            </h3>
                            <div className="flex space-x-2 flex-wrap justify-center mt-4">
                                {estatusProtesisNames.map((estatus, index) => (
                                    <Droppable key={`protesis-${index}`} droppableId={`protesis-${index}`}>
                                        {(providedDroppable) => (
                                            <div
                                                ref={(el) => {
                                                    providedDroppable.innerRef(el);
                                                    protesisRefs.current[index] = el;
                                                }}
                                                {...providedDroppable.droppableProps}
                                                className={`status-card ${idEstatusProtesis === index + 1
                                                        ? `active bg-gradient-to-r ${estatusProtesisColors[index]}`
                                                        : 'inactive bg-gray-100'
                                                    }`}
                                            >
                                                {/* Encabezado del Estatus */}
                                                <span className="status-title">
                                                    {estatus}
                                                </span>
                                                {/* Icono Draggable si es el estatus actual */}
                                                {idEstatusProtesis === index + 1 && (
                                                    <Draggable draggableId={`protesis-${index}`} index={index}>
                                                        {(providedDraggable, snapshot) => (
                                                            <div
                                                                ref={providedDraggable.innerRef}
                                                                {...providedDraggable.draggableProps}
                                                                {...providedDraggable.dragHandleProps}
                                                                className={`icon-container ${snapshot.isDragging ? 'dragging' : ''
                                                                    }`}
                                                            >
                                                                {/* Ícono blanco para mejor visibilidad */}
                                                                <GiRobotLeg
                                                                    size={24}
                                                                    className="icon-animation text-white"
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )}
                                                {providedDroppable.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                ))}
                            </div>
                            {/* Botones de Control Fuera de los Status */}
                            <div className="flex justify-center space-x-4 mt-4">
                                <Button
                                    onClick={handleRetrocederProtesis}
                                    disabled={idEstatusProtesis === 1}
                                    variant="outline"
                                    size="sm"
                                >
                                    <FaArrowLeft />
                                </Button>
                                <Button
                                    onClick={handleAvanzarProtesis}
                                    disabled={idEstatusProtesis === estatusProtesisNames.length}
                                    variant="primary"
                                    size="sm"
                                >
                                    <FaArrowRight />
                                </Button>
                            </div>
                            {/* Barra de Progreso con Iconos */}
                            <div className="relative mt-8">
                                <div className="absolute w-full h-3 bg-gray-300 rounded-full top-1/2 transform -translate-y-1/2"></div>
                                <div className="flex justify-between items-center">
                                    {estatusProtesisNames.map((estatus, index) => (
                                        <div key={index} className="relative w-1/6 text-center">
                                            {/* Línea activa */}
                                            {index < idEstatusProtesis && (
                                                <div
                                                    className={`absolute h-3 bg-gradient-to-r ${estatusProtesisColors[index]} rounded-full top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-in-out`}
                                                    style={{ left: 0, right: '0%' }}
                                                ></div>
                                            )}
                                            {/* Punto con Icono */}
                                            <div
                                                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${index < idEstatusProtesis
                                                        ? `bg-gradient-to-r ${estatusProtesisColors[index]} text-white animate-pulse`
                                                        : 'bg-gray-200 text-gray-500'
                                                    }`}
                                            >
                                                {estatusProtesisIcons[index]}
                                            </div>
                                            {/* Etiqueta del Estatus */}
                                            <div className="text-xs mt-2 w-24 mx-auto">
                                                {estatus}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DragDropContext>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );

};

export default StatusBoard;
