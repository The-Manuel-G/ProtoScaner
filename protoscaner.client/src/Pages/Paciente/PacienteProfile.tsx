import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paciente } from '../../types/Paciente';
import { HistorialPacienteIngreso } from '../../types/HistorialPacienteIngreso';
import { getPacienteById, deletePaciente } from '../../services/PacienteService';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from '@/components/ui/dialog';
import MiniMenu from '@/components/ui/MiniMenu';
 // Componente de botón personalizado
import { FaMapMarkerAlt, FaPhone, FaMobileAlt, FaComment } from 'react-icons/fa';
import { GiBodyHeight } from 'react-icons/gi';
import { Button } from '../../components/ui/button';

// Constantes de opciones
const generos = [
    { label: 'Masculino', value: 1 },
    { label: 'Femenino', value: 2 }
];



const tiposAmputacion = [
    { label: 'Transtibial', value: 1 },
    { label: 'Transfemoral', value: 2 }
];

const ladosAmputacion = [
    { label: 'Izquierdo', value: 1 },
    { label: 'Derecho', value: 2 }
];


const provincias = [
    { label: 'Azua', value: 1 },
    { label: 'Bahoruco', value: 2 },
    { label: 'Barahona', value: 3 },
    { label: 'Dajabón', value: 4 },
    { label: 'Distrito Nacional', value: 5 },
    { label: 'Duarte', value: 6 },
    { label: 'El Seibo', value: 7 },
    { label: 'Elías Piña', value: 8 },
    { label: 'Espaillat', value: 9 },
    { label: 'Hato Mayor', value: 10 },
    { label: 'Hermanas Mirabal', value: 11 },
    { label: 'Independencia', value: 12 },
    { label: 'La Altagracia', value: 13 },
    { label: 'La Romana', value: 14 },
    { label: 'La Vega', value: 15 },
    { label: 'María Trinidad Sánchez', value: 16 },
    { label: 'Monseñor Nouel', value: 17 },
    { label: 'Monte Cristi', value: 18 },
    { label: 'Monte Plata', value: 19 },
    { label: 'Pedernales', value: 20 },
    { label: 'Peravia', value: 21 },
    { label: 'Puerto Plata', value: 22 },
    { label: 'Samaná', value: 23 },
    { label: 'San Cristóbal', value: 24 },
    { label: 'San José de Ocoa', value: 25 },
    { label: 'San Juan', value: 26 },
    { label: 'San Pedro de Macorís', value: 27 },
    { label: 'Sánchez Ramírez', value: 28 },
    { label: 'Santiago', value: 29 },
    { label: 'Santiago Rodríguez', value: 30 },
    { label: 'Santo Domingo', value: 31 },
    { label: 'Valverde', value: 32 }
];




const causasAmputacion = [
    { label: 'Congenita', value: 1 }, { label: 'Enfermedad', value: 2 }, { label: 'Accidente', value: 3 },
    { label: 'Diabetes', value: 4 }, { label: 'Infeccion', value: 5 }, { label: 'Traumatismo', value: 6 },
    { label: 'Cáncer', value: 7 },
    { label: 'Vascular', value: 8 },
    { label: 'Quemaduras', value: 9 },
    { label: 'Lesiones deportivas', value: 10 },
    { label: 'Mala circulación', value: 11 },
    { label: 'Frostbite (congelación)', value: 12 },
    { label: 'Neuropatía periférica', value: 13 },
    { label: 'Síndrome de compartimento', value: 14 },
    { label: 'Trombosis venosa profunda', value: 15 },
    { label: 'Complicaciones quirúrgicas', values: 16 },
    { label: 'Infecciones óseas', values: 17 },
    { label: 'Tumores benignos', values: 18 },
    { label: 'Trastornos neuromusculares', values: 19 },
    { label: 'Exposición a sustancias tóxicas', values: 20 },
    { label: 'Malformaciones congénitas', values: 21 },
    { label: 'Factores genéticos', values: 22 },
    { label: 'Otro', value: 23 }
];

// Utilidades para obtener etiquetas
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
                }
            }
        };
        fetchPaciente();
    }, [id]);

    const handleDelete = async () => {
        if (paciente) {
            try {
                await deletePaciente(paciente.idPaciente);
                setIsDeleteModalOpen(false);
                navigate('/');
            } catch (error) {
                console.error("Error al eliminar el paciente:", error);
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
                            <p className="flex items-center text-gray-700"><FaMapMarkerAlt className="mr-2" /><strong>Direccion:</strong> {paciente.direccion}</p>
                            <p className="flex items-center text-gray-700"><FaPhone className="mr-2" /><strong>Telefono:</strong> {paciente.telefono}</p>
                            <p className="flex items-center text-gray-700"><FaMobileAlt className="mr-2" /><strong>Telefono Celular:</strong> {paciente.telefonoCelular}</p>
                        </div>
                        <div>
                           
                            <p className="text-gray-700"><strong>Sector:</strong> {paciente.sector}</p>
                            <p className="text-gray-700"><strong>Incidencia:</strong> {paciente.insidencia ? 'Si' : 'No'}</p>
                            <p className="flex items-center text-gray-700"><FaComment className="mr-2" /><strong>Comentario:</strong> {paciente.comentario}</p>
                        </div>
                    </div>
                </CardContent>

                <div className="flex justify-end space-x-4 mt-6">
                    <Button variant="primary" onClick={() => navigate(`/edit/${paciente.idPaciente}`)}>
                        Editar
                    </Button>
                    <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>
                        Eliminar
                    </Button>
                </div>
            </Card>

            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <h2 className="text-xl font-semibold text-center">Confirmacion de Eliminacion</h2>
                    <p className="text-center text-gray-600 mt-4">
                        ¿Estas seguro de que deseas eliminar al paciente <strong>{paciente.nombreCompleto}</strong>?
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

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-500">Historial de Ingresos</h2>
                {paciente.historialPacienteIngresos && paciente.historialPacienteIngresos.length > 0 ? (
                    <ul className="space-y-4">
                        {paciente.historialPacienteIngresos.map((historial: HistorialPacienteIngreso) => (
                            <li key={historial.idHistorial} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50">
                                <p><GiBodyHeight className="inline-block mr-2" /><strong>Tipo de Amputacion:</strong> {getLabel(tiposAmputacion, historial.tipoAmputacion)}</p>
                                <p><strong>Lado de Amputacion:</strong> {getLabel(ladosAmputacion, historial.ladoAmputacion)}</p>
                                <p><strong>Fecha de Amputacion:</strong> {historial.fechaAmputacion}</p>
                                <p><strong>Causa:</strong> {getLabel(causasAmputacion, historial.causa)}</p>
                                <p><strong>Terapia:</strong> {historial.terapia ? 'Si' : 'No'}</p>
                                <p><strong>Tiempo de Terapia:</strong> {historial.tiempoTerapia}</p>
                                <p><strong>Comentario:</strong> {historial.comentario}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No hay historial de ingresos.</p>
                )}
            </div>
        </div>
    );
};

export default PacienteProfile;
