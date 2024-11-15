import React, { useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FiTrash2, FiPlusCircle, FiCamera } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

const MedidasTransfemoralForm: React.FC = () => {
    const { register, control, setValue } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'circunferencias', // Matches DTO property for circunferencias
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setValue('fotoMunon', reader.result.toString()); // Convert to Base64
                    toast.success('Foto del Muñón cargada exitosamente.');
                }
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (fields.length === 0) {
            for (let i = 1; i <= 4; i++) {
                append({ numeroCircunferencia: i, valorMm: '' });
            }
        }
    }, [fields.length, append]);

    const addCircumference = () => {
        append({ numeroCircunferencia: fields.length + 1, valorMm: '' });
        toast.info(`Circunferencia ${fields.length + 1} añadida.`);
    };

    return (
        <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto md:max-w-full">
            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

            <h3 className="text-xl font-semibold text-center text-blue-700">Medidas Transfemorales</h3>

            {/* Longitud del Pie */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="block text-sm font-medium text-gray-700 flex-1">Longitud del Pie (cm)</label>
                <Input
                    type="text"
                    placeholder="Longitud del Pie (cm)"
                    {...register('longitudPie')}
                    className="w-full sm:flex-2"
                />
            </div>

            {/* Altura del Talón */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="block text-sm font-medium text-gray-700 flex-1">Altura del Talón (cm)</label>
                <Input
                    type="text"
                    placeholder="Altura del Talón (cm)"
                    {...register('alturaTalon')}
                    className="w-full sm:flex-2"
                />
            </div>

            {/* Medida 1 - Longitud perine a punta de muñón */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="block text-sm font-medium text-gray-700 flex-1">Medida 1: Longitud perine a punta de muñón (cm)</label>
                <Input
                    type="text"
                    placeholder="Longitud perine a punta de muñón"
                    {...register('medida1')}
                    className="w-full sm:flex-2"
                />
            </div>

            {/* Medida 2 - Medida de isquion a punta */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="block text-sm font-medium text-gray-700 flex-1">Medida 2: Isquion a punta (cm)</label>
                <Input
                    type="text"
                    placeholder="Isquion a punta"
                    {...register('medida2')}
                    className="w-full sm:flex-2"
                />
            </div>

            {/* Foto del Muñón */}
            <div className="flex items-center gap-4">
                <label className="block text-sm font-medium text-gray-700 flex-1">Foto del Muñón</label>
                <div className="flex items-center gap-2">
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full sm:w-auto"
                    />
                    <FiCamera className="h-6 w-6 text-blue-500" />
                </div>
            </div>

            {/* Circunferencias */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Medidas de Circunferencia (mm)</label>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-2">
                        <div className="flex-grow">
                            <Input
                                type="number"
                                placeholder={`Circunferencia ${index + 1} (mm)`}
                                {...register(`circunferencias.${index}.valorMm`)}
                                className="w-full mt-1 rounded-md border-gray-300"
                            />
                        </div>
                        <Button
                            type="button"
                            onClick={() => {
                                remove(index);
                                toast.warn(`Circunferencia ${index + 1} eliminada.`);
                            }}
                            className="bg-red-500 text-white p-2 rounded-full"
                            disabled={fields.length <= 4} // Ensures at least 4 fields remain
                        >
                            <FiTrash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                <Button
                    type="button"
                    onClick={addCircumference}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                >
                    <FiPlusCircle className="h-4 w-4" />
                    <span>Añadir Circunferencia</span>
                </Button>
            </div>
        </div>
    );
};

export default MedidasTransfemoralForm;

