import React, { useState, useEffect } from 'react';
import { useForm, FormProvider, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { FaPlusCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tipoLiners, tallas } from '../../constants'; // Asegúrate de importar correctamente las constantes
import { TomaMedidasEscaneo } from '../../types/TomaMedidasEscaneo';
import { createTomaMedidasEscaneo } from '../../services/TomaMedidasEscaneoService';

interface FormInputs {
    idPaciente: number;
    idAmputacion: number;
    idLiner: number;
    tallaLiner: number;
    fechaEscaneo: string;
    fotosMunon: string | null; // Base64 string
    comentario?: string;
    resultadoScaneo: string;
    resultadoDoc: string | null; // Base64 string (PDF)
}

interface TomaMedidasFormProps {
    idPaciente: number;
    idAmputacion: number; // Recibir idAmputacion como prop
}

const TomaMedidasForm: React.FC<TomaMedidasFormProps> = ({ idPaciente, idAmputacion }) => {
    const methods = useForm<FormInputs>({
        defaultValues: {
            idPaciente: idPaciente,
            idAmputacion: idAmputacion,
            idLiner: 0,
            tallaLiner: 0,
            fechaEscaneo: '',
            fotosMunon: null,
            comentario: '',
            resultadoScaneo: '',
            resultadoDoc: null,
        }
    });
    const { register, handleSubmit, setValue, watch, control } = methods;
    const [step, setStep] = useState<number>(1);
    const [tipoAmputacion, setTipoAmputacion] = useState<number | null>(idAmputacion);

    useEffect(() => {
        setTipoAmputacion(idAmputacion);
    }, [idAmputacion]);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            // Preparar el payload
            const payload: TomaMedidasEscaneo = {
                idEscaneo: 0, // Será asignado por el backend
                idPaciente: data.idPaciente,
                idAmputacion: data.idAmputacion,
                idLiner: data.idLiner,
                tallaLiner: data.tallaLiner,
                fechaEscaneo: data.fechaEscaneo,
                fotosMunon: data.fotosMunon,
                comentario: data.comentario,
                resultadoScaneo: data.resultadoScaneo,
                resultadoDoc: data.resultadoDoc ? data.resultadoDoc.split(',')[1] : null, // Asegurarse de que el Base64 esté limpio
            };

            await createTomaMedidasEscaneo(payload);
            toast.success('Toma de medidas creada exitosamente.');
            methods.reset({
                idPaciente: idPaciente,
                idAmputacion: idAmputacion,
                idLiner: 0,
                tallaLiner: 0,
                fechaEscaneo: '',
                fotosMunon: null,
                comentario: '',
                resultadoScaneo: '',
                resultadoDoc: null,
            });
            setStep(1);
        } catch (error: any) {
            console.error('Error al crear la toma de medidas:', error);
            toast.error('Error al crear la toma de medidas.');
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormInputs) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result?.toString().split(',')[1] || null;
                setValue(field, base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const linerOptions = tipoLiners;
    const tallaOptions = tallas;

    return (
        <FormProvider {...methods}>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-md shadow-md max-w-4xl mx-auto">
                {step === 1 && (
                    <div className="space-y-6">
                        {/* Tipo de Amputación (oculto) */}
                        <input
                            type="hidden"
                            {...register('idAmputacion')}
                        />

                        {/* Tipo de Liner */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">Tipo de Liner</label>
                            <Controller
                                control={control}
                                name="idLiner"
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className="w-full sm:w-2/3"
                                        placeholder="Selecciona el tipo de liner"
                                    >
                                        <option value="">Selecciona</option>
                                        {linerOptions.map((liner) => (
                                            <option key={liner.value} value={liner.value}>
                                                {liner.label}
                                            </option>
                                        ))}
                                    </Select>
                                )}
                            />
                        </div>

                        {/* Talla del Liner */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">Talla del Liner</label>
                            <Controller
                                control={control}
                                name="tallaLiner"
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className="w-full sm:w-2/3"
                                        placeholder="Selecciona la talla del liner"
                                    >
                                        <option value="">Selecciona</option>
                                        {tallaOptions.map((talla) => (
                                            <option key={talla.value} value={talla.value}>
                                                {talla.label}
                                            </option>
                                        ))}
                                    </Select>
                                )}
                            />
                        </div>

                        {/* Fecha de Escaneo */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">Fecha de Escaneo</label>
                            <Input
                                type="date"
                                {...register('fechaEscaneo', { required: true })}
                                className="w-full sm:w-2/3"
                            />
                        </div>

                        {/* Foto del Muñón */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">Foto del Muñón</label>
                            <Input
                                type="file"
                                onChange={(e) => handleFileChange(e, 'fotosMunon')}
                                className="w-full sm:w-2/3"
                            />
                        </div>

                        {/* Documento Resultado */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">Documento Resultado</label>
                            <Input
                                type="file"
                                onChange={(e) => handleFileChange(e, 'resultadoDoc')}
                                className="w-full sm:w-2/3"
                            />
                        </div>

                        {/* Comentarios */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/3">Comentario</label>
                            <Textarea
                                {...register('comentario')}
                                className="w-full sm:w-2/3"
                            />
                        </div>

                        <div className="flex justify-between gap-4">
                            <Button type="button" onClick={() => setStep(2)} className="bg-blue-600 hover:bg-blue-700 text-white">
                                Siguiente <FaArrowRight />
                            </Button>
                            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                                Guardar <FaPlusCircle />
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </FormProvider>
    );
};

export default TomaMedidasForm;
