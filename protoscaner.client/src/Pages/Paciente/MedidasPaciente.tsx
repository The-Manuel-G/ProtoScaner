import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaUser, FaClipboardList, FaPlusCircle, FaEye, FaDownload } from 'react-icons/fa';
import { Paciente } from '../../types/Paciente';
import { MedidaTransfemoral } from '../../types/MedidaTransfemoral';
import { MedidaTranstibial } from '../../types/MedidaTranstibial';
import { TomaMedidasEscaneo } from '../../types/TomaMedidasEscaneo';
import { getPacienteById } from '../../services/PacienteService';
import { getMedidasTransfemoral } from '../../services/MedidaTransfemoralService';
import { getMedidasTranstibial } from '../../services/MedidaTranstibialService';
import { getTomasMedidasEscaneo } from '../../services/TomaMedidasEscaneoService';
import TomaMedidasEscaneoForm from '../../Pages/Paciente/TomaMedidasForm';
import {
    tipoLiners,
    tiposAmputacion,
} from '@/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify';
import MiniMenu from '@/components/ui/MiniMenu';

const MedidasPaciente: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [paciente, setPaciente] = useState<Paciente | null>(null);
    const [tipoAmputacion, setTipoAmputacion] = useState<number | null>(null);
    const [showTransfemoralForm, setShowTransfemoralForm] = useState<boolean>(false);
    const [showTranstibialForm, setShowTranstibialForm] = useState<boolean>(false);
    const [transtibialMeasurements, setTranstibialMeasurements] = useState<MedidaTranstibial[]>([]);
    const [transfemoralMeasurements, setTransfemoralMeasurements] = useState<MedidaTransfemoral[]>([]);
    const [escaneos, setEscaneos] = useState<TomaMedidasEscaneo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Definir los valores de amputación según las constantes
    const TRANTIBIAL_VALUE = tiposAmputacion.find(t => t.label === 'Transtibial')?.value;
    const TRANSFEMORAL_VALUE = tiposAmputacion.find(t => t.label === 'Transfemoral')?.value;

    useEffect(() => {
        const fetchPaciente = async () => {
            if (id) {
                try {
                    const pacienteData = await getPacienteById(Number(id));
                    setPaciente(pacienteData);

                    const historial = pacienteData.historialPacienteIngresos || pacienteData.HistorialPacienteIngresos;

                    if (historial && historial.length > 0) {
                        const latestHistorial = historial[historial.length - 1];
                        const tipoAmputacionValue = latestHistorial.tipoAmputacion || latestHistorial.TipoAmputacion;

                        if (tipoAmputacionValue !== undefined) {
                            setTipoAmputacion(tipoAmputacionValue);
                        } else {
                            toast.error('Tipo de amputación no encontrado.');
                        }
                    }

                    setLoading(false);
                } catch (error) {
                    toast.error('Error al obtener los datos del paciente');
                    setLoading(false);
                }
            }
        };

        fetchPaciente();
    }, [id]);

    useEffect(() => {
        if (!paciente) return;

        const pacienteId = paciente.idPaciente || paciente.IdPaciente;

        if (tipoAmputacion === TRANTIBIAL_VALUE) {
            getMedidasTranstibial()
                .then(medidas => {
                    const medidasPaciente = medidas.filter(medida =>
                        medida.idPaciente === pacienteId || medida.IdPaciente === pacienteId
                    );
                    setTranstibialMeasurements(medidasPaciente);
                })
                .catch(() => toast.error('Error al obtener las medidas transtibial'));
        } else if (tipoAmputacion === TRANSFEMORAL_VALUE) {
            getMedidasTransfemoral()
                .then(medidas => {
                    const medidasPaciente = medidas.filter(medida =>
                        medida.idPaciente === pacienteId || medida.IdPaciente === pacienteId
                    );
                    setTransfemoralMeasurements(medidasPaciente);
                })
                .catch(() => toast.error('Error al obtener las medidas transfemoral'));
        }

        getTomasMedidasEscaneo()
            .then(escaneos => {
                const escaneosPaciente = escaneos.filter(escaneo =>
                    escaneo.idPaciente === pacienteId || escaneo.IdPaciente === pacienteId
                );
                setEscaneos(escaneosPaciente);
            })
            .catch(() => toast.error('Error al obtener los escaneos'));
    }, [tipoAmputacion, paciente]);

    const handleNewTransfemoralMeasurement = () => {
        setShowTransfemoralForm(true);
        setShowTranstibialForm(false);
    };

    const handleNewTranstibialMeasurement = () => {
        setShowTranstibialForm(true);
        setShowTransfemoralForm(false);
    };

    const handleViewMeasurements = () => {
        setShowTransfemoralForm(false);
        setShowTranstibialForm(false);
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-3xl font-bold text-center text-blue-600 flex items-center justify-center gap-2">
                <FaClipboardList /> Medidas del Paciente
            </h1>
            <MiniMenu />
            {loading ? (
                <p>Cargando datos del paciente...</p>
            ) : paciente ? (
                <>
                    <Card className="shadow-lg rounded-lg bg-white p-6 mb-8 border border-gray-200">
                        <CardHeader className="flex items-center gap-4">
                            <FaUser className="text-blue-600 text-3xl" />
                            <div>
                                <CardTitle className="text-xl font-semibold text-gray-700">
                                    {paciente.nombreCompleto || paciente.NombreCompleto}
                                </CardTitle>
                                <p className="text-gray-600">
                                    ID: {paciente.idPaciente || paciente.IdPaciente}
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button
                                variant="default"
                                onClick={handleNewTransfemoralMeasurement}
                                className="flex items-center gap-2"
                            >
                                <FaPlusCircle /> Tomar Medida Transfemoral
                            </Button>
                            <Button
                                variant="default"
                                onClick={handleNewTranstibialMeasurement}
                                className="flex items-center gap-2"
                            >
                                <FaPlusCircle /> Tomar Medida Transtibial
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={handleViewMeasurements}
                                className="flex items-center gap-2"
                            >
                                <FaEye /> Ver Medidas Anteriores
                            </Button>
                        </CardContent>
                    </Card>

                    {showTransfemoralForm && <TomaMedidasEscaneoForm pacienteId={paciente.idPaciente || paciente.IdPaciente} />}
                    {showTranstibialForm && <TomaMedidasEscaneoForm pacienteId={paciente.idPaciente || paciente.IdPaciente} />}
                    {!showTransfemoralForm && !showTranstibialForm && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                                <FaClipboardList /> Medidas Anteriores
                            </h2>

                            {transfemoralMeasurements.length > 0 && (
                                <>
                                    <h3 className="text-lg font-semibold text-gray-800 mt-4">Medidas Transfemorales</h3>
                                    {transfemoralMeasurements.map(medida => (
                                        <Card key={medida.IdMedidaT} className="border shadow-sm p-4 bg-gray-50">
                                            <p><strong>Longitud del Pie:</strong> {medida.LongitudPie}</p>
                                            {/* Otros campos */}
                                        </Card>
                                    ))}
                                </>
                            )}

                            {transtibialMeasurements.length > 0 && (
                                <>
                                    <h3 className="text-lg font-semibold text-gray-800 mt-4">Medidas Transtibiales</h3>
                                    {transtibialMeasurements.map(medida => (
                                        <Card key={medida.IdMedida} className="border shadow-sm p-4 bg-gray-50">
                                            <p><strong>Longitud Total del Muñón:</strong> {medida.LongitudTotalMunon}</p>
                                            {/* Otros campos */}
                                        </Card>
                                    ))}
                                </>
                            )}

                            {transfemoralMeasurements.length === 0 && transtibialMeasurements.length === 0 && (
                                <p className="text-gray-500">No hay medidas registradas.</p>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <p>No se pudo cargar la información del paciente.</p>
            )}
        </div>
    );
};

export default MedidasPaciente;
