// src/components/MedidaTranstibialForm.tsx

import React, { useState } from 'react';
import { createMedidaTranstibial } from '../../services/MedidaTranstibialService';
import { MedidaTranstibialDTO } from '../../types/MedidaTranstibial';

interface Props {
    pacienteId: number;
    linerId: number;
}

const MedidaTranstibialForm: React.FC<Props> = ({ pacienteId, linerId }) => {
    const [form, setForm] = useState<Partial<MedidaTranstibialDTO>>({
        IdPaciente: pacienteId,
        IdLiner: linerId,
        IdEscaneo: 0,
        FechaEscaneo: '',
        Protesista: '',
        Insidencia: '',
        LongitudTotalMunon: 0,
        Circunferencia3cm: 0,
        Circunferencia6cm: 0,
        Circunferencia9cm: 0,
        Circunferencia12cm: 0,
        Circunferencia15cm: 0,
        Circunferencia21cm: 0,
        Circunferencia24cm: 0,
        Circunferencia27cm: 0,
        Circunferencia30cm: 0,
        MlSobreRodilla: 0,
        ApTension: 0,
        MlSupracondilar: 0,
        MlTendon: 0,
        Notas: '',
        LongitudOsea: 0,
        LongitudPies: 0,
        AlturaTacon: 0,
    });

    const [submissionStatus, setSubmissionStatus] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (form.IdPaciente && form.IdEscaneo && form.IdLiner) {
                await createMedidaTranstibial({
                    IdPaciente: form.IdPaciente,
                    IdEscaneo: form.IdEscaneo,
                    FechaEscaneo: form.FechaEscaneo!,
                    Protesista: form.Protesista!,
                    IdLiner: form.IdLiner,
                    Insidencia: form.Insidencia!,
                    LongitudTotalMunon: parseFloat(form.LongitudTotalMunon!.toString()),
                    Circunferencia3cm: parseFloat(form.Circunferencia3cm!.toString()),
                    Circunferencia6cm: parseFloat(form.Circunferencia6cm!.toString()),
                    Circunferencia9cm: parseFloat(form.Circunferencia9cm!.toString()),
                    Circunferencia12cm: parseFloat(form.Circunferencia12cm!.toString()),
                    Circunferencia15cm: parseFloat(form.Circunferencia15cm!.toString()),
                    Circunferencia21cm: parseFloat(form.Circunferencia21cm!.toString()),
                    Circunferencia24cm: parseFloat(form.Circunferencia24cm!.toString()),
                    Circunferencia27cm: parseFloat(form.Circunferencia27cm!.toString()),
                    Circunferencia30cm: parseFloat(form.Circunferencia30cm!.toString()),
                    MlSobreRodilla: parseFloat(form.MlSobreRodilla!.toString()),
                    ApTension: parseFloat(form.ApTension!.toString()),
                    MlSupracondilar: parseFloat(form.MlSupracondilar!.toString()),
                    MlTendon: parseFloat(form.MlTendon!.toString()),
                    Notas: form.Notas!,
                    LongitudOsea: parseFloat(form.LongitudOsea!.toString()),
                    LongitudPies: parseFloat(form.LongitudPies!.toString()),
                    AlturaTacon: parseFloat(form.AlturaTacon!.toString()),
                });
                setSubmissionStatus('Medidas transtibiales creadas exitosamente.');
                // Puedes resetear el formulario aquí si lo deseas
            } else {
                setSubmissionStatus('Por favor, completa todos los campos requeridos.');
            }
        } catch (error) {
            console.error('Error al crear MedidaTranstibial:', error);
            setSubmissionStatus('Error al crear MedidaTranstibial.');
        }
    };

    return (
        <div className="mt-6 p-4 border rounded-md">
            <h3 className="text-xl font-semibold mb-4">Medida Transtibial</h3>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    {/* ID Paciente */}
                    <div>
                        <label className="block text-gray-700">ID Paciente</label>
                        <input
                            type="number"
                            name="IdPaciente"
                            value={form.IdPaciente}
                            readOnly
                            className="w-full border border-gray-300 p-2 rounded-md bg-gray-100"
                        />
                    </div>

                    {/* ID Liner */}
                    <div>
                        <label className="block text-gray-700">ID Liner</label>
                        <input
                            type="number"
                            name="IdLiner"
                            value={form.IdLiner}
                            readOnly
                            className="w-full border border-gray-300 p-2 rounded-md bg-gray-100"
                        />
                    </div>

                    {/* ID Escaneo */}
                    <div>
                        <label className="block text-gray-700">ID Escaneo</label>
                        <input
                            type="number"
                            name="IdEscaneo"
                            value={form.IdEscaneo}
                            onChange={(e) => setForm({ ...form, IdEscaneo: parseInt(e.target.value) })}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            required
                        />
                    </div>

                    {/* Fecha Escaneo */}
                    <div>
                        <label className="block text-gray-700">Fecha Escaneo</label>
                        <input
                            type="date"
                            name="FechaEscaneo"
                            value={form.FechaEscaneo}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            required
                        />
                    </div>

                    {/* Protesista */}
                    <div>
                        <label className="block text-gray-700">Protesista</label>
                        <input
                            type="text"
                            name="Protesista"
                            value={form.Protesista}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            required
                        />
                    </div>

                    {/* Insidencia */}
                    <div>
                        <label className="block text-gray-700">Incidencia</label>
                        <input
                            type="text"
                            name="Insidencia"
                            value={form.Insidencia}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>

                    {/* Longitud Total Muñón */}
                    <div>
                        <label className="block text-gray-700">Longitud Total Muñón</label>
                        <input
                            type="number"
                            name="LongitudTotalMunon"
                            value={form.LongitudTotalMunon}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>

                    {/* Circunferencias */}
                    <div className="col-span-2">
                        <label className="block text-gray-700">Circunferencias</label>
                        <div className="grid grid-cols-4 gap-4">
                            {['3cm', '6cm', '9cm', '12cm', '15cm', '21cm', '24cm', '27cm', '30cm'].map((label, index) => {
                                const fieldName = `Circunferencia${label.replace('cm', '')}cm`;
                                return (
                                    <div key={index}>
                                        <label className="block text-gray-700">{label}</label>
                                        <input
                                            type="number"
                                            name={fieldName}
                                            value={(form as any)[fieldName]}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 p-2 rounded-md"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ML Sobre Rodilla */}
                    <div>
                        <label className="block text-gray-700">ML Sobre Rodilla</label>
                        <input
                            type="number"
                            name="MlSobreRodilla"
                            value={form.MlSobreRodilla}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>

                    {/* AP Tensión */}
                    <div>
                        <label className="block text-gray-700">AP Tensión</label>
                        <input
                            type="number"
                            name="ApTension"
                            value={form.ApTension}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>

                    {/* ML Supracondilar */}
                    <div>
                        <label className="block text-gray-700">ML Supracondilar</label>
                        <input
                            type="number"
                            name="MlSupracondilar"
                            value={form.MlSupracondilar}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>

                    {/* ML Tendón */}
                    <div>
                        <label className="block text-gray-700">ML Tendón</label>
                        <input
                            type="number"
                            name="MlTendon"
                            value={form.MlTendon}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>

                    {/* Notas */}
                    <div className="col-span-2">
                        <label className="block text-gray-700">Notas</label>
                        <textarea
                            name="Notas"
                            value={form.Notas}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        ></textarea>
                    </div>

                    {/* Longitud Ósea */}
                    <div>
                        <label className="block text-gray-700">Longitud Ósea</label>
                        <input
                            type="number"
                            name="LongitudOsea"
                            value={form.LongitudOsea}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>

                    {/* Longitud Pies */}
                    <div>
                        <label className="block text-gray-700">Longitud Pies</label>
                        <input
                            type="number"
                            name="LongitudPies"
                            value={form.LongitudPies}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>

                    {/* Altura Tacón */}
                    <div>
                        <label className="block text-gray-700">Altura Tacón</label>
                        <input
                            type="number"
                            name="AlturaTacon"
                            value={form.AlturaTacon}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                >
                    Guardar Medida Transtibial
                </button>
            </form>
            {submissionStatus && (
                <div className="mt-2 text-sm text-gray-700">
                    {submissionStatus}
                </div>
            )}
        </div>
    );
};

export default MedidaTranstibialForm;
