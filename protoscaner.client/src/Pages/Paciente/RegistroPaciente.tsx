// src/Pages/Paciente/RegistroPaciente.tsx

import React, { useState, useContext } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { ToastContainer, toast } from 'react-toastify';
import { Steps } from 'primereact/steps';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'react-toastify/dist/ReactToastify.css';
import { Paciente } from '../../types/Paciente';
import { HistorialPacienteIngreso } from '../../types/HistorialPacienteIngreso';
import { createPaciente } from '../../services/PacienteService';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../App';
import ImageCaptureUpload from '../../components/ImageCaptureUpload';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '../../components/ui/Dialog';
import InputWithIcon from '../../components/ui/InputWithIcon';

// Importar constantes
import { generos, tiposAmputacion, ladosAmputacion, provincias, causasAmputacion } from '../../constants';

// Importar iconos de react-icons
import {
    FaUser,
    FaIdBadge,
    FaVenusMars,
    FaBirthdayCake,
    FaMapMarkedAlt,
    FaPhone,
    FaMobileAlt,
    FaStreetView,
    FaComment,
    FaWheelchair,
    FaCalendarAlt
} from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { AiOutlineMedicineBox } from 'react-icons/ai';

export function RegistroPaciente() {
    const [formData, setFormData] = useState<Omit<Paciente, 'idPaciente'>>({
        nombreCompleto: '',
        cedula: '',
        codigoPaciente: '', // Nuevo campo
        genero: undefined,
        fechaNacimiento: '2000-01-01',
        direccion: '',
        telefono: '',
        telefonoCelular: '',
        idProvincia: undefined,
        sector: '',
        comentario: '',
        fotoPaciente: '',
        fechaIngreso: '' // Nuevo campo
    });

    const [historialData, setHistorialData] = useState<Omit<HistorialPacienteIngreso, 'idHistorial' | 'idPaciente'>>({
        tipoAmputacion: undefined,
        ladoAmputacion: undefined,
        fechaAmputacion: '2000-01-01',
        causa: undefined,
        terapia: false,
        tiempoTerapia: '',
        comentario: ''
    });

    const [currentStep, setCurrentStep] = useState(0);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [showCedulaModal, setShowCedulaModal] = useState(false);

    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    const [isCedulaValidating, setIsCedulaValidating] = useState(false);
    const [isCedulaValid, setIsCedulaValid] = useState<boolean | null>(null); // null: no validada aún

    const themeContext = useContext(ThemeContext);

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
            // Generar código de paciente
            const currentYear = new Date().getFullYear();
            const randomNumber = Math.floor(100000 + Math.random() * 900000); // Número aleatorio de 6 dígitos
            const codigoPaciente = `ITLA-PROT3D${currentYear}-${randomNumber}`;

            // Agregar codigoPaciente y fechaIngreso al formData
            const updatedFormData = {
                ...formData,
                codigoPaciente: codigoPaciente,
                fechaIngreso: new Date().toISOString().split('T')[0]
            };

            const requestData = {
                Paciente: updatedFormData,
                Historial: historialData
            };

            await createPaciente(requestData);
            toast.success('Paciente registrado con éxito');
            resetForm();
            // Opcional: Navegar a otra página después de registrar
            // navigate('/');
        } catch (error) {
            console.error("Error al registrar el paciente:", error);
            toast.error('Error al registrar el paciente');
        }
    };

    const resetForm = () => {
        setFormData({
            nombreCompleto: '',
            cedula: '',
            codigoPaciente: '',
            genero: undefined,
            fechaNacimiento: '2000-01-01',
            direccion: '',
            telefono: '',
            telefonoCelular: '',
            idProvincia: undefined,
            sector: '',
            comentario: '',
            fotoPaciente: '',
            fechaIngreso: ''
        });
        setHistorialData({
            tipoAmputacion: undefined,
            ladoAmputacion: undefined,
            fechaAmputacion: '2000-01-01',
            causa: undefined,
            terapia: false,
            tiempoTerapia: '',
            comentario: ''
        });
        setCurrentStep(0);
        setShowCancelDialog(false);
        setShowCedulaModal(false);
        setIsCedulaValid(null);
        setErrors({});
    };

    // Función para validar la cédula
    const validateCedula = async () => {
        if (!formData.cedula.trim()) {
            toast.error('Por favor, ingrese una cedula valida para validar.');
            return;
        }

        setIsCedulaValidating(true);

        try {
            const response = await fetch(`https://api.digital.gob.do/v3/cedulas/${formData.cedula}/validate`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error en la validacion de la cedula');
            }

            const data = await response.json();
            if (data.valid) {
                setIsCedulaValid(true);
                toast.success('Cedula validada correctamente.');
            } else {
                setIsCedulaValid(false);
                setShowCedulaModal(true);
            }
        } catch (error) {
            console.error("Error al validar la cedula:", error);
            toast.error('Error al validar la cedula.');
        } finally {
            setIsCedulaValidating(false);
        }
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
                            <InputWithIcon
                                label="Nombre Completo"
                                name="nombreCompleto"
                                value={formData.nombreCompleto}
                                onChange={handleChange}
                                placeholder="Ingrese su nombre completo"
                                error={errors.nombreCompleto}
                                icon={FaUser}
                            />
                            {/* Cédula con botón de validación */}
                            <div className="flex flex-col relative">
                                <label htmlFor="cedula" className="block text-lg font-medium mb-2 flex items-center">
                                    <FaIdBadge className="mr-2 text-xl" />
                                    Cedula *
                                </label>
                                <InputText
                                    id="cedula"
                                    name="cedula"
                                    value={formData.cedula}
                                    onChange={handleChange}
                                    placeholder="Ingrese su cedula"
                                    className={`w-full p-3 pl-10 text-lg rounded-md border ${errors.cedula ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    required
                                />
                                {/* Icono de cédula */}
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                    <FaIdBadge className="text-xl" />
                                </div>
                                {/* Botón de validar cédula */}
                                <Button
                                    icon="pi pi-check-circle"
                                    className="absolute right-2 top-10 p-button-text p-button-rounded p-button-success"
                                    onClick={validateCedula}
                                    loading={isCedulaValidating}
                                    tooltip="Validar Cedula"
                                    tooltipOptions={{ position: 'top' }}
                                    type="button"
                                />
                                {errors.cedula && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Género */}
                            <div className="flex flex-col">
                                <label htmlFor="genero" className="block text-lg font-medium mb-2 flex items-center">
                                    <FaVenusMars className="mr-2 text-xl" />
                                    Genero *
                                </label>
                                <Dropdown
                                    id="genero"
                                    name="genero"
                                    value={formData.genero}
                                    options={generos}
                                    onChange={(e) => handleDropdownChange(e, 'genero')}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.genero ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Seleccione su genero"
                                    required
                                />
                                {errors.genero && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Fecha de Nacimiento */}
                            <div className="flex flex-col">
                                <label htmlFor="fechaNacimiento" className="block text-lg font-medium mb-2 flex items-center">
                                    <FaBirthdayCake className="mr-2 text-xl" />
                                    Fecha de Nacimiento *
                                </label>
                                <Calendar
                                    id="fechaNacimiento"
                                    name="fechaNacimiento"
                                    value={formData.fechaNacimiento ? new Date(formData.fechaNacimiento) : new Date('2000-01-01')}
                                    onChange={(e) => {
                                        const fecha = e.value ? new Date(e.value).toISOString().split('T')[0] : '';
                                        setFormData({ ...formData, fechaNacimiento: fecha });
                                        if (errors.fechaNacimiento) {
                                            setErrors({ ...errors, fechaNacimiento: false });
                                        }
                                    }}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.fechaNacimiento ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    dateFormat="dd/mm/yy"
                                    placeholder="Seleccione su fecha de nacimiento"
                                    required
                                />
                                {errors.fechaNacimiento && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Provincia */}
                            <div className="flex flex-col">
                                <label htmlFor="idProvincia" className="block text-lg font-medium mb-2 flex items-center">
                                    <FaMapMarkedAlt className="mr-2 text-xl" />
                                    Provincia *
                                </label>
                                <Dropdown
                                    id="idProvincia"
                                    name="idProvincia"
                                    value={formData.idProvincia}
                                    options={provincias}
                                    onChange={(e) => handleDropdownChange(e, 'idProvincia')}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.idProvincia ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Seleccione su provincia"
                                    required
                                />
                                {errors.idProvincia && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Dirección */}
                            <InputWithIcon
                                label="Direccion"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                placeholder="Ingrese su direccion"
                                error={errors.direccion}
                                icon={FaMapMarkedAlt}
                            />
                            {/* Teléfono */}
                            <InputWithIcon
                                label="Telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                placeholder="Ingrese su telefono fijo"
                                error={errors.telefono}
                                icon={FaPhone}
                            />
                            {/* Teléfono Celular */}
                            <InputWithIcon
                                label="Telefono Celular"
                                name="telefonoCelular"
                                value={formData.telefonoCelular}
                                onChange={handleChange}
                                placeholder="Ingrese su telefono celular"
                                error={errors.telefonoCelular}
                                icon={FaMobileAlt}
                            />
                            {/* Sector */}
                            <InputWithIcon
                                label="Sector"
                                name="sector"
                                value={formData.sector}
                                onChange={handleChange}
                                placeholder="Ingrese su sector"
                                error={errors.sector}
                                icon={FaStreetView}
                            />
                            {/* Comentario y Foto del Paciente en la misma fila */}
                            <div className="flex flex-col lg:col-span-3 lg:flex-row lg:space-x-6">
                                {/* Comentario */}
                                <div className="flex-1 mb-6 lg:mb-0">
                                    <InputWithIcon
                                        label="Comentario"
                                        name="comentario"
                                        value={formData.comentario}
                                        onChange={handleChange}
                                        placeholder="Ingrese cualquier comentario adicional"
                                        error={errors.comentario}
                                        icon={FaComment}
                                        textarea
                                    />
                                </div>
                                {/* Foto del Paciente */}
                                <div className="flex flex-col flex-1">
                                    <label className="block text-lg font-medium mb-2 flex items-center">
                                        <FaUser className="mr-2 text-xl" />
                                        Foto del Paciente
                                    </label>
                                    <ImageCaptureUpload
                                        onImageSelect={handleImageSelect}
                                        label="Subir Foto"
                                        fileName="fotoPaciente"
                                    />
                                    {formData.fotoPaciente && (
                                        <img src={formData.fotoPaciente} alt="Foto Actualizada" className="w-32 h-32 rounded-full mb-2 mt-2" />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {currentStep === 1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Tipo de Amputación */}
                            <div className="flex flex-col">
                                <label htmlFor="tipoAmputacion" className="block text-lg font-medium mb-2 flex items-center">
                                    <FaWheelchair className="mr-2 text-xl" />
                                    Tipo de Amputacion *
                                </label>
                                <Dropdown
                                    id="tipoAmputacion"
                                    name="tipoAmputacion"
                                    value={historialData.tipoAmputacion}
                                    options={tiposAmputacion}
                                    onChange={(e) => handleDropdownHistorialChange(e, 'tipoAmputacion')}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.tipoAmputacion ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Seleccione el tipo de amputacion"
                                    required
                                />
                                {errors.tipoAmputacion && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Lado de Amputación */}
                            <div className="flex flex-col">
                                <label htmlFor="ladoAmputacion" className="block text-lg font-medium mb-2 flex items-center">
                                    <FaWheelchair className="mr-2 text-xl" />
                                    Lado de Amputacion *
                                </label>
                                <Dropdown
                                    id="ladoAmputacion"
                                    name="ladoAmputacion"
                                    value={historialData.ladoAmputacion}
                                    options={ladosAmputacion}
                                    onChange={(e) => handleDropdownHistorialChange(e, 'ladoAmputacion')}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.ladoAmputacion ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Seleccione el lado de amputacion"
                                    required
                                />
                                {errors.ladoAmputacion && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Fecha de Amputación */}
                            <div className="flex flex-col">
                                <label htmlFor="fechaAmputacion" className="block text-lg font-medium mb-2 flex items-center">
                                    <FaCalendarAlt className="mr-2 text-xl" />
                                    Fecha de Amputacion *
                                </label>
                                <Calendar
                                    id="fechaAmputacion"
                                    name="fechaAmputacion"
                                    value={historialData.fechaAmputacion ? new Date(historialData.fechaAmputacion) : new Date('2000-01-01')}
                                    onChange={(e) => {
                                        const fecha = e.value ? new Date(e.value).toISOString().split('T')[0] : '';
                                        setHistorialData({ ...historialData, fechaAmputacion: fecha });
                                        if (errors.fechaAmputacion) {
                                            setErrors({ ...errors, fechaAmputacion: false });
                                        }
                                    }}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.fechaAmputacion ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    dateFormat="dd/mm/yy"
                                    placeholder="Seleccione la fecha de amputacion"
                                    required
                                />
                                {errors.fechaAmputacion && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Causa */}
                            <div className="flex flex-col">
                                <label htmlFor="causa" className="block text-lg font-medium mb-2 flex items-center">
                                    <GiLungs className="mr-2 text-xl" />
                                    Causa *
                                </label>
                                <Dropdown
                                    id="causa"
                                    name="causa"
                                    value={historialData.causa}
                                    options={causasAmputacion}
                                    onChange={(e) => handleDropdownHistorialChange(e, 'causa')}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.causa ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Seleccione la causa de la amputacion"
                                    required
                                />
                                {errors.causa && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Terapia */}
                            <div className="flex flex-col">
                                <label htmlFor="terapia" className="block text-lg font-medium mb-2 flex items-center">
                                    <AiOutlineMedicineBox className="mr-2 text-xl" />
                                    Terapia *
                                </label>
                                <Dropdown
                                    id="terapia"
                                    name="terapia"
                                    value={historialData.terapia}
                                    options={[
                                        { label: 'Si', value: true },
                                        { label: 'No', value: false }
                                    ]}
                                    onChange={(e) => handleDropdownHistorialChange(e, 'terapia')}
                                    className={`w-full p-3 text-lg rounded-md border ${errors.terapia ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Seleccione si ha recibido terapia"
                                    required
                                />
                                {errors.terapia && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio.</span>}
                            </div>
                            {/* Tiempo de Terapia */}
                            {historialData.terapia && (
                                <InputWithIcon
                                    label="Tiempo de Terapia"
                                    name="tiempoTerapia"
                                    value={historialData.tiempoTerapia}
                                    onChange={handleHistorialChange}
                                    placeholder="Ingrese el tiempo de terapia"
                                    error={errors.tiempoTerapia}
                                    icon={AiOutlineMedicineBox}
                                />
                            )}
                            {/* Comentario */}
                            <InputWithIcon
                                label="Comentario"
                                name="comentario"
                                value={historialData.comentario}
                                onChange={handleHistorialChange}
                                placeholder="Ingrese cualquier comentario adicional"
                                error={errors.comentario}
                                icon={FaComment}
                                textarea
                            />
                        </motion.div>
                    )}
                    {/* Botones de Navegación */}
                    <div className="flex justify-between mt-8">
                        <Button
                            label={currentStep === 0 ? "Descartar" : "Atras"}
                            className={`p-button-danger p-3 text-lg shadow-lg rounded-md ${currentStep === 0 ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
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
                            className={`p-button-success p-3 text-lg shadow-lg rounded-md ${currentStep < 1 ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'}`}
                            onClick={handleNext}
                            type="button"
                        />
                    </div>
                </form>
            </div>
            {/* Diálogo de Cancelación */}
            <Dialog open={showCancelDialog} onOpenChange={(open) => { if (!open) setShowCancelDialog(false); }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <FaUser className="mr-2 text-xl inline-block" />
                            Cancelar Registro
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <FaComment className="mr-2 text-xl inline-block" />
                        ¿Estas seguro de que deseas cancelar el registro? Los datos ingresados no se guardaran.
                    </DialogDescription>
                    <DialogFooter>
                        <Button
                            label="No"
                            className="p-button-text p-3 mr-2"
                            onClick={() => setShowCancelDialog(false)}
                            style={{ backgroundColor: 'transparent', color: '#6B7280' }} // Gris claro
                        />
                        <Button
                            label="Si"
                            className="p-button-danger p-3"
                            onClick={() => { resetForm(); setShowCancelDialog(false); }}
                            style={{ backgroundColor: '#EF4444', borderColor: '#EF4444' }} // Rojo
                        />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* Confirmación de cédula inválida */}
            <ConfirmationModal
                isOpen={showCedulaModal}
                title="Cedula No Validada"
                description={
                    <div className="flex items-center">
                        <FaIdBadge className="mr-2 text-2xl text-red-500" />
                        La cedula no esta validada y no se reconoce. ¿Deseas continuar con el registro del paciente?
                    </div>
                }
                onConfirm={() => {
                    setShowCedulaModal(false);
                    toast.info('Continuando con el registro del paciente.');
                }}
                onCancel={() => {
                    setShowCedulaModal(false);
                }}
            />
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );

}

export default RegistroPaciente;
