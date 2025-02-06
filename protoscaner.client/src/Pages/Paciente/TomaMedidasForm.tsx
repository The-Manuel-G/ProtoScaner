import React, { useEffect, useState } from 'react';
import { createLiner } from '../../services/LinerService';
import { LinerDTO } from '../../types/Liner';
import { getHistorialPacienteIngresoByPacienteId } from '../../services/HistorialPacienteIngresoService';
import { HistorialPacienteIngresoDTO } from '../../types/HistorialPacienteIngreso';
import MedidaTranstibialForm from '../../components/pacienteForm/MedidasTranstibialForm';
import MedidaTransfemoralForm from '../../components/pacienteForm/MedidaTransfemoralForm';
import { createTomaMedidasEscaneo } from '../../services/TomaMedidasEscaneoService';
import { TomaMedidasEscaneo } from '../../types/TomaMedidasEscaneo';
import { tipoLiners, TALLAS } from '../../constants';
import { toast } from 'react-toastify';

interface Props {
    pacienteId: number;
}

const TomaMedidasEscaneoForm: React.FC<Props> = ({ pacienteId }) => {
    const [selectedTallaId, setSelectedTallaId] = useState<number | ''>('');
    const [selectedTipoLinerId, setSelectedTipoLinerId] = useState<number | ''>('');
    const [historial, setHistorial] = useState<HistorialPacienteIngresoDTO | null>(null);
    const [tipoAmputacion, setTipoAmputacion] = useState<number | null>(null);
    const [submissionStatus, setSubmissionStatus] = useState<string>('');
    const [linerId, setLinerId] = useState<number | null>(null);

    useEffect(() => {
        if (!pacienteId || pacienteId === 0) {
            console.error('El pacienteId es inválido:', pacienteId);
            toast.error('ID de paciente inválido. No se puede obtener el historial.');
            return;
        }

        const fetchHistorial = async () => {
            try {
                const data = await getHistorialPacienteIngresoByPacienteId(pacienteId);
                console.log('Datos obtenidos del historial:', data);

                if (Array.isArray(data) && data.length > 0) {
                    const ultimoHistorial = data[data.length - 1];
                    setHistorial(ultimoHistorial);
                    setTipoAmputacion(ultimoHistorial.TipoAmputacion);
                } else {
                    throw new Error('No se encontró historial para el paciente.');
                }
            } catch (error) {
                console.error('Error al obtener el historial del paciente:', error);
                toast.error('Error al obtener el historial del paciente.');
                setHistorial(null);
                setTipoAmputacion(null);
            }
        };

        fetchHistorial();
    }, [pacienteId]);

    const handleTipoLinerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tipoLinerId = parseInt(e.target.value);
        setSelectedTipoLinerId(tipoLinerId);
    };

    const handleTallaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tallaId = parseInt(e.target.value);
        setSelectedTallaId(tallaId);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            selectedTipoLinerId === '' ||
            selectedTallaId === '' ||
            !historial ||
            !tipoAmputacion
        ) {
            setSubmissionStatus('Por favor, completa todos los campos.');
            return;
        }

        try {
            const newLiner: Omit<LinerDTO, 'IdLiner'> = {
                TipoLinerId: selectedTipoLinerId as number,
                TallaId: selectedTallaId as number,
                PacienteId: pacienteId,
            };

            const createdLiner = await createLiner(newLiner);

            setLinerId(createdLiner.IdLiner);

            const payload: TomaMedidasEscaneo = {
                IdPaciente: historial.IdPaciente!,
                IdAmputacion: historial.TipoAmputacion!,
                IdLiner: createdLiner.IdLiner,
                FechaEscaneo: new Date().toISOString(),
                Comentario: 'Medidas tomadas',
                ResultadoScaneo: 'Pendiente',
            };

            await createTomaMedidasEscaneo(payload);
            setSubmissionStatus('Medidas escaneadas exitosamente.');
        } catch (error) {
            console.error('Error al crear el Liner y TomaMedidasEscaneo:', error);
            setSubmissionStatus('Error al escanear las medidas.');
        }
    };

    const getTipoAmputacionDescripcion = (tipoAmputacionId: number) => {
        switch (tipoAmputacionId) {
            case 1:
                return 'Transtibial';
            case 2:
                return 'Transfemoral';
            default:
                return 'Desconocido';
        }
    };

    if (!historial) {
        return (
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Toma de Medidas y Escaneo</h2>
                <p className="text-red-500">No se pudo obtener el historial del paciente. Por favor, verifica que el paciente existe y tiene historial registrado.</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Toma de Medidas y Escaneo</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <h3 className="text-lg font-medium">Información del Paciente</h3>
                    <p><strong>Paciente ID:</strong> {historial.IdPaciente}</p>
                    <p><strong>Tipo de Amputación:</strong> {getTipoAmputacionDescripcion(historial.TipoAmputacion!)}</p>
                </div>

                {/* Selección de Tipo de Liner */}
                <div className="mb-4">
                    <label className="block text-gray-700">Tipo de Liner</label>
                    <select
                        value={selectedTipoLinerId}
                        onChange={handleTipoLinerChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        required
                    >
                        <option value="">Selecciona un tipo de liner</option>
                        {tipoLiners.map(tipo => (
                            <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                        ))}
                    </select>
                </div>

                {/* Selección de Talla */}
                <div className="mb-4">
                    <label className="block text-gray-700">Talla</label>
                    <select
                        value={selectedTallaId}
                        onChange={handleTallaChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        required
                    >
                        <option value="">Selecciona una talla</option>
                        {tipoAmputacion === 1 && TALLAS.TRANSTIBIAL.map(talla => (
                            <option key={talla.id} value={talla.id}>{talla.name}</option>
                        ))}
                        {tipoAmputacion === 2 && TALLAS.TRANSFEMORAL.map(talla => (
                            <option key={talla.id} value={talla.id}>{talla.name}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                >
                    Guardar Toma de Medidas y Escaneo
                </button>

                {submissionStatus && (
                    <div className="mt-2 text-sm text-gray-700">
                        {submissionStatus}
                    </div>
                )}
            </form>

            {/* Mostrar formulario correspondiente según el tipo de amputación */}
            {tipoAmputacion === 1 && linerId && (
                <MedidaTranstibialForm
                    pacienteId={pacienteId}
                    linerId={linerId}
                />
            )}
            {tipoAmputacion === 2 && linerId && (
                <MedidaTransfemoralForm
                    pacienteId={pacienteId}
                    linerId={linerId}
                />
            )}
        </div>
    );
};

export default TomaMedidasEscaneoForm;
