// src/components/pacienteForm/MedidasTranstibialForm.tsx

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FaInfo, FaPlusCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface FormInputs {
    longitudTotalMunon?: number;
    circunferencia3cm?: number;
    circunferencia6cm?: number;
    circunferencia9cm?: number;
    circunferencia12cm?: number;
    circunferencia15cm?: number;
    circunferencia21cm?: number;
    circunferencia24cm?: number;
    circunferencia27cm?: number;
    circunferencia30cm?: number;
    mlSobreRodilla?: number;
    apTension?: number;
    mlSupracondilar?: number;
    mlTendon?: number;
    notas?: string;
    longitudOsea?: string;
    longitudPies?: string;
    alturaTacon?: string;
}

const MedidasTranstibialForm: React.FC = () => {
    const { register } = useFormContext<FormInputs>();

    const handleBlur = (field: string, message: string) => {
        toast.success(`${field} guardada correctamente.`);
    };

    return (
        <div className="space-y-6">
            {/* Longitud Total del Muñón */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">
                    Longitud Total del Muñón (cm)
                    <FaInfo title="Distancia total de la base a la punta del muñón" className="inline ml-1 text-gray-500" />
                </label>
                <Input
                    type="number"
                    {...register('longitudTotalMunon')}
                    className="w-full sm:w-2/3"
                    placeholder="Ingresa la longitud total del muñón"
                    onBlur={() => handleBlur('Longitud Total del Muñón', 'Longitud guardada')}
                />
            </div>

            {/* Circunferencias */}
            <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-700">Medidas de Circunferencia (cm)</h4>
                {['3', '6', '9', '12', '15', '21', '24', '27', '30'].map((value) => (
                    <div key={value} className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">
                            Circunferencia a {value} cm
                        </label>
                        <Input
                            type="number"
                            {...register(`circunferencia${value}cm` as const)}
                            className="w-full sm:w-2/3"
                            placeholder={`Ingresa la circunferencia a ${value} cm`}
                            onBlur={() => handleBlur(`Circunferencia a ${value} cm`, `Circunferencia a ${value} cm guardada`)}
                        />
                    </div>
                ))}
            </div>

            {/* Otras Medidas */}
            <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-700">Otras Medidas</h4>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">ML sobre Rodilla (cm)</label>
                    <Input
                        type="number"
                        {...register('mlSobreRodilla')}
                        className="w-full sm:w-2/3"
                        placeholder="Ingresa ML sobre Rodilla"
                        onBlur={() => handleBlur('ML sobre Rodilla', 'ML sobre Rodilla guardada')}
                    />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">AP Tensión (cm)</label>
                    <Input
                        type="number"
                        {...register('apTension')}
                        className="w-full sm:w-2/3"
                        placeholder="Ingresa AP Tensión"
                        onBlur={() => handleBlur('AP Tensión', 'AP Tensión guardada')}
                    />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">ML Supracondilar (cm)</label>
                    <Input
                        type="number"
                        {...register('mlSupracondilar')}
                        className="w-full sm:w-2/3"
                        placeholder="Ingresa ML Supracondilar"
                        onBlur={() => handleBlur('ML Supracondilar', 'ML Supracondilar guardada')}
                    />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">ML Tendón (cm)</label>
                    <Input
                        type="number"
                        {...register('mlTendon')}
                        className="w-full sm:w-2/3"
                        placeholder="Ingresa ML Tendón"
                        onBlur={() => handleBlur('ML Tendón', 'ML Tendón guardada')}
                    />
                </div>
            </div>

            {/* Notas */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">Notas</label>
                <Textarea
                    {...register('notas')}
                    placeholder="Escriba aquí las observaciones adicionales..."
                    className="w-full sm:w-2/3"
                />
            </div>

            {/* Longitud Ósea */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">Longitud Ósea (cm)</label>
                <Input
                    type="number"
                    {...register('longitudOsea')}
                    className="w-full sm:w-2/3"
                    placeholder="Ingresa la longitud ósea"
                />
            </div>

            {/* Longitud de los Pies */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">Longitud Pies (cm)</label>
                <Input
                    type="number"
                    {...register('longitudPies')}
                    className="w-full sm:w-2/3"
                    placeholder="Ingresa la longitud de los pies"
                />
            </div>

            {/* Altura del Tacón */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">Altura del Tacón (cm)</label>
                <Input
                    type="number"
                    {...register('alturaTacon')}
                    className="w-full sm:w-2/3"
                    placeholder="Ingresa la altura del tacón"
                />
            </div>

            {/* Botón de Guardar */}
            <div className="flex justify-end">
                <Button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                    Guardar Medidas Transtibiales <FaPlusCircle />
                </Button>
            </div>
        </div>
    );
};

export default MedidasTranstibialForm;
