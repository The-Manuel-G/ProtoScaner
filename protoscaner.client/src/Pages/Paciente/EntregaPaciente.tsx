// src/pages/EntregaPaciente.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaUser, FaClipboardList, FaPlusCircle, FaEye, FaDownload } from 'react-icons/fa';
import { Paciente } from '../../types/Paciente';
import { useNavigate } from 'react-router-dom';
import { Entrega } from '../../types/Entrega';
import { getPacienteById } from '../../services/PacienteService';
import { getEntregas } from '../../services/EntregaService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify';
import MiniMenu from '@/components/ui/MiniMenu';
import Entregas from './Potesis/EntregaPage';
import { FaPlus } from 'react-icons/fa6';

function EntregaPaciente() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigate = useNavigate();
    const { id } = useParams<{ id: string; }>();
    const [paciente, setPaciente] = useState<Paciente | null>(null);
    const [entregas, setEntregas] = useState<Entrega[]>([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchPaciente = async () => {
            if (id) {
                try {
                    const pacienteData = await getPacienteById(Number(id));
                    setPaciente(pacienteData);
                    toast.success('Datos del paciente cargados correctamente');
                } catch (error) {
                    console.error('Error fetching patient data:', error);
                    toast.error('Error al obtener los datos del paciente');
                }
            }
        };

        fetchPaciente();
    }, [id]);

    useEffect(() => {
        if (id) {
            getEntregas(Number(entregas))
                .then(setEntregas)
                .catch((error) => {
                    console.error('Error fetching deliveries:', error);
                    toast.error('Error al obtener las entregas del paciente');
                });
        }
    }, [id]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleNewDelivery = () => setShowForm(true);
    const handleViewDeliveries = () => {
        toast.info('Cargando entregas anteriores del paciente');
        setShowForm(false);
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-3xl font-bold text-center text-blue-600 flex items-center justify-center gap-2">
                <FaClipboardList /> Entregas del Paciente
            </h1>
            <MiniMenu />
            {paciente && (
                <Card className="shadow-lg rounded-lg bg-white p-6 mb-8 border border-gray-200">
                    <CardHeader className="flex items-center gap-4">
                        <FaUser className="text-blue-600 text-3xl" />
                        <div>
                            <CardTitle className="text-xl font-semibold text-gray-700">{paciente.nombreCompleto}</CardTitle>
                            <p className="text-gray-600">ID: {paciente.idPaciente}</p>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button
                            variant="default"
                            className="flex items-center gap-2"
                            icon={<FaPlus />}
                            onClick={() => navigate('/Formulario-entregas/:id')}>
                            <FaPlus className="text-2xl" />
                            <FaPlusCircle /> Registrar Nueva Entrega
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={handleViewDeliveries}
                            className="flex items-center gap-2">
                            <FaEye /> Ver Entregas Anteriores
                        </Button>
                    </CardContent>
                </Card>
            )}

            {showForm ? (
                <div className="text-center text-gray-600">
                    <p>Formulario para registrar nuevas entregas aún no implementado.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                        <FaClipboardList /> Entregas Anteriores
                    </h2>
                    {entregas.length > 0 ? (
                        entregas.map((entrega) => (
                            <Card key={entrega.idEntregas} className="border shadow-sm p-4 bg-gray-50">
                                <p><strong>Fecha de Entrega:</strong> {Entregas.fechaEntrega}</p>
                                <p><strong>Tipo de Prótesis:</strong> {entrega.idProtesis}</p>
                                <p><strong>Diseñador:</strong> {entrega.idUsuario}</p>
                                <p><strong>Documento de Entrega:</strong>
                                    <a href={`data:application/pdf;base64,${entrega.firmaDescargoComponenteLista}`} download="Entrega.pdf" className="text-blue-600 flex items-center gap-2">
                                        <FaDownload /> Descargar
                                    </a>
                                </p>
                                <p><strong>Notas sobre modificación:</strong> {entrega.generalModificacion}</p>
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-500">No hay entregas registradas para este paciente.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default EntregaPaciente;
