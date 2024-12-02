// src/components/pacienteForm/MedidasTransfemoralForm.tsx

import React, { useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FiTrash2, FiPlusCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

interface Circunferencia {
    numeroCircunferencia: number;
    valorMmSinPresion: number;
    valorMmConPresion: number;
}

interface FormInputs {
    longitudPie?: string;
    alturaTalon?: string;
    medida1?: string;
    medida2?: string;
    circunferencias?: Circunferencia[];
    // Otros campos...
}

const MedidasTransfemoralForm: React.FC = () => {
    const { register, control } = useFormContext<FormInputs>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'circunferencias',
    });

    useEffect(() => {
        if (fields.length === 0) {
            append({ numeroCircunferencia: 1, valorMmSinPresion: 0, valorMmConPresion: 0 });
        }
    }, [fields.length, append]);

    const addCircunferencia = () => {
        append({ numeroCircunferencia: fields.length + 1, valorMmSinPresion: 0, valorMmConPresion: 0 });
        toast.info(`Circunferencia ${fields.length + 1} añadida.`);
    };

    return (
        <div className="space-y-6">
            {/* Longitud del Pie */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">Longitud del Pie (cm)</label>
                <Input
                    type="number"
                    {...register('longitudPie')}
                    className="w-full sm:w-2/3"
                    placeholder="Ingresa la longitud del pie"
                />
            </div>

            {/* Altura del Talón */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">Altura del Talón (cm)</label>
                <Input
                    type="number"
                    {...register('alturaTalon')}
                    className="w-full sm:w-2/3"
                    placeholder="Ingresa la altura del talón"
                />
            </div>

            {/* Medida 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">Medida 1: Longitud periné a punta de muñón (cm)</label>
                <Input
                    type="number"
                    {...register('medida1')}
                    className="w-full sm:w-2/3"
                    placeholder="Ingresa la medida 1"
                />
            </div>

            {/* Medida 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">Medida 2: Isquion a punta (cm)</label>
                <Input
                    type="number"
                    {...register('medida2')}
                    className="w-full sm:w-2/3"
                    placeholder="Ingresa la medida 2"
                />
            </div>

            {/* Circunferencias */}
            <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-700">Medidas de Circunferencia (mm)</h4>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <label className="block text-sm text-gray-600 w-full sm:w-1/4">
                            Circunferencia {field.numeroCircunferencia} (mm)
                        </label>
                        <Input
                            type="number"
                            {...register(`circunferencias.${index}.valorMmSinPresion` as const, { required: true })}
                            className="w-full sm:w-1/4"
                            placeholder="Sin Presión"
                        />
                        <Input
                            type="number"
                            {...register(`circunferencias.${index}.valorMmConPresion` as const, { required: true })}
                            className="w-full sm:w-1/4"
                            placeholder="Con Presión"
                        />
                        <Button
                            type="button"
                            onClick={() => {
                                remove(index);
                                toast.warn(`Circunferencia ${field.numeroCircunferencia} eliminada.`);
                            }}
                            className="bg-red-500 text-white p-2 rounded-full"
                            disabled={fields.length <= 1}
                            title="Eliminar Circunferencia"
                        >
                            <FiTrash2 />
                        </Button>
                    </div>
                ))}
                <Button
                    type="button"
                    onClick={addCircunferencia}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                    <FiPlusCircle /> Añadir Circunferencia
                </Button>
            </div>
        </div>
    );
};

export default MedidasTransfemoralForm;
