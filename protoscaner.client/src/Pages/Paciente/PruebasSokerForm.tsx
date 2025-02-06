


// src/pages/Paciente/NuevaPruebaSoker.tsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPruebaSocket } from '../../services/PruebaSocketService';
import MiniMenu from '../../components/ui/MiniMenu';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

const PruebasSokerForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const pacienteId = parseInt(id || '0', 10);

    const [formData, setFormData] = useState({
        idPaciente: pacienteId,
        ModificacionGeneral: '',
        QuienLaHizo: '',
        FechaPrueba: '',
        PracticaMarcha: '',
        FechaMantenimientoPostEntrega: '',
        SocketFallo: '',
        FechaFallo: '',
        MaterialRellenoUsado: '',
        IdComponente: 0,
        IdUsuario: 0,
        IdSocket: 0,
        PracticaRecibida: '',
        DuracionTerapia: '',
        FechaPractica: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createPruebaSocket(formData);
            toast.success('Prueba de soker creada exitosamente');
            navigate(`/PruebasSoker/${pacienteId}`);
        } catch (error: any) {
            console.error('Error creando la prueba de soker:', error);
            toast.error('No se pudo crear la prueba de soker');
        }
    };

    return (
        <div className="relative">
            <MiniMenu />
            <div className="container mx-auto p-6 max-w-2xl">
                <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Nueva Prueba de Soker</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Modificación General</label>
                        <textarea
                            name="ModificacionGeneral"
                            value={formData.ModificacionGeneral}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        ></textarea>
                    </div>
                    {/* Repite bloques similares para los demás campos */}

                    {/* Ejemplo para 'QuienLaHizo' */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Quién La Hizo</label>
                        <input
                            type="text"
                            name="QuienLaHizo"
                            value={formData.QuienLaHizo}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Continúa agregando campos según tu modelo */}

                    <Button type="submit" variant="primary" className="w-full">
                        Crear Prueba de Soker
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default PruebasSokerForm;
