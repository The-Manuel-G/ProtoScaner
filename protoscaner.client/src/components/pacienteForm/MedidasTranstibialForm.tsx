import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FiInfo, FiPlusCircle } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MedidasTranstibialForm: React.FC = () => {
    const { register } = useFormContext();

    const notify = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        if (type === 'success') toast.success(message);
        else if (type === 'error') toast.error(message);
        else toast.info(message);
    };

    return (
        <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto md:max-w-full">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

            <h3 className="text-xl font-semibold text-center text-blue-700">Medidas Transtibiales</h3>

            {/* Longitud Total del Muñón */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="block text-sm font-medium text-gray-700 flex-1">
                    Longitud Total del Muñón (cm)
                    <FiInfo title="Distancia total de la base a la punta del muñón" className="inline ml-1 text-gray-500" />
                </label>
                <Input
                    type="number"
                    placeholder="Longitud Total del Muñón"
                    {...register('longitudTotalMunon')}
                    className="w-full sm:flex-2"
                    onBlur={() => notify('Campo de longitud total del muñón completado')}
                />
            </div>

            {/* Circunferencias */}
            <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">Medidas de Circunferencia (cm)</label>
                {['3', '6', '9', '12', '15', '21', '24', '27', '30'].map((value) => (
                    <div key={value} className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <label className="block text-sm text-gray-600 sm:w-1/4">
                            Circunferencia a {value} cm
                        </label>
                        <Input
                            type="number"
                            placeholder={`Circunferencia a ${value} cm`}
                            {...register(`circunferencia${value}cm` as const)}
                            className="w-full sm:flex-1"
                            onBlur={() => notify(`Circunferencia a ${value} cm guardada`)}
                        />
                    </div>
                ))}
            </div>

            {/* Medidas ML y AP */}
            <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">Otras Medidas</label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <label className="block text-sm text-gray-600 sm:w-1/4">ML sobre Rodilla (cm)</label>
                    <Input
                        type="number"
                        placeholder="ML sobre Rodilla"
                        {...register('mlSobreRodilla')}
                        className="w-full sm:flex-1"
                    />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <label className="block text-sm text-gray-600 sm:w-1/4">AP Tensión (cm)</label>
                    <Input
                        type="number"
                        placeholder="AP Tensión"
                        {...register('apTension')}
                        className="w-full sm:flex-1"
                    />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <label className="block text-sm text-gray-600 sm:w-1/4">ML Supracondilar (cm)</label>
                    <Input
                        type="number"
                        placeholder="ML Supracondilar"
                        {...register('mlSupracondilar')}
                        className="w-full sm:flex-1"
                    />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <label className="block text-sm text-gray-600 sm:w-1/4">ML Tendón (cm)</label>
                    <Input
                        type="number"
                        placeholder="ML Tendón"
                        {...register('mlTendon')}
                        className="w-full sm:flex-1"
                    />
                </div>
            </div>

            {/* Notas */}
            <div className="flex flex-col sm:flex-row gap-4">
                <label className="block text-sm font-medium text-gray-700 flex-1">Notas</label>
                <Textarea
                    placeholder="Escriba aquí las observaciones adicionales..."
                    {...register('notas')}
                    className="w-full sm:flex-1"
                />
            </div>

            <div className="flex justify-end mt-4">
                <Button
                    type="button"
                    onClick={() => notify('Formulario de medidas Transtibiales guardado correctamente', 'success')}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                    Guardar Medidas Transtibiales
                    <FiPlusCircle className="inline ml-2" />
                </Button>
            </div>
        </div>
    );
};

export default MedidasTranstibialForm;
