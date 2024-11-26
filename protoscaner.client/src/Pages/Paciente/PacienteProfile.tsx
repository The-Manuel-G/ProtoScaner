// src/Pages/Paciente/PacienteProfile.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paciente } from '../../types/Paciente';
import { HistorialPacienteIngreso } from '../../types/HistorialPacienteIngreso';
import { getPacienteById, deletePaciente } from '../../services/PacienteService';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from '../../components/ui/dialog';
import MiniMenu from '../../components/ui/MiniMenu';
import { Button } from '../../components/ui/button';
import { generos, tiposAmputacion, ladosAmputacion, provincias, causasAmputacion } from '../../constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CopySnippet from '../../components/ui/CopySnippet'; // Importar el nuevo componente

// Utilidad para obtener etiquetas
const getLabel = (array: { label: string; value: number }[], value: number) =>
    array.find(item => item.value === value)?.label || 'Desconocido';

const PacienteProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [paciente, setPaciente] = useState<Paciente | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const fetchPaciente = async () => {
            if (id) {
                try {
                    const pacienteData = await getPacienteById(Number(id));
                    setPaciente(pacienteData);
                } catch (error) {
                    console.error("Error al obtener el paciente:", error);
                    toast.error('Error al obtener los datos del paciente.');
                }
            }
        };
        fetchPaciente();
    }, [id]);

    const handleDelete = async () => {
        if (paciente) {
            try {
                await deletePaciente(paciente.idPaciente);
                toast.success('Paciente eliminado con éxito.');
                setIsDeleteModalOpen(false);
                navigate('/');
            } catch (error) {
                console.error("Error al eliminar el paciente:", error);
                toast.error('Error al eliminar el paciente.');
            }
        }
    };

    if (!paciente) return <div className="text-center text-gray-500">Cargando...</div>;

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <MiniMenu /> {/* Menú en la esquina superior derecha */}
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Perfil del Paciente</h1>

            <Card className="shadow-xl rounded-lg bg-white p-6 mb-8 border border-gray-200">
                <CardHeader>
                    <div className="flex items-center space-x-6">
                        <Dialog>
                            <DialogTrigger asChild>
                                <motion.img
                                    src={`data:image/jpeg;base64,${paciente.fotoPaciente}`}
                                    alt="Foto del Paciente"
                                    className="w-32 h-32 rounded-full cursor-pointer border-4 border-blue-500 hover:shadow-lg"
                                    whileHover={{ scale: 1.1 }}
                                />
                            </DialogTrigger>
                            <DialogContent className="max-w-md p-6 bg-white rounded-lg shadow-lg">
                                <img
                                    src={`data:image/jpeg;base64,${paciente.fotoPaciente}`}
                                    alt="Foto del Paciente Ampliada"
                                    className="rounded-lg w-full h-auto"
                                />
                            </DialogContent>
                        </Dialog>
                        <div>
                            <CardTitle className="text-3xl font-bold text-gray-700">{paciente.nombreCompleto}</CardTitle>
                            <CardDescription className="text-gray-500 text-lg">Paciente ID: {paciente.idPaciente}</CardDescription>
                            <p className="text-gray-600 mt-2"><strong>Cedula:</strong> {paciente.cedula}</p>
                            <p className="text-gray-600"><strong>Genero:</strong> {getLabel(generos, paciente.genero)}</p>
                            <p className="text-gray-600"><strong>Fecha de Nacimiento:</strong> {paciente.fechaNacimiento}</p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="mt-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <CopySnippet label="Direccion" value={paciente.direccion} />
                            <CopySnippet label="Telefono" value={paciente.telefono} />
                            <CopySnippet label="Telefono Celular" value={paciente.telefonoCelular} />
                        </div>
                        <div>
                            <CopySnippet label="Provincia" value={getLabel(provincias, paciente.idProvincia)} />
                            <p className="text-gray-700"><strong>Sector:</strong> {paciente.sector}</p>
                            <p className="text-gray-700"><strong>Incidencia:</strong> {paciente.incidencia ? 'Sí' : 'No'}</p>
                            <CopySnippet label="Comentario" value={paciente.comentario} />
                        </div>
                    </div>
                </CardContent>

                <div className="flex justify-end space-x-4 mt-6">
                    <Button variant="primary" onClick={() => navigate(`/EditPaciente/${paciente.idPaciente}`)}>
                        Editar
                    </Button>
                    <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>
                        Eliminar
                    </Button>
                </div>
            </Card>

            {/* Modal de Confirmación de Eliminación */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <h2 className="text-xl font-semibold text-center">Confirmación de Eliminación</h2>
                    <p className="text-center text-gray-600 mt-4">
                        ¿Estás seguro de que deseas eliminar al paciente <strong>{paciente.nombreCompleto}</strong>?
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

            {/* Historial de Ingresos */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-500">Historial del paciente</h2>
                {paciente.historialPacienteIngresos && paciente.historialPacienteIngresos.length > 0 ? (
                    <ul className="space-y-4">
                        {paciente.historialPacienteIngresos.map((historial: HistorialPacienteIngreso) => (
                            <li key={historial.idHistorial} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50">
                                <p className="flex items-center">
                                    {/* Icono SVG personalizado */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5 inline-block mr-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    <strong>Tipo de Amputacion:</strong> {getLabel(tiposAmputacion, historial.tipoAmputacion)}
                                </p>
                                <p><strong>Lado de Amputacion:</strong> {getLabel(ladosAmputacion, historial.ladoAmputacion)}</p>
                                <p><strong>Fecha de Amputacion:</strong> {historial.fechaAmputacion}</p>
                                <p><strong>Causa:</strong> {getLabel(causasAmputacion, historial.causa)}</p>
                                <p><strong>Terapia:</strong> {historial.terapia ? 'Sí' : 'No'}</p>
                                {historial.terapia && <p><strong>Tiempo de Terapia:</strong> {historial.tiempoTerapia}</p>}
                                <p><strong>Comentario:</strong> {historial.comentario}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No hay historial de ingresos.</p>
                )}
            </div>

            {/* Contenedor de Notificaciones */}
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );

};

export default PacienteProfile;
