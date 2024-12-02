// src/Pages/Paciente/PacienteProfile.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paciente } from '@/types/Paciente';
import { HistorialPacienteIngreso } from '@/types/HistorialPacienteIngreso';
import { getPacienteById, deletePaciente } from '@/services/PacienteService';
import { motion } from 'framer-motion';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogFooter,
} from '@/components/ui/dialog';
import MiniMenu from '@/components/ui/MiniMenu';
import { Button } from '@/components/ui/button';
import {
    generos,
    tiposAmputacion,
    ladosAmputacion,
    provincias,
    causasAmputacion,
} from '@/constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CopySnippet from '@/components/ui/CopySnippet';
import StatusBoard from '@/components/StatusBoard';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
import { AiOutlineLeft, AiOutlineRight, AiOutlineUp, AiOutlineDown } from 'react-icons/ai';
import { Skeleton } from '@/components/ui/skeleton'; // Importar Skeleton de ShadCN/UI

// Utilidad para etiquetas
const getLabel = (
    array: { label: string; value: number }[],
    value: number
) => array.find((item) => item.value === value)?.label || 'Desconocido';

const PacienteProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [paciente, setPaciente] = useState<Paciente | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true); // Estado de carga

    useEffect(() => {
        const fetchPaciente = async () => {
            if (id) {
                try {
                    const pacienteData = await getPacienteById(Number(id));
                    setPaciente(pacienteData);
                    setLoading(false);
                } catch (error) {
                    console.error('Error al obtener el paciente:', error);
                    toast.error('\u00C9rror al obtener los datos del paciente.'); // 'Érror' con Unicode Escape
                    setLoading(false);
                }
            }
        };
        fetchPaciente();
    }, [id]);

    const handleDelete = async () => {
        if (paciente) {
            try {
                await deletePaciente(paciente.idPaciente);
                toast.success('Paciente eliminado con \u00E9xito.'); // 'éxito' con Unicode Escape
                setIsDeleteModalOpen(false);
                navigate('/');
            } catch (error) {
                console.error('Error al eliminar el paciente:', error);
                toast.error('Error al eliminar el paciente.');
            }
        }
    };

    const idEstatusPaciente = paciente?.idEstatusPaciente ?? 1;
    const idEstatusProtesis = paciente?.idEstatusProtesis ?? 1;

    const shouldShowProtesis = (): boolean => {
        return idEstatusPaciente >= 1 && idEstatusProtesis != null;
    };

    return (
        <>
            {/* Contenedor del MiniMenu con posicionamiento fijo */}
            <div className="fixed top-8 left-8 z-50"> {/* Ajusta 'top' y 'left' según necesites */}
                <MiniMenu />
            </div>

            {/* Contenedor principal con padding-top para evitar superposición con MiniMenu */}
            <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md mt-8 pt-20"> {/* Añadido 'pt-20' */}
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
                    {'Perfil del Paciente'}
                </h1>

                {/* Grupo de Paneles Redimensionables Horizontales */}
                <ResizablePanelGroup
                    direction="horizontal"
                    className="flex flex-col md:flex-row md:space-x-1 h-full"
                >
                    {/* Panel Izquierdo: Información del Paciente */}
                    <ResizablePanel defaultSize={35} minSize={30} maxSize={80}> {/* Ajuste de tamaño */}
                        <Card className="shadow-xl rounded-lg bg-white p-6 border border-gray-200 h-full">
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <motion.img
                                                src={
                                                    paciente && paciente.fotoPaciente
                                                        ? `data:image/jpeg;base64,${paciente.fotoPaciente}`
                                                        : undefined
                                                }
                                                alt="Foto del Paciente"
                                                className="w-24 h-24 rounded-full cursor-pointer border-4 border-blue-500 hover:shadow-lg"
                                                whileHover={{ scale: 1.05 }}
                                            />
                                        </DialogTrigger>
                                        <DialogContent className="max-w-md p-6 bg-white rounded-lg shadow-lg">
                                            {paciente && paciente.fotoPaciente ? (
                                                <img
                                                    src={`data:image/jpeg;base64,${paciente.fotoPaciente}`}
                                                    alt="Foto del Paciente Ampliada"
                                                    className="rounded-lg w-full h-auto"
                                                />
                                            ) : (
                                                <Skeleton className="h-64 w-full rounded-lg" />
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                    <div>
                                        <CardTitle className="text-2xl font-bold text-gray-700">
                                            {loading ? (
                                                <Skeleton className="h-8 w-48" />
                                            ) : (
                                                paciente?.nombreCompleto
                                            )}
                                        </CardTitle>
                                        <CardDescription className="text-gray-500 text-lg">
                                            {loading ? (
                                                <Skeleton className="h-5 w-32" />
                                            ) : (
                                                `Paciente ID: ${paciente?.idPaciente}`
                                            )}
                                        </CardDescription>
                                        <p className="text-gray-600 mt-2">
                                            <strong>{'C\u00E9dula:'}</strong>{' '}
                                            {loading ? (
                                                <Skeleton className="h-4 w-40" />
                                            ) : (
                                                paciente?.cedula
                                            )}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>{'G\u00E9nero:'}</strong>{' '}
                                            {loading ? (
                                                <Skeleton className="h-4 w-24" />
                                            ) : (
                                                getLabel(generos, paciente?.genero ?? 0)
                                            )}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>{'Fecha de Nacimiento:'}</strong>{' '}
                                            {loading ? (
                                                <Skeleton className="h-4 w-32" />
                                            ) : (
                                                paciente?.fechaNacimiento
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="mt-4">
                                <div className="space-y-4">
                                    <CopySnippet
                                        label={'Direcci\u00F3n'}
                                        value={loading ? '' : paciente?.direccion}
                                    />
                                    <CopySnippet
                                        label={'Tel\u00E9fono'}
                                        value={loading ? '' : paciente?.telefono}
                                    />
                                    <CopySnippet
                                        label={'Tel\u00E9fono Celular'}
                                        value={loading ? '' : paciente?.telefonoCelular}
                                    />
                                    <CopySnippet
                                        label={'Provincia'}
                                        value={
                                            loading
                                                ? ''
                                                : getLabel(provincias, paciente?.idProvincia ?? 0)
                                        }
                                    />
                                    <p className="text-gray-700">
                                        <strong>{'Sector:'}</strong>{' '}
                                        {loading ? <Skeleton className="h-4 w-24" /> : paciente?.sector}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>{'Incidencia:'}</strong>{' '}
                                        {loading ? (
                                            <Skeleton className="h-4 w-12" />
                                        ) : (
                                            paciente?.incidencia ? 'S\u00ED' : 'No'
                                        )}
                                    </p>
                                    <CopySnippet
                                        label={'Comentario'}
                                        value={loading ? '' : paciente?.comentario}
                                    />
                                </div>
                            </CardContent>

                            <div className="flex justify-end space-x-4 mt-4">
                                <Button
                                    variant="primary"
                                    onClick={() =>
                                        navigate(`/EditPaciente/${paciente?.idPaciente}`)
                                    }
                                    disabled={loading}
                                >
                                    {'Editar'}
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    disabled={loading}
                                >
                                    {'Eliminar'}
                                </Button>
                            </div>
                        </Card>
                    </ResizablePanel>

                    {/* Manejador de Redimensionamiento Horizontal con Íconos */}
                    <ResizableHandle className="flex items-center justify-center bg-gray-300 cursor-col-resize md:cursor-col-resize">
                        <AiOutlineLeft className="text-gray-500" />
                        <AiOutlineRight className="text-gray-500" />
                    </ResizableHandle>

                    {/* Panel Derecho: Historial y Estatus */}
                    <ResizablePanel defaultSize={50} minSize={20} maxSize={70}> {/* Ajuste de tamaño */}
                        {/* Grupo de Paneles Redimensionables Verticales */}
                        <ResizablePanelGroup
                            direction="vertical"
                            className="flex flex-col space-y-1 h-full"
                        >
                            {/* Panel Superior: Historial del Paciente */}
                            <ResizablePanel defaultSize={50} minSize={20} maxSize={60}> {/* Ajuste de tamaño */}
                                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 h-full overflow-auto">
                                    <h2 className="text-2xl font-semibold mb-4 text-blue-500">
                                        {'Historial del Paciente'}
                                    </h2>
                                    {loading ? (
                                        <ul className="space-y-4">
                                            {[...Array(3)].map((_, index) => (
                                                <li
                                                    key={index}
                                                    className="border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50"
                                                >
                                                    <Skeleton className="h-4 w-48 mb-2" />
                                                    <Skeleton className="h-4 w-32 mb-2" />
                                                    <Skeleton className="h-4 w-40 mb-2" />
                                                    <Skeleton className="h-4 w-36 mb-2" />
                                                    <Skeleton className="h-4 w-24 mb-2" />
                                                    <Skeleton className="h-4 w-60" />
                                                </li>
                                            ))}
                                        </ul>
                                    ) : paciente?.historialPacienteIngresos &&
                                        paciente.historialPacienteIngresos.length > 0 ? (
                                        <ul className="space-y-4">
                                            {paciente.historialPacienteIngresos.map(
                                                (historial: HistorialPacienteIngreso) => (
                                                    <li
                                                        key={historial.idHistorial}
                                                        className="border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50"
                                                    >
                                                        <p>
                                                            <strong>
                                                                {'Tipo de Amputaci\u00F3n:'}
                                                            </strong>{' '}
                                                            {getLabel(
                                                                tiposAmputacion,
                                                                historial.tipoAmputacion
                                                            )}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                {'Lado de Amputaci\u00F3n:'}
                                                            </strong>{' '}
                                                            {getLabel(
                                                                ladosAmputacion,
                                                                historial.ladoAmputacion
                                                            )}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                {'Fecha de Amputaci\u00F3n:'}
                                                            </strong>{' '}
                                                            {historial.fechaAmputacion}
                                                        </p>
                                                        <p>
                                                            <strong>{'Causa:'}</strong>{' '}
                                                            {getLabel(
                                                                causasAmputacion,
                                                                historial.causa
                                                            )}
                                                        </p>
                                                        <p>
                                                            <strong>{'Terapia:'}</strong>{' '}
                                                            {historial.terapia
                                                                ? 'S\u00ED'
                                                                : 'No'}
                                                        </p>
                                                        {historial.terapia && (
                                                            <p>
                                                                <strong>
                                                                    {'Tiempo de Terapia:'}
                                                                </strong>{' '}
                                                                {historial.tiempoTerapia}
                                                            </p>
                                                        )}
                                                        <p>
                                                            <strong>{'Comentario:'}</strong>{' '}
                                                            {historial.comentario}
                                                        </p>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-600">
                                            {'No hay historial de ingresos.'}
                                        </p>
                                    )}
                                </div>
                            </ResizablePanel>

                            {/* Manejador de Redimensionamiento Vertical con Íconos */}
                            <ResizableHandle className="flex items-center justify-center bg-gray-300 cursor-row-resize">
                                <AiOutlineUp className="text-gray-500" />
                                <AiOutlineDown className="text-gray-500" />
                            </ResizableHandle>

                            {/* Panel Inferior: Estatus del Paciente */}
                            <ResizablePanel defaultSize={60} minSize={40} maxSize={80}> {/* Ajuste de tamaño */}
                                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 h-full overflow-auto">
                                    <h2 className="text-lg font-semibold mb-4 text-green-600">
                                        {'Estatus del Paciente'}
                                    </h2>
                                    {loading ? (
                                        <div className="space-y-4">
                                            {[...Array(2)].map((_, index) => (
                                                <div key={index} className="space-y-2">
                                                    <Skeleton className="h-4 w-32" />
                                                    <Skeleton className="h-4 w-48" />
                                                    <Skeleton className="h-6 w-24" />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <StatusBoard pacienteId={paciente.idPaciente} />
                                    )}
                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </ResizablePanel>
                </ResizablePanelGroup>

                {/* Modal de Confirmación de Eliminación */}
                <Dialog
                    open={isDeleteModalOpen}
                    onOpenChange={setIsDeleteModalOpen}
                >
                    <DialogContent>
                        <h2 className="text-xl font-semibold text-center">
                            {'Confirmaci\u00F3n de Eliminaci\u00F3n'}
                        </h2>
                        <p className="text-center text-gray-600 mt-4">
                            {'\u00BFEst\u00E1s seguro de que deseas eliminar al paciente '}
                            <strong>{paciente?.nombreCompleto}</strong>
                            {'?'}
                        </p>
                        <DialogFooter className="flex justify-end space-x-2 mt-6">
                            <Button
                                variant="outline"
                                onClick={() => setIsDeleteModalOpen(false)}
                            >
                                {'Cancelar'}
                            </Button>
                            <Button variant="destructive" onClick={handleDelete}>
                                {'Confirmar'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Contenedor de Toasts */}
                <ToastContainer position="top-right" autoClose={5000} />
            </div>
        </>
    );

};

export default PacienteProfile;
