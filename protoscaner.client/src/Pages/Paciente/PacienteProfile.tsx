// src/Pages/Paciente/PacienteProfile.tsx 

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paciente } from '@/types/Paciente';
import { HistorialPacienteIngreso } from '@/types/HistorialPacienteIngreso';
import { getPacienteById, deletePaciente } from '@/services/PacienteService';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from '@/components/ui/dialog';
import MiniMenu from '@/components/ui/MiniMenu';
import { Button } from '@/components/ui/button';
import { generos, tiposAmputacion, ladosAmputacion, provincias, causasAmputacion } from '@/constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CopySnippet from '@/components/ui/CopySnippet';
import StatusBoard from '@/components/StatusBoard';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Utility for labels
const getLabel = (array: { label: string; value: number }[], value: number) =>
    array.find(item => item.value === value)?.label || 'Desconocido';

const PacienteProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [paciente, setPaciente] = useState<Paciente | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPaciente = async () => {
            if (id) {
                try {
                    const pacienteData = await getPacienteById(Number(id));
                    setPaciente(pacienteData);
                } catch (error) {
                    console.error("Error al obtener el paciente:", error);
                    toast.error('Error al obtener los datos del paciente.');
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchPaciente();
    }, [id]);

    const handleDelete = async () => {
        if (paciente) {
            try {
                await deletePaciente(paciente.idPaciente);
                toast.success('Paciente eliminado con \u00E9xito.');
                setIsDeleteModalOpen(false);
                navigate('/');
            } catch (error) {
                console.error("Error al eliminar el paciente:", error);
                toast.error('Error al eliminar el paciente.');
            }
        }
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md mt-8 overflow-y-auto max-h-screen">
            <MiniMenu />
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Perfil del Paciente</h1>

            {isLoading ? (
                // Esqueletos de carga mientras se obtienen los datos
                <div className="flex flex-col lg:flex-row lg:space-x-6">
                    <div className="flex-[0.4]">
                        <Card className="shadow-xl rounded-lg bg-white p-6 border border-gray-200">
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <Skeleton circle height={96} width={96} />
                                    <div className="flex-1">
                                        <Skeleton height={24} width={`80%`} />
                                        <Skeleton height={18} width={`60%`} style={{ marginTop: '0.5rem' }} />
                                        <Skeleton height={18} width={`40%`} style={{ marginTop: '0.5rem' }} />
                                        <Skeleton height={18} width={`50%`} style={{ marginTop: '0.5rem' }} />
                                        <Skeleton height={18} width={`70%`} style={{ marginTop: '0.5rem' }} />
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="mt-4 space-y-4">
                                {Array(6).fill(0).map((_, index) => (
                                    <Skeleton key={index} height={18} />
                                ))}
                            </CardContent>

                            <div className="flex justify-end space-x-4 mt-4">
                                <Skeleton height={36} width={100} />
                                <Skeleton height={36} width={100} />
                            </div>
                        </Card>
                    </div>

                    <div className="flex-[0.6] space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                            <Skeleton height={24} width={`50%`} />
                            <div className="space-y-4 mt-4">
                                {Array(5).fill(0).map((_, index) => (
                                    <Skeleton key={index} height={18} />
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-h-[300px] overflow-y-auto">
                            <Skeleton height={20} width={`40%`} />
                            <div className="mt-4">
                                {Array(3).fill(0).map((_, index) => (
                                    <Skeleton key={index} height={15} style={{ marginBottom: '0.5rem' }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Contenido real una vez que se cargan los datos
                <ResizablePanelGroup
                    direction="horizontal"
                    className="rounded-lg border bg-white"
                >
                    <ResizablePanel defaultSize={40}>
                        <Card className="shadow-xl rounded-lg bg-white p-6 border border-gray-200 h-full">
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <motion.img
                                                src={`data:image/jpeg;base64,${paciente?.fotoPaciente}`}
                                                alt="Foto del Paciente"
                                                className="w-24 h-24 rounded-full cursor-pointer border-4 border-blue-500 hover:shadow-lg"
                                                whileHover={{ scale: 1.05 }}
                                            />
                                        </DialogTrigger>
                                        <DialogContent className="max-w-md p-6 bg-white rounded-lg shadow-lg">
                                            <img
                                                src={`data:image/jpeg;base64,${paciente?.fotoPaciente}`}
                                                alt="Foto del Paciente Ampliada"
                                                className="rounded-lg w-full h-auto"
                                            />
                                        </DialogContent>
                                    </Dialog>
                                    <div>
                                        <CardTitle className="text-2xl font-bold text-gray-700">{paciente?.nombreCompleto}</CardTitle>
                                        <CardDescription className="text-gray-500 text-lg">Paciente ID: {paciente?.idPaciente}</CardDescription>
                                        <p className="text-gray-600 mt-2">
                                            <strong>{'C\u00E9dula:'}</strong>{' '}
                                            {isLoading ? (
                                                <Skeleton className="h-4 w-40" />
                                            ) : (
                                                paciente?.cedula
                                            )}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>{'G\u00E9nero:'}</strong>{' '}
                                            {isLoading ? (
                                                <Skeleton className="h-4 w-24" />
                                            ) : (
                                                getLabel(generos, paciente?.genero ?? 0)
                                            )}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>{'Fecha de Nacimiento:'}</strong>{' '}
                                            {paciente?.fechaNacimiento}
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="mt-4">
                                <div className="space-y-4">
                                    <CopySnippet
                                        label={'Direcci\u00F3n'}
                                        value={isLoading ? '' : paciente?.direccion}
                                    />
                                    <CopySnippet
                                        label={'Tel\u00E9fono'}
                                        value={isLoading ? '' : paciente?.telefono}
                                    />
                                    <CopySnippet
                                        label={'Tel\u00E9fono Celular'}
                                        value={isLoading ? '' : paciente?.telefonoCelular}
                                    />
                                    <CopySnippet
                                        label={'Provincia'}
                                        value={getLabel(provincias, paciente?.idProvincia || 0)}
                                    />
                                    <p className="text-gray-700">
                                        <strong>{'Sector:'}</strong> {paciente?.sector}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>{'Incidencia:'}</strong> {paciente?.incidencia ? 'S\u00ED' : 'No'}
                                    </p>
                                    <CopySnippet
                                        label={'Comentario'}
                                        value={isLoading ? '' : paciente?.comentario}
                                    />
                                </div>
                            </CardContent>

                            <div className="flex justify-end space-x-4 mt-4">
                                <Button variant="primary" onClick={() => navigate(`/EditPaciente/${paciente?.idPaciente}`)}>
                                    Editar
                                </Button>
                                <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>
                                    Eliminar
                                </Button>
                            </div>
                        </Card>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={60}>
                        <div className="flex flex-col space-y-6 h-full p-4">
                            {/* Historial del Paciente */}
                            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex-1 overflow-y-auto">
                                <h2 className="text-2xl font-semibold mb-4 text-blue-500">Historial del Paciente</h2>
                                {paciente?.historialPacienteIngresos && paciente.historialPacienteIngresos.length > 0 ? (
                                    <ul className="space-y-4">
                                        {paciente.historialPacienteIngresos.map((historial: HistorialPacienteIngreso) => (
                                            <li key={historial.idHistorial} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50">
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
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-600">No hay historial de ingresos.</p>
                                )}
                            </div>

                            {/* Scrollable and Larger Status Board */}
                            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-h-[250px] overflow-y-auto">
                                <h2 className="text-lg font-semibold mb-4 text-green-600">Estatus del Paciente</h2>
                                <StatusBoard pacienteId={paciente.idPaciente} />
                                </div>


                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            )}

            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <h2 className="text-xl font-semibold text-center">{'Confirmaci\u00F3n de Eliminaci\u00F3n'}</h2>
                    <p className="text-center text-gray-600 mt-4">
                        {'\u00BFEst\u00E1s seguro de que deseas eliminar al paciente '}
                        <strong>{paciente?.nombreCompleto}</strong>
                        {'?'}
                    </p>
                    <DialogFooter className="flex justify-end space-x-2 mt-6">
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Confirmar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export default PacienteProfile;
