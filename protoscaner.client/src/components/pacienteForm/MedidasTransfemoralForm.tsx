// src/components/MedidaTransfemoralForm.tsx

import React, { useState } from 'react';
import { createMedidaTransfemoral } from '../../services/MedidaTransfemoralService';
import { MedidaTransfemoralDTO } from '../../types/MedidaTransfemoral';

interface Props {
    pacienteId: number;
    linerId: number;
}

const MedidaTransfemoralForm: React.FC<Props> = ({ pacienteId, linerId }) => {
    const [form, setForm] = useState<Partial<MedidaTransfemoralDTO>>({
        IdPaciente: pacienteId,
        IdLiner: linerId,
        IdEscaneo: 0,
        FechaEscaneo: '',
        DisenadorSocket: '',
        LongitudPie: 0,
        AlturaTalon: 0,
        Medida1: 0,
        Medida2: 0,
        Circunferencias: [],
    });

    const [submissionStatus, setSubmissionStatus] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleCircunferenciaChange = (index: number, field: string, value: number) => {
        const updatedCircunferencias = [...(form.Circunferencias || [])];
        if (!updatedCircunferencias[index]) {
            updatedCircunferencias[index] = { IdMedida: 0, IdValor: 0, NumeroCircunferencia: 0, ValorMmSinPresion: 0, ValorMmConPresion: 0 };
        }
        (updatedCircunferencias[index] as any)[field] = value;
        setForm({
            ...form,
            Circunferencias: updatedCircunferencias,
        });
    };

    const addCircunferencia = () => {
        setForm({
            ...form,
            Circunferencias: [...(form.Circunferencias || []), { IdMedida: 0, IdValor: 0, NumeroCircunferencia: 0, ValorMmSinPresion: 0, ValorMmConPresion: 0 }],
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (form.IdPaciente && form.IdEscaneo && form.IdLiner && form.FechaEscaneo) {
                await createMedidaTransfemoral({
                    IdEscaneo: form.IdEscaneo,
                    IdValor: 0, // Ajusta según tu lógica
                    IdPaciente: form.IdPaciente,
                    FotoMunon: '', // Manejar la carga de imágenes si es necesario
                    FechaEscaneo: form.FechaEscaneo,
                    DisenadorSocket: form.DisenadorSocket!,
                    LongitudPie: parseFloat(form.LongitudPie!.toString()),
                    AlturaTalon: parseFloat(form.AlturaTalon!.toString()),
                    Medida1: parseFloat(form.Medida1!.toString()),
                    Medida2: parseFloat(form.Medida2!.toString()),
                    IdLiner: form.IdLiner!,
                    Circunferencias: form.Circunferencias!,
                });
                setSubmissionStatus('Medidas transfemorales creadas exitosamente.');
                // Resetear el formulario si es necesario
            } else {
                setSubmissionStatus('Por favor, completa todos los campos requeridos.');
            }
        } catch (error) {
            console.error('Error al crear MedidaTransfemoral:', error);
            setSubmissionStatus('Error al crear MedidaTransfemoral.');
        }
    };

    return (
        <div className="mt-6 p-4 border rounded-md">
            <h3 className="text-xl font-semibold mb-4">Medida Transfemoral</h3>
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

                    {/* Diseñador Socket */}
                    <div>
                        <label className="block text-gray-700">Diseñador Socket</label>
                        <input
                            type="text"
                            name="DisenadorSocket"
                            value={form.DisenadorSocket}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            required
                        />
                    </div>

                    {/* Longitud Pie */}
                    <div>
                        <label className="block text-gray-700">Longitud Pie</label>
                        <input
                            type="number"
                            name="LongitudPie"
                            value={form.LongitudPie}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            required
                        />
                    </div>

                    {/* Altura Talón */}
                    <div>
                        <label className="block text-gray-700">Altura Talón</label>
                        <input
                            type="number"
                            name="AlturaTalon"
                            value={form.AlturaTalon}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            required
                        />
                    </div>

                    {/* Medida1 */}
                    <div>
                        <label className="block text-gray-700">Medida 1</label>
                        <input
                            type="number"
                            name="Medida1"
                            value={form.Medida1}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            required
                        />
                    </div>

                    {/* Medida2 */}
                    <div>
                        <label className="block text-gray-700">Medida 2</label>
                        <input
                            type="number"
                            name="Medida2"
                            value={form.Medida2}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            required
                        />
                    </div>

                    {/* Circunferencias */}
                    <div className="col-span-2">
                        <label className="block text-gray-700">Circunferencias</label>
                        {form.Circunferencias?.map((circ, index) => (
                            <div key={index} className="border p-2 mb-2 rounded-md">
                                <h4 className="font-medium mb-2">Circunferencia {index + 1}</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700">Número Circunferencia</label>
                                        <input
                                            type="number"
                                            name="NumeroCircunferencia"
                                            value={circ.NumeroCircunferencia}
                                            onChange={(e) => handleCircunferenciaChange(index, 'NumeroCircunferencia', parseInt(e.target.value))}
                                            className="w-full border border-gray-300 p-2 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Valor Mm Sin Presión</label>
                                        <input
                                            type="number"
                                            name="ValorMmSinPresion"
                                            value={circ.ValorMmSinPresion}
                                            onChange={(e) => handleCircunferenciaChange(index, 'ValorMmSinPresion', parseFloat(e.target.value))}
                                            className="w-full border border-gray-300 p-2 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Valor Mm Con Presión</label>
                                        <input
                                            type="number"
                                            name="ValorMmConPresion"
                                            value={circ.ValorMmConPresion}
                                            onChange={(e) => handleCircunferenciaChange(index, 'ValorMmConPresion', parseFloat(e.target.value))}
                                            className="w-full border border-gray-300 p-2 rounded-md"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addCircunferencia}
                            className="mt-2 bg-gray-200 text-gray-700 p-2 rounded-md hover:bg-gray-300"
                        >
                            Añadir Circunferencia
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                >
                    Guardar Medida Transfemoral
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

export default MedidaTransfemoralForm;
