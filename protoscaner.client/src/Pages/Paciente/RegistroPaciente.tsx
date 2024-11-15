// src/Pages/Paciente/RegistroPaciente.tsx

import React, { useState, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { ToastContainer, toast } from 'react-toastify';
import { Steps } from 'primereact/steps';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'react-toastify/dist/ReactToastify.css';
import { Paciente } from '../../types/Paciente';
import { HistorialPacienteIngreso } from '../../types/HistorialPacienteIngreso';
import { createPaciente } from '../../services/PacienteService';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../App';
import ImageCaptureUpload from '../../components/ImageCaptureUpload';

export function RegistroPaciente() {
    const [formData, setFormData] = useState<Omit<Paciente, 'idPaciente'>>({
        nombreCompleto: '',
        cedula: '',
        genero: undefined,
        fechaNacimiento: '',
        direccion: '',
        telefono: '',
        telefonoCelular: '',
        idProvincia: undefined,
        sector: '',
        comentario: '',
        fotoPaciente: ''
    });

    const [historialData, setHistorialData] = useState<Omit<HistorialPacienteIngreso, 'idHistorial' | 'idPaciente'>>({
        tipoAmputacion: undefined,
        ladoAmputacion: undefined,
        fechaAmputacion: '',
        causa: undefined,
        terapia: false,
        tiempoTerapia: '',
        comentario: ''
    });

    const [currentStep, setCurrentStep] = useState(0);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    const themeContext = useContext(ThemeContext);

    const generos = [
        { label: 'Masculino', value: 1 },
        { label: 'Femenino', value: 2 }
    ];

    const provincias = [
        { label: 'Distrito Nacional', value: 1 },
        { label: 'Santo Domingo', value: 2 }
    ];

    const tiposAmputacion = [
        { label: 'Transtibial', value: 1 },
        { label: 'Transfemoral', value: 2 }
    ];

    const ladosAmputacion = [
        { label: 'Izquierdo', value: 1 },
        { label: 'Derecho', value: 2 }
    ];

    const causasAmputacion = [
        { label: 'Congenita', value: 1 },
        { label: 'Enfermedad', value: 2 },
        { label: 'Accidente', value: 3 },
        { label: 'Diabetes', value: 4 },
        { label: 'Infección', value: 5 },
        { label: 'Traumatismo', value: 6 },
        { label: 'Cancer', value: 7 },
        { label: 'Vascular', value: 8 },
        { label: 'Quemaduras', value: 9 },
        { label: 'Lesiones deportivas', value: 10 },
        { label: 'Mala circulación', value: 11 },
        { label: 'Congelacion', value: 12 },
        { label: 'Neuropatía periferica', value: 13 },
        { label: 'Sindrome de compartimiento', value: 14 },
        { label: 'Trombosis venosa profunda', value: 15 },
        { label: 'Complicaciones quirurgicas', value: 16 },
        { label: 'Infecciones oseas', value: 17 },
        { label: 'Tumores benignos', value: 18 },
        { label: 'Trastornos neuromusculares', value: 19 },
        { label: 'Exposicion a sustancias toxicas', value: 20 },
        { label: 'Malformaciones congenitas', value: 21 },
        { label: 'Factores geneticos', value: 22 },
        { label: 'Otro', value: 23 }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: false });
        }
    };

    const handleHistorialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setHistorialData({ ...historialData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: false });
        }
    };

    const handleDropdownChange = (e: { value: any }, field: keyof Omit<Paciente, 'idPaciente'>) => {
        setFormData({ ...formData, [field]: e.value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: false });
        }
    };

    const handleDropdownHistorialChange = (e: { value: any }, field: keyof Omit<HistorialPacienteIngreso, 'idHistorial' | 'idPaciente'>) => {
        setHistorialData({ ...historialData, [field]: e.value });

        // Si se cambia el valor de 'terapia' a 'No', limpiar 'tiempoTerapia'
        if (field === 'terapia' && e.value === false) {
            setHistorialData(prev => ({ ...prev, tiempoTerapia: '' }));
            if (errors['tiempoTerapia']) {
                setErrors({ ...errors, ['tiempoTerapia']: false });
            }
        }

        if (errors[field]) {
            setErrors({ ...errors, [field]: false });
        }
    };

    const handleImageSelect = (imageBase64: string) => {
        setFormData({ ...formData, fotoPaciente: `data:image/jpeg;base64,${imageBase64}` });
    };

    const steps = [
        { label: 'Informacion Personal' },
        { label: 'Historial del Paciente' }
    ];

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (currentStep === 0) {
            // Validar campos obligatorios para el paso 0
            const newErrors: { [key: string]: boolean } = {};
            if (!formData.nombreCompleto.trim()) newErrors.nombreCompleto = true;
            if (!formData.cedula.trim()) newErrors.cedula = true;
            if (formData.genero === undefined || formData.genero === null) newErrors.genero = true;
            if (!formData.fechaNacimiento.trim()) newErrors.fechaNacimiento = true;
            if (formData.idProvincia === undefined || formData.idProvincia === null) newErrors.idProvincia = true;

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                toast.error('Complete los campos obligatorios');
                return;
            }

            setCurrentStep(1);
        } else if (currentStep === 1) {
            // Validar campos obligatorios para el paso 1
            const newErrors: { [key: string]: boolean } = {};
            if (!historialData.tipoAmputacion) newErrors.tipoAmputacion = true;
            if (!historialData.ladoAmputacion) newErrors.ladoAmputacion = true;
            if (!historialData.causa) newErrors.causa = true;
            // Si 'terapia' es true, 'tiempoTerapia' es obligatorio
            if (historialData.terapia && !historialData.tiempoTerapia.trim()) {
                newErrors.tiempoTerapia = true;
            }

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                toast.error('Complete los campos obligatorios en el historial');
                return;
            }

            handleSubmit(e);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const requestData = {
                Paciente: formData,
                Historial: historialData
            };

            await createPaciente(requestData);
            toast.success('Paciente registrado con éxito');
            resetForm();
        } catch (error) {
            toast.error('Error al registrar el paciente');
        }
    };

    const resetForm = () => {
        setFormData({
            nombreCompleto: '',
            cedula: '',
            genero: undefined,
            fechaNacimiento: '',
            direccion: '',
            telefono: '',
            telefonoCelular: '',
            idProvincia: undefined,
            sector: '',
            comentario: '',
            fotoPaciente: ''
        });
        setHistorialData({
            tipoAmputacion: undefined,
            ladoAmputacion: undefined,
            fechaAmputacion: '',
            causa: undefined,
            terapia: false,
            tiempoTerapia: '',
            comentario: ''
        });
        setCurrentStep(0);
        setShowCancelDialog(false);
        setErrors({});
    };

    return (
        <div lang="es" className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
            <div className={`w-full max-w-6xl ${themeContext?.theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} shadow-lg rounded-lg p-8`}>
                <h2 className="text-3xl font-semibold text-center mb-6">Registro de Paciente</h2>
                {/* Componente de Pasos */}
                <div className="mb-8">
                    <Steps model={steps} activeIndex={currentStep} />
                </div>
                <form className="space-y-8">
                    {currentStep === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Nombre Completo */}
                            <div className="flex flex-col">
                                <label htmlFor="nombreCompleto" className="block text-lg font-medium mb-2">Nombre Completo *</label>
                                <InputText
                                    id="nombreCompleto"
                                    name="nombreCompleto"
                                    value={formData.nombreCompleto}
                                    onChange={handleChange}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.nombreCompleto ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    required
                                />
                                {errors.nombreCompleto && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Cédula */}
                            <div className="flex flex-col">
                                <label htmlFor="cedula" className="block text-lg font-medium mb-2">Cedula *</label>
                                <InputText
                                    id="cedula"
                                    name="cedula"
                                    value={formData.cedula}
                                    onChange={handleChange}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.cedula ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    required
                                />
                                {errors.cedula && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Género */}
                            <div className="flex flex-col">
                                <label htmlFor="genero" className="block text-lg font-medium mb-2">Genero *</label>
                                <Dropdown
                                    id="genero"
                                    name="genero"
                                    value={formData.genero}
                                    options={generos}
                                    onChange={(e) => handleDropdownChange(e, 'genero')}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.genero ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Seleccione"
                                    required
                                />
                                {errors.genero && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Fecha de Nacimiento */}
                            <div className="flex flex-col">
                                <label htmlFor="fechaNacimiento" className="block text-lg font-medium mb-2">Fecha de Nacimiento *</label>
                                <Calendar
                                    id="fechaNacimiento"
                                    name="fechaNacimiento"
                                    value={formData.fechaNacimiento ? new Date(formData.fechaNacimiento) : null}
                                    onChange={(e) => {
                                        const fecha = e.value ? new Date(e.value).toISOString().split('T')[0] : '';
                                        setFormData({ ...formData, fechaNacimiento: fecha });
                                        if (errors.fechaNacimiento) {
                                            setErrors({ ...errors, fechaNacimiento: false });
                                        }
                                    }}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.fechaNacimiento ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    dateFormat="dd/mm/yy"
                                    placeholder="Seleccione una fecha"
                                    required
                                />
                                {errors.fechaNacimiento && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Provincia */}
                            <div className="flex flex-col">
                                <label htmlFor="idProvincia" className="block text-lg font-medium mb-2">Provincia *</label>
                                <Dropdown
                                    id="idProvincia"
                                    name="idProvincia"
                                    value={formData.idProvincia}
                                    options={provincias}
                                    onChange={(e) => handleDropdownChange(e, 'idProvincia')}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.idProvincia ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Seleccione"
                                    required
                                />
                                {errors.idProvincia && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Dirección */}
                            <div className="flex flex-col">
                                <label htmlFor="direccion" className="block text-lg font-medium mb-2">Direccion</label>
                                <InputText
                                    id="direccion"
                                    name="direccion"
                                    value={formData.direccion}
                                    onChange={handleChange}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.direccion ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.direccion && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Teléfono */}
                            <div className="flex flex-col">
                                <label htmlFor="telefono" className="block text-lg font-medium mb-2">Telefono</label>
                                <InputText
                                    id="telefono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.telefono ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.telefono && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Teléfono Celular */}
                            <div className="flex flex-col">
                                <label htmlFor="telefonoCelular" className="block text-lg font-medium mb-2">Telefono Celular</label>
                                <InputText
                                    id="telefonoCelular"
                                    name="telefonoCelular"
                                    value={formData.telefonoCelular}
                                    onChange={handleChange}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.telefonoCelular ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.telefonoCelular && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Sector */}
                            <div className="flex flex-col">
                                <label htmlFor="sector" className="block text-lg font-medium mb-2">Sector</label>
                                <InputText
                                    id="sector"
                                    name="sector"
                                    value={formData.sector}
                                    onChange={handleChange}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.sector ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.sector && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Comentario */}
                            <div className="flex flex-col lg:col-span-3">
                                <label htmlFor="comentario" className="block text-lg font-medium mb-2">Comentario</label>
                                <InputTextarea
                                    id="comentario"
                                    name="comentario"
                                    value={formData.comentario}
                                    onChange={handleChange}
                                    rows={3}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.comentario ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.comentario && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Foto del Paciente */}
                            <div className="flex flex-col lg:col-span-3">
                                <label className="block text-lg font-medium mb-2">Foto del Paciente</label>
                                <ImageCaptureUpload
                                    onImageSelect={handleImageSelect}
                                    label="Subir Foto"
                                    fileName="fotoPaciente"
                                />
                            </div>
                        </motion.div>
                    )}
                    {currentStep === 1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Tipo de Amputación */}
                            <div className="flex flex-col">
                                <label htmlFor="tipoAmputacion" className="block text-lg font-medium mb-2">Tipo de Amputacion *</label>
                                <Dropdown
                                    id="tipoAmputacion"
                                    name="tipoAmputacion"
                                    value={historialData.tipoAmputacion}
                                    options={tiposAmputacion}
                                    onChange={(e) => handleDropdownHistorialChange(e, 'tipoAmputacion')}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.tipoAmputacion ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Seleccione"
                                    required
                                />
                                {errors.tipoAmputacion && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Lado de Amputación */}
                            <div className="flex flex-col">
                                <label htmlFor="ladoAmputacion" className="block text-lg font-medium mb-2">Lado de Amputación *</label>
                                <Dropdown
                                    id="ladoAmputacion"
                                    name="ladoAmputacion"
                                    value={historialData.ladoAmputacion}
                                    options={ladosAmputacion}
                                    onChange={(e) => handleDropdownHistorialChange(e, 'ladoAmputacion')}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.ladoAmputacion ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Seleccione"
                                    required
                                />
                                {errors.ladoAmputacion && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Fecha de Amputación */}
                            <div className="flex flex-col">
                                <label htmlFor="fechaAmputacion" className="block text-lg font-medium mb-2">Fecha de Amputación</label>
                                <Calendar
                                    id="fechaAmputacion"
                                    name="fechaAmputacion"
                                    value={historialData.fechaAmputacion ? new Date(historialData.fechaAmputacion) : null}
                                    onChange={(e) => {
                                        const fecha = e.value ? new Date(e.value).toISOString().split('T')[0] : '';
                                        setHistorialData({ ...historialData, fechaAmputacion: fecha });
                                        if (errors.fechaAmputacion) {
                                            setErrors({ ...errors, fechaAmputacion: false });
                                        }
                                    }}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.fechaAmputacion ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    dateFormat="dd/mm/yy"
                                    placeholder="Seleccione una fecha"
                                />
                                {errors.fechaAmputacion && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Causa */}
                            <div className="flex flex-col">
                                <label htmlFor="causa" className="block text-lg font-medium mb-2">Causa *</label>
                                <Dropdown
                                    id="causa"
                                    name="causa"
                                    value={historialData.causa}
                                    options={causasAmputacion}
                                    onChange={(e) => handleDropdownHistorialChange(e, 'causa')}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.causa ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Seleccione"
                                    required
                                />
                                {errors.causa && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Terapia */}
                            <div className="flex flex-col">
                                <label htmlFor="terapia" className="block text-lg font-medium mb-2">Terapia *</label>
                                <Dropdown
                                    id="terapia"
                                    name="terapia"
                                    value={historialData.terapia}
                                    options={[
                                        { label: 'Sí', value: true },
                                        { label: 'No', value: false }
                                    ]}
                                    onChange={(e) => handleDropdownHistorialChange(e, 'terapia')}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.terapia ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Seleccione"
                                    required
                                />
                                {errors.terapia && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Tiempo de Terapia */}
                            {historialData.terapia && (
                                <div className="flex flex-col">
                                    <label htmlFor="tiempoTerapia" className="block text-lg font-medium mb-2">Tiempo de Terapia *</label>
                                    <InputText
                                        id="tiempoTerapia"
                                        name="tiempoTerapia"
                                        value={historialData.tiempoTerapia}
                                        onChange={handleHistorialChange}
                                        className={`w-full p-3 text-lg rounded-md border ${errors.tiempoTerapia ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        required={historialData.terapia}
                                    />
                                    {errors.tiempoTerapia && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                                </div>
                            )}
                            {/* Comentario */}
                            <div className="flex flex-col lg:col-span-3">
                                <label htmlFor="comentario" className="block text-lg font-medium mb-2">Comentario</label>
                                <InputTextarea
                                    id="comentario"
                                    name="comentario"
                                    value={historialData.comentario}
                                    onChange={handleHistorialChange}
                                    rows={3}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.comentario ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.comentario && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                        </motion.div>
                    )}
                    {/* Botones de Navegación */}
                    <div className="flex justify-between mt-8">
                        <Button
                            label={currentStep === 0 ? "Descartar" : "Atrás"}
                            className="p-button-danger p-3 text-lg shadow-lg rounded-md"
                            onClick={() => {
                                if (currentStep === 0) {
                                    setShowCancelDialog(true);
                                } else {
                                    setCurrentStep(currentStep - 1);
                                }
                            }}
                            type="button"
                        />
                        <Button
                            label={currentStep < 1 ? "Siguiente" : "Registrar"}
                            className="p-button-success p-3 text-lg shadow-lg rounded-md"
                            onClick={handleNext}
                            type="button"
                        />
                    </div>
                </form>
            </div>
            {/* Diálogo de Cancelación */}
            <Dialog
                header="Cancelar Registro"
                visible={showCancelDialog}
                style={{ width: '90vw', maxWidth: '500px' }}
                onHide={() => setShowCancelDialog(false)}
                modal
                draggable={false}
                resizable={false}
            >
                <p>¿Esta seguro de que desea cancelar el registro? Los datos ingresados no se guardarán.</p>
                <div className="flex justify-end gap-4 mt-6">
                    <Button label="No" className="p-button-text p-3" onClick={() => setShowCancelDialog(false)} />
                    <Button label="Sí" className="p-button-danger p-3 text-lg shadow-lg" onClick={() => { resetForm(); setShowCancelDialog(false); }} />
                </div>
            </Dialog>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );

}

export default RegistroPaciente;
