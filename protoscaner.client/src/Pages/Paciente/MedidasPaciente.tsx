// src/pages/MedidasPaciente.tsx

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

    // Otros arrays si los necesitas
} from '@/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify';
import MiniMenu from '@/components/ui/MiniMenu';``

// Utilidad para obtener etiquetas
const getLabel = (
    array: { label: string; value: number }[],
    value: number
) => array.find((item) => item.value === value)?.label || 'Desconocido';

const MedidasPaciente: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [paciente, setPaciente] = useState<Paciente | null>(null);
    const [tipoAmputacion, setTipoAmputacion] = useState<number | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
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
                    console.log('Paciente data:', pacienteData);
                    setPaciente(pacienteData);

                    // Acceder al historial del paciente
                    const historial = pacienteData.historialPacienteIngresos || pacienteData.HistorialPacienteIngresos;

                    if (historial && historial.length > 0) {
                        const latestHistorial = historial[historial.length - 1];
                        console.log('Último historial:', latestHistorial);

                        // Obtener el tipo de amputación
                        const tipoAmputacionValue = latestHistorial.tipoAmputacion || latestHistorial.TipoAmputacion;

                        if (tipoAmputacionValue !== undefined) {
                            setTipoAmputacion(tipoAmputacionValue);
                            toast.success('Datos del paciente cargados correctamente');
                        } else {
                            toast.error('Tipo de amputación no encontrado en el historial.');
                        }
                    } else {
                        toast.error('No se encontró historial para el paciente.');
                    }

                    setLoading(false);
                } catch (error) {
                    console.error('Error al obtener los datos del paciente:', error);
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
                    // Filtrar por paciente
                    const medidasPaciente = medidas.filter(medida =>
                        medida.idPaciente === pacienteId || medida.IdPaciente === pacienteId
                    );
                    setTranstibialMeasurements(medidasPaciente);
                })
                .catch(error => {
                    console.error('Error al obtener las medidas transtibial:', error);
                    toast.error('Error al obtener las medidas transtibial');
                });
        } else if (tipoAmputacion === TRANSFEMORAL_VALUE) {
            getMedidasTransfemoral()
                .then(medidas => {
                    // Filtrar por paciente
                    const medidasPaciente = medidas.filter(medida =>
                        medida.idPaciente === pacienteId || medida.IdPaciente === pacienteId
                    );
                    setTransfemoralMeasurements(medidasPaciente);
                })
                .catch(error => {
                    console.error('Error al obtener las medidas transfemoral:', error);
                    toast.error('Error al obtener las medidas transfemoral');
                });
        }

        getTomasMedidasEscaneo()
            .then(escaneos => {
                // Filtrar por paciente
                const escaneosPaciente = escaneos.filter(escaneo =>
                    escaneo.idPaciente === pacienteId || escaneo.IdPaciente === pacienteId
                );
                setEscaneos(escaneosPaciente);
            })
            .catch(error => {
                console.error('Error al obtener los escaneos:', error);
                toast.error('Error al obtener los escaneos');
            });
    }, [tipoAmputacion, paciente]);

    const handleNewMeasurement = () => {
        setShowForm(true);
        toast.info('Preparando formulario para tomar nueva medida');
    };

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
                            {/* Botón para tomar nueva medida */}
                            <Button variant="default" onClick={handleNewMeasurement} className="flex items-center gap-2">
                                <FaPlusCircle /> Tomar Nueva Medida
                            </Button>
                            {/* Botón para ver medidas anteriores */}
                            <Button variant="secondary" onClick={handleViewMeasurements} className="flex items-center gap-2">
                                <FaEye /> Ver Medidas Anteriores
                            </Button>
                        </CardContent>
                    </Card>

                    {showForm ? (
                        <TomaMedidasEscaneoForm
                            pacienteId={paciente.idPaciente || paciente.IdPaciente}
                        />
                    ) : (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                                <FaClipboardList /> Medidas Anteriores
                            </h2>

                            <h3 className="text-lg font-semibold text-gray-800 mt-4">Detalles de Escaneos</h3>
                            {escaneos.length > 0 ? (
                                escaneos.map((escaneo) => (
                                    <Card key={escaneo.idEscaneo || escaneo.IdEscaneo} className="border shadow-sm p-4 bg-gray-50">
                                        {/* Mostrar detalles del escaneo */}
                                        <p><strong>Fecha de Escaneo:</strong> {escaneo.fechaEscaneo}</p>
                                        <p><strong>Comentario:</strong> {escaneo.comentario}</p>
                                        <p><strong>Resultado del Escaneo:</strong> {escaneo.resultadoScaneo}</p>
                                        <p>
                                            <strong>Documento de Resultado:</strong>
                                            {escaneo.resultadoDoc ? (
                                                <a
                                                    href={`data:application/pdf;base64,${escaneo.resultadoDoc}`}
                                                    download="Resultado.pdf"
                                                    className="text-blue-600 flex items-center gap-2"
                                                >
                                                    <FaDownload /> Descargar
                                                </a>
                                            ) : (
                                                <span className="text-gray-500 ml-2">No disponible</span>
                                            )}
                                        </p>
                                        <p>
                                            <strong>Foto del Muñón:</strong>
                                            {escaneo.fotosMunon ? (
                                                <img
                                                    src={`data:image/jpeg;base64,${escaneo.fotosMunon}`}
                                                    alt="Foto del Muñón"
                                                    className="w-20 h-20 object-cover mt-2 rounded border"
                                                />
                                            ) : (
                                                <span className="text-gray-500 ml-2">No disponible</span>
                                            )}
                                        </p>
                                    </Card>
                                ))
                            ) : (
                                <p className="text-gray-500">No hay escaneos registrados para este paciente.</p>
                            )}

                            <h3 className="text-lg font-semibold text-gray-800 mt-4">Medidas Anteriores</h3>
                            {tipoAmputacion === TRANTIBIAL_VALUE && transtibialMeasurements.length > 0 ? (
                                transtibialMeasurements.map((medida) => (
                                    <Card key={medida.idMedida || medida.IdMedida} className="border shadow-sm p-4 bg-gray-50">
                                        {/* Mostrar detalles de medidas transtibiales */}
                                        <p><strong>Longitud Total del Muñón:</strong> {medida.longitudTotalMunon}</p>
                                        {/* Agrega más campos según tus necesidades */}
                                    </Card>
                                ))
                            ) : tipoAmputacion === TRANSFEMORAL_VALUE && transfemoralMeasurements.length > 0 ? (
                                transfemoralMeasurements.map((medida) => (
                                    <Card key={medida.idMedidaT || medida.IdMedidaT} className="border shadow-sm p-4 bg-gray-50">
                                        {/* Mostrar detalles de medidas transfemorales */}
                                        <p><strong>Longitud del Pie:</strong> {medida.longitudPie}</p>
                                        {/* Agrega más campos según tus necesidades */}
                                    </Card>
                                ))
                            ) : (
                                <p className="text-gray-500">No hay medidas anteriores.</p>
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




