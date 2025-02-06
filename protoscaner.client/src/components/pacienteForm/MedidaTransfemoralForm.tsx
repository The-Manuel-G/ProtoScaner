// src/components/pacienteForm/MedidaTransfemoralForm.tsx

import React, { useState } from 'react';
import { createMedidaTransfemoral } from '../../services/MedidaTransfemoralService';
import { CreateMedidaTransfemoral, CreateCircunferencia } from '../../types/CreateMedidaTransfemoral';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import MiniMenu from '@/components/ui/MiniMenu';

interface MedidaTransfemoralFormProps {
    pacienteId: number;
    onSuccess: () => void;
}

const MedidaTransfemoralForm: React.FC<MedidaTransfemoralFormProps> = ({ pacienteId, onSuccess }) => {
    const [formData, setFormData] = useState<CreateMedidaTransfemoral>({
        IdEscaneo: 0,
        IdValor: 0,
        IdPaciente: pacienteId,
        FotoMunon: '',
        FechaEscaneo: '',
        DisenadorSocket: '',
        LongitudPie: 0,
        AlturaTalon: 0,
        Medida1: 0,
        Medida2: 0,
        IdLiner: 0,
        Circunferencias: [],
    });

    const [circunferencias, setCircunferencias] = useState<CreateCircunferencia[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCircunferenciaChange = (index: number, field: keyof CreateCircunferencia, value: string) => {
        const updated = [...circunferencias];
        updated[index][field] = Number(value);
        setCircunferencias(updated);
    };

    const addCircunferencia = () => {
        setCircunferencias([...circunferencias, {
            IdValor: 0,
            NumeroCircunferencia: 0,
            ValorMmSinPresion: 0,
            ValorMmConPresion: 0,
        }]);
    };

    const removeCircunferencia = (index: number) => {
        const updated = [...circunferencias];
        updated.splice(index, 1);
        setCircunferencias(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const medidaData: CreateMedidaTransfemoral = {
            ...formData,
            FechaEscaneo: new Date(formData.FechaEscaneo).toISOString(),
            Circunferencias: circunferencias,
        };

        try {
            await createMedidaTransfemoral(medidaData);
            toast.success('Medida Transfemoral creada exitosamente');
            onSuccess();
            // Reset form
            setFormData({
                IdEscaneo: 0,
                IdValor: 0,
                IdPaciente: pacienteId,
                FotoMunon: '',
                FechaEscaneo: '',
                DisenadorSocket: '',
                LongitudPie: 0,
                AlturaTalon: 0,
                Medida1: 0,
                Medida2: 0,
                IdLiner: 0,
                Circunferencias: [],
            });
            setCircunferencias([]);
        } catch (error: any) {
            console.error('Error creando la Medida Transfemoral:', error);
            toast.error('No se pudo crear la Medida Transfemoral');
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setFormData(prev => ({
                    ...prev,
                    FotoMunon: base64.split(',')[1], // Remove the data URL prefix
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="relative">
            <MiniMenu />
            <div className="container mx-auto p-6 max-w-3xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Tomar Nueva Medida Transfemoral</h2>
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">ID Escaneo</label>
                        <input
                            type="number"
                            name="IdEscaneo"
                            value={formData.IdEscaneo}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">ID Valor</label>
                        <input
                            type="number"
                            name="IdValor"
                            value={formData.IdValor}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Foto del Muñón</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full"
                        />
                        {formData.FotoMunon && (
                            <img
                                src={`data:image/jpeg;base64,${formData.FotoMunon}`}
                                alt="Foto del Muñón"
                                className="mt-2 w-32 h-32 object-cover rounded border"
                            />
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Fecha de Escaneo</label>
                        <input
                            type="date"
                            name="FechaEscaneo"
                            value={formData.FechaEscaneo}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Diseñador del Socket</label>
                        <input
                            type="text"
                            name="DisenadorSocket"
                            value={formData.DisenadorSocket}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Longitud del Pie (mm)</label>
                        <input
                            type="number"
                            name="LongitudPie"
                            value={formData.LongitudPie}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Altura del Talón (mm)</label>
                        <input
                            type="number"
                            name="AlturaTalon"
                            value={formData.AlturaTalon}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Medida 1 (mm)</label>
                        <input
                            type="number"
                            name="Medida1"
                            value={formData.Medida1}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Medida 2 (mm)</label>
                        <input
                            type="number"
                            name="Medida2"
                            value={formData.Medida2}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">ID Liner</label>
                        <input
                            type="number"
                            name="IdLiner"
                            value={formData.IdLiner}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    {/* Circunferencias Dinámicas */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Circunferencias</label>
                        {circunferencias.map((circ, index) => (
                            <div key={index} className="mb-2 p-4 border rounded bg-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold">Circunferencia {index + 1}</h4>
                                    <button
                                        type="button"
                                        onClick={() => removeCircunferencia(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                                <div className="mb-2">
                                    <label className="block text-gray-700 font-semibold mb-1">ID Valor</label>
                                    <input
                                        type="number"
                                        value={circ.IdValor}
                                        onChange={(e) => handleCircunferenciaChange(index, 'IdValor', e.target.value)}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-gray-700 font-semibold mb-1">Número de Circunferencia</label>
                                    <input
                                        type="number"
                                        value={circ.NumeroCircunferencia}
                                        onChange={(e) => handleCircunferenciaChange(index, 'NumeroCircunferencia', e.target.value)}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-gray-700 font-semibold mb-1">Valor mm Sin Presión</label>
                                    <input
                                        type="number"
                                        value={circ.ValorMmSinPresion}
                                        onChange={(e) => handleCircunferenciaChange(index, 'ValorMmSinPresion', e.target.value)}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-gray-700 font-semibold mb-1">Valor mm Con Presión</label>
                                    <input
                                        type="number"
                                        value={circ.ValorMmConPresion}
                                        onChange={(e) => handleCircunferenciaChange(index, 'ValorMmConPresion', e.target.value)}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                            </div>
                        ))}
                        <Button type="button" onClick={addCircunferencia} className="flex items-center gap-2">
                            Agregar Circunferencia
                        </Button>
                    </div>

                    <div className="text-center">
                        <Button type="submit" variant="primary" className="w-full">
                            Guardar Medida Transfemoral
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MedidaTransfemoralForm;
