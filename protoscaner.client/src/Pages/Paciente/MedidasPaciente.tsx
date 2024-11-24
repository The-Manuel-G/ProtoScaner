// src/pages/MedidasPaciente.tsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaUser, FaClipboardList, FaPlusCircle, FaEye, FaDownload } from 'react-icons/fa';
import { Paciente } from '../../types/Paciente';
import { MedidaTransfemoral } from '../../types/MedidaTransfemoral';
import { MedidaTranstibial } from '../../types/MedidaTranstibial';
import { TomaMedidasEscaneo } from '../../types/TomaMedidasEscaneo';
import { getPacienteById } from '../../services/PacienteService';
import { getMedidasTransfemoral } from '../../services/MedidaTransfemoralService';
import { getMedidasTranstibial } from '../../services/MedidaTranstibialService';
import { getTomasMedidasEscaneo } from '../../services/TomaMedidasEscaneoService';
import MedidasTranstibialForm from '../../components/pacienteForm/MedidasTranstibialForm';
import MedidasTransfemoralForm from '../../components/pacienteForm/MedidasTransfemoralForm';
import { AMPUTATION_TYPES } from '../../constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify';
import MiniMenu from '@/components/ui/MiniMenu';

const MedidasPaciente: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [paciente, setPaciente] = useState<Paciente | null>(null);
    const [tipoAmputacion, setTipoAmputacion] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [transtibialMeasurements, setTranstibialMeasurements] = useState<MedidaTranstibial[]>([]);
    const [transfemoralMeasurements, setTransfemoralMeasurements] = useState<MedidaTransfemoral[]>([]);
    const [escaneos, setEscaneos] = useState<TomaMedidasEscaneo[]>([]);

    useEffect(() => {
        const fetchPaciente = async () => {
            if (id) {
                try {
                    const pacienteData = await getPacienteById(Number(id));
                    setPaciente(pacienteData);

                    const latestHistorial = pacienteData.historialPacienteIngresos?.[0];
                    if (latestHistorial?.tipoAmputacion !== undefined) {
                        setTipoAmputacion(latestHistorial.tipoAmputacion);
                        toast.success('Datos del paciente cargados correctamente');
                    } else {
                        toast.error('Tipo de amputación no encontrado en el historial.');
                    }
                } catch (error) {
                    console.error('Error fetching patient data:', error);
                    toast.error('Error al obtener los datos del paciente');
                }
            }
        };

        fetchPaciente();
    }, [id]);

    useEffect(() => {
        if (tipoAmputacion === AMPUTATION_TYPES.TRANSTIBIAL.value) {
            getMedidasTranstibial()
                .then(setTranstibialMeasurements)
                .catch(console.error);
        } else if (tipoAmputacion === AMPUTATION_TYPES.TRANSFEMORAL.value) {
            getMedidasTransfemoral()
                .then(setTransfemoralMeasurements)
                .catch(console.error);
        }

        getTomasMedidasEscaneo()
            .then(setEscaneos)
            .catch(console.error);
    }, [tipoAmputacion]);

    const handleNewMeasurement = () => setShowForm(true);
    const handleViewMeasurements = () => {
        toast.info('Cargando medidas anteriores del paciente');
        setShowForm(false);
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-3xl font-bold text-center text-blue-600 flex items-center justify-center gap-2">
                <FaClipboardList /> Medidas del Paciente
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
                        <Link to={`/Formulario-medidas/${id}`} className="flex items-center gap-2">
                            <Button variant="default" className="flex items-center gap-2">
                                <FaPlusCircle /> Tomar Nueva Medida
                            </Button>
                        </Link>
                        <Button variant="secondary" onClick={handleViewMeasurements} className="flex items-center gap-2">
                            <FaEye /> Ver Medidas Anteriores
                        </Button>
                    </CardContent>
                </Card>
            )}

            {showForm ? (
                tipoAmputacion === AMPUTATION_TYPES.TRANSTIBIAL.value ? (
                    <MedidasTranstibialForm />
                ) : (
                    <MedidasTransfemoralForm />
                )
            ) : (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                        <FaClipboardList /> Medidas Anteriores
                    </h2>

                    <h3 className="text-lg font-semibold text-gray-800 mt-4">Detalles de Escaneos</h3>
                    {escaneos.length > 0 ? (
                        escaneos.map((escaneo) => (
                            <Card key={escaneo.idEscaneo} className="border shadow-sm p-4 bg-gray-50">
                                <p><strong>Fecha de Escaneo:</strong> {escaneo.fechaEscaneo}</p>
                                <p><strong>Comentario:</strong> {escaneo.comentario}</p>
                                <p><strong>Resultado del Escaneo:</strong> {escaneo.resultadoScaneo}</p>
                                <p><strong>Documento de Resultado:</strong> <a href={`data:application/pdf;base64,${escaneo.resultadoDoc}`} download="Resultado.pdf" className="text-blue-600 flex items-center gap-2"><FaDownload /> Descargar</a></p>
                                <p><strong>Foto del Muñón:</strong> <img src={`data:image/jpeg;base64,${escaneo.fotosMunon}`} alt="Foto del Muñón" className="w-20 h-20 object-cover mt-2 rounded border" /></p>
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-500">No hay escaneos registrados para este paciente.</p>
                    )}

                    <h3 className="text-lg font-semibold text-gray-800 mt-4">Medidas Anteriores</h3>
                    {tipoAmputacion === AMPUTATION_TYPES.TRANSTIBIAL.value && transtibialMeasurements.length > 0 ? (
                        transtibialMeasurements.map((medida) => (
                            <Card key={medida.idMedida} className="border shadow-sm p-4 bg-gray-50">
                                <p><strong>Longitud Total del Muñón:</strong> {medida.longitudTotalMunon} cm</p>
                                <p><strong>Circunferencia a 3 cm:</strong> {medida.circunferencia3cm} cm</p>
                                <p><strong>Circunferencia a 6 cm:</strong> {medida.circunferencia6cm} cm</p>
                                <p><strong>Circunferencia a 9 cm:</strong> {medida.circunferencia9cm} cm</p>
                                <p><strong>Circunferencia a 12 cm:</strong> {medida.circunferencia12cm} cm</p>
                                <p><strong>Circunferencia a 15 cm:</strong> {medida.circunferencia15cm} cm</p>
                                <p><strong>ML Sobre Rodilla:</strong> {medida.mlSobreRodilla} cm</p>
                                <p><strong>AP Tensión:</strong> {medida.apTension} cm</p>
                                <p><strong>ML Supracondilar:</strong> {medida.mlSupracondilar} cm</p>
                                <p><strong>ML Tendón:</strong> {medida.mlTendon} cm</p>
                                <p><strong>Longitud Ósea:</strong> {medida.longitudOsea}</p>
                                <p><strong>Longitud Pies:</strong> {medida.longitudPies}</p>
                                <p><strong>Altura Tacón:</strong> {medida.alturaTacon}</p>
                                <p><strong>Notas:</strong> {medida.notas}</p>
                            </Card>
                        ))
                    ) : tipoAmputacion === AMPUTATION_TYPES.TRANSFEMORAL.value && transfemoralMeasurements.length > 0 ? (
                        transfemoralMeasurements.map((medida) => (
                            <Card key={medida.idMedidaT} className="border shadow-sm p-4 bg-gray-50">
                                <p><strong>Longitud del Pie:</strong> {medida.longitudPie} cm</p>
                                <p><strong>Altura del Talón:</strong> {medida.alturaTalon} cm</p>
                                <p><strong>Medida 1 (Periné a Punta del Muñón):</strong> {medida.medida1}</p>
                                <p><strong>Medida 2 (Isquion a Punta del Muñón):</strong> {medida.medida2}</p>
                                <p><strong>Diseñador de Socket:</strong> {medida.disenadorSocket}</p>
                                <p><strong>Foto del Muñón:</strong> <img src={`data:image/jpeg;base64,${medida.fotoMunon}`} alt="Foto del Muñón" className="w-20 h-20 object-cover mt-2 rounded border" /></p>
                                <h4 className="font-semibold mt-4">Medidas Circunferenciales</h4>
                                {medida.circunferencias && medida.circunferencias.length > 0 ? (
                                    medida.circunferencias.map((circ) => (
                                        <div key={circ.idMedida} className="p-2 border-b border-gray-300">
                                            <p><strong>Circunferencia {circ.numeroCircunferencia}:</strong> {circ.valorMmSinPresion} mm</p>
                                            <p><strong>Circunferencia {circ.numeroCircunferencia}:</strong> {circ.valorMmConPresion} mm</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No hay medidas de circunferencia registradas.</p>
                                )}
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-500">No hay medidas anteriores.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MedidasPaciente;
