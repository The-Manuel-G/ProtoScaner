// src/components/LinerForm.tsx

import React, { useEffect, useState } from 'react';
import { getTallasByTipoAmputacion, getTipoLiners } from '../../../services/TallaService';
import { getPacientes } from '../../../services/PacienteService';
import { createLiner, updateLiner, getLiner } from '../../../services/LinerService';
import { Liner } from '../../../types/Liner';
import { Paciente } from '../../../types/Paciente';
import { TipoLiner } from '../../../types/TipoLiner';
import { Talla } from '../../../types/Talla';
import { getHistorialPacienteIngresoByPacienteId } from '../../../services/HistorialPacienteIngresoService';

interface LinerFormProps {
    linerId?: number;
    onSuccess?: () => void;
}

const LinerForm: React.FC<LinerFormProps> = ({ linerId, onSuccess }) => {
    const [tipoLiners, setTipoLiners] = useState<TipoLiner[]>([]);
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [tallas, setTallas] = useState<Talla[]>([]);
    const [selectedTipoAmputacionId, setSelectedTipoAmputacionId] = useState<number | null>(null);

    const [form, setForm] = useState<Liner>({
        idLiner: 0,
        tipoLinerId: 0,
        tallaId: 0,
        pacienteId: undefined,
    });

    const [submissionStatus, setSubmissionStatus] = useState<string>('');

    useEffect(() => {
        // Obtener todos los TipoLiner
        const fetchTipoLiners = async () => {
            try {
                const data = await getTipoLiners();
                setTipoLiners(data);
            } catch (error) {
                console.error('Error al obtener TipoLiners:', error);
            }
        };

        // Obtener todos los pacientes
        const fetchPacientes = async () => {
            try {
                const data = await getPacientes();
                setPacientes(data);
            } catch (error) {
                console.error('Error al obtener pacientes:', error);
            }
        };

        fetchTipoLiners();
        fetchPacientes();
    }, []);

    useEffect(() => {
        // Si se está editando un liner, cargar sus datos
        const fetchLiner = async () => {
            if (linerId) {
                try {
                    const data = await getLiner(linerId);
                    setForm(data);
                    if (data.pacienteId) {
                        // Obtener el TipoAmputacion del paciente
                        const historial = await getHistorialPacienteIngresoByPacienteId(data.pacienteId);
                        setSelectedTipoAmputacionId(historial.tipoAmputacion);
                        const tallasData = await getTallasByTipoAmputacion(historial.tipoAmputacion);
                        setTallas(tallasData);
                    }
                } catch (error) {
                    console.error('Error al obtener el liner:', error);
                }
            }
        };

        fetchLiner();
    }, [linerId, pacientes]);

    useEffect(() => {
        // Cuando se selecciona un paciente, obtener el TipoAmputacion y las tallas correspondientes
        const fetchTallas = async () => {
            if (form.pacienteId) {
                try {
                    // Obtener el historial del paciente para determinar el TipoAmputacion
                    const historial = await getHistorialPacienteIngresoByPacienteId(form.pacienteId);
                    setSelectedTipoAmputacionId(historial.tipoAmputacion);
                    const tallasData = await getTallasByTipoAmputacion(historial.tipoAmputacion);
                    setTallas(tallasData);
                } catch (error) {
                    console.error('Error al obtener tallas por TipoAmputacion:', error);
                    setTallas([]);
                    setSelectedTipoAmputacionId(null);
                }
            } else {
                setTallas([]);
                setSelectedTipoAmputacionId(null);
            }
        };

        fetchTallas();
    }, [form.pacienteId]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value ? parseInt(value) : undefined,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (linerId) {
                await updateLiner(linerId, form);
                setSubmissionStatus('Liner actualizado exitosamente.');
            } else {
                await createLiner(form);
                setSubmissionStatus('Liner creado exitosamente.');
                setForm({
                    idLiner: 0,
                    tipoLinerId: 0,
                    tallaId: 0,
                    pacienteId: undefined,
                });
            }
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Error al guardar el liner:', error);
            setSubmissionStatus('Error al guardar el liner.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4">{linerId ? 'Editar Liner' : 'Crear Liner'}</h2>
            <form onSubmit={handleSubmit}>
                {/* Seleccionar Paciente */}
                <div className="mb-4">
                    <label htmlFor="pacienteId" className="block text-gray-700 font-medium mb-2">
                        Seleccionar Paciente
                    </label>
                    <select
                        id="pacienteId"
                        name="pacienteId"
                        value={form.pacienteId || ''}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        required
                    >
                        <option value="">-- Selecciona un Paciente --</option>
                        {pacientes.map(paciente => (
                            <option key={paciente.idPaciente} value={paciente.idPaciente}>
                                {`ID: ${paciente.idPaciente} - Nombre: ${paciente.nombre}`}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Seleccionar TipoLiner */}
                <div className="mb-4">
                    <label htmlFor="tipoLinerId" className="block text-gray-700 font-medium mb-2">
                        Tipo de Liner
                    </label>
                    <select
                        id="tipoLinerId"
                        name="tipoLinerId"
                        value={form.tipoLinerId || ''}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        required
                    >
                        <option value="">-- Selecciona un Tipo de Liner --</option>
                        {tipoLiners.map(tipoLiner => (
                            <option key={tipoLiner.idTipoLiner} value={tipoLiner.idTipoLiner}>
                                {tipoLiner.descripcion}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Seleccionar Talla */}
                <div className="mb-4">
                    <label htmlFor="tallaId" className="block text-gray-700 font-medium mb-2">
                        Seleccionar Talla
                    </label>
                    <select
                        id="tallaId"
                        name="tallaId"
                        value={form.tallaId || ''}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        required
                        disabled={!selectedTipoAmputacionId}
                    >
                        <option value="">-- Selecciona una Talla --</option>
                        {tallas.map(talla => (
                            <option key={talla.idTalla} value={talla.idTalla}>
                                {talla.tallaNombre}
                            </option>
                        ))}
                    </select>
                    {!selectedTipoAmputacionId && (
                        <p className="text-sm text-gray-500 mt-1">Selecciona un paciente para cargar las tallas disponibles.</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    {linerId ? 'Actualizar Liner' : 'Crear Liner'}
                </button>
            </form>

            {/* Mensaje de estado */}
            {submissionStatus && (
                <div className="mt-4 p-2 bg-gray-100 rounded-md">
                    {submissionStatus}
                </div>
            )}
        </div>
    );
};

export default LinerForm;
