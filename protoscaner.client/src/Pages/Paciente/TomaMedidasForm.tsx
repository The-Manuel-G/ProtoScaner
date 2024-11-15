import React, { useState, useEffect } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getPacienteById } from '../../services/PacienteService';
import { createTomaMedidasEscaneo } from '../../services/TomaMedidasEscaneoService';
import MedidasTranstibialForm from '../../components/pacienteForm/MedidasTranstibialForm';
import MedidasTransfemoralForm from '../../components/pacienteForm/MedidasTransfemoralForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Constants for amputation types
const AMPUTATION_TYPES = {
    TRANSTIBIAL: { value: 1, label: 'Transtibial' },
    TRANSFEMORAL: { value: 2, label: 'Transfemoral' },
};

interface FormInputs {
    idPaciente: number;
    idAmputacion: number;
    idLiner: number; // Added required field
    fechaEscaneo: string;
    fotosMunon: string | null;
    comentario: string;
    resultadoScaneo: string;
    resultadoDoc: string | null;
}

const TomaMedidasForm: React.FC<{ idPaciente: number }> = ({ idPaciente }) => {
    const methods = useForm<FormInputs>();
    const { register, handleSubmit, setValue } = methods;
    const [step, setStep] = useState(1);
    const [tipoAmputacion, setTipoAmputacion] = useState<number | null>(null);

    useEffect(() => {
        const fetchPaciente = async () => {
            if (!idPaciente) return;

            try {
                const pacienteData = await getPacienteById(idPaciente);
                setValue('idPaciente', pacienteData.idPaciente);

                const latestHistorial = pacienteData.historialPacienteIngresos?.[0];
                if (latestHistorial?.tipoAmputacion !== undefined) {
                    setTipoAmputacion(latestHistorial.tipoAmputacion);
                    toast.success('Datos del paciente cargados correctamente');
                } else {
                    toast.error('Tipo de amputación no encontrado en el historial.');
                }
            } catch (error: any) {
                console.error('Error fetching patient data:', error.message);
                alert(error.message || 'Error fetching patient data. Please try again.');
            }
        };

        fetchPaciente();
    }, [idPaciente, setValue]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormInputs) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setValue(field, reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            await createTomaMedidasEscaneo(data);
            alert('Toma de medidas creada exitosamente.');
        } catch (error) {
            console.error('Error creating Toma de Medidas:', error);
            alert('Error al crear toma de medidas.');
        }
    };

    return (
        <FormProvider {...methods}>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-md shadow-md max-w-lg mx-auto">
                {step === 1 && (
                    <div className="space-y-4">
                        <Input type="hidden" {...register('idPaciente')} />

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tipo de Amputación</label>
                            <div className="w-full mt-1">
                                <Select
                                    {...register('idAmputacion')}
                                    value={tipoAmputacion?.toString() || ''}
                                    disabled
                                    className="w-full"
                                >
                                    <option value={AMPUTATION_TYPES.TRANSTIBIAL.value}>{AMPUTATION_TYPES.TRANSTIBIAL.label}</option>
                                    <option value={AMPUTATION_TYPES.TRANSFEMORAL.value}>{AMPUTATION_TYPES.TRANSFEMORAL.label}</option>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fecha de Escaneo</label>
                            <Input type="date" {...register('fechaEscaneo', { required: true })} className="w-full mt-1" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Foto del Muñón</label>
                            <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'fotosMunon')} className="w-full mt-1" />
                        </div>

                        <Button type="button" onClick={() => setStep(2)} className="w-full bg-blue-500 text-white py-2 rounded-md mt-4">
                            Next
                        </Button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        {tipoAmputacion === AMPUTATION_TYPES.TRANSTIBIAL.value && (
                            <MedidasTranstibialForm />
                        )}
                        {tipoAmputacion === AMPUTATION_TYPES.TRANSFEMORAL.value && (
                            <MedidasTransfemoralForm />
                        )}

                        <div className="flex justify-between mt-4">
                            <Button type="button" onClick={() => setStep(1)} className="bg-gray-500 text-white py-2 rounded-md">
                                Back
                            </Button>
                            <Button type="button" onClick={() => setStep(3)} className="bg-blue-500 text-white py-2 rounded-md">
                                Next
                            </Button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Comentario</label>
                            <Textarea {...register('comentario')} placeholder="Escribe un comentario..." className="w-full mt-1" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Resultado del Escaneo</label>
                            <Textarea {...register('resultadoScaneo')} placeholder="Describe el resultado del escaneo..." className="w-full mt-1" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Documento de Resultado</label>
                            <Input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, 'resultadoDoc')} className="w-full mt-1" />
                        </div>

                        <div className="flex justify-between mt-4">
                            <Button type="button" onClick={() => setStep(2)} className="bg-gray-500 text-white py-2 rounded-md">
                                Back
                            </Button>
                            <Button type="submit" className="bg-green-500 text-white py-2 rounded-md">
                                Guardar Toma de Medidas
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </FormProvider>
    );
};

export default TomaMedidasForm;
