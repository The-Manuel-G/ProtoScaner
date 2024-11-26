// src/Pages/Paciente/EditPaciente.tsx 

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paciente } from '../../types/Paciente';
import { HistorialPacienteIngreso } from '../../types/HistorialPacienteIngreso';
import { getPacienteById, updatePaciente } from '../../services/PacienteService';
import { Button } from '../../components/ui/button'; // Componente personalizado
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { generos, tiposAmputacion, ladosAmputacion, provincias, causasAmputacion } from '../../constants';
import { toast } from 'react-toastify';
import ImageCaptureUpload from '../../components/ImageCaptureUpload';
import { Dialog } from 'primereact/dialog';
import {
    FaUser,
    FaIdBadge,
    FaVenusMars,
    FaCalendarAlt,
    FaHome,
    FaPhone,
    FaMobileAlt,
    FaBuilding,
    FaExclamationTriangle,
    FaInfoCircle,
    FaComment,
    FaImage,
    FaUndo,
    FaClipboardList,
    FaArrowsAltH,
    FaThermometerHalf,
    FaClock,
    FaSave,
    FaCheckCircle,
    FaTimesCircle,
    FaSpinner,
} from 'react-icons/fa'; // Importar iconos apropiados de Font Awesome

interface FormData {
    nombreCompleto: string;
    cedula: string;
    genero: number | null;
    fechaNacimiento: string;
    direccion: string;
    telefono?: string;
    telefonoCelular?: string;
    idProvincia?: number | null;
    sector?: string;
    insidencia: boolean;
    comentario?: string;
    fotoPaciente?: string | null; // Base64 string sin prefijo o con prefijo según necesidad
}

const EditPaciente: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [paciente, setPaciente] = useState<Paciente | null>(null);
    const [historial, setHistorial] = useState<HistorialPacienteIngreso>({
        idHistorial: 0, // 0 indica un nuevo historial
        tipoAmputacion: null,
        ladoAmputacion: null,
        fechaAmputacion: '',
        causa: null,
        terapia: false,
        tiempoTerapia: '',
        comentario: '',
    });
    const [formData, setFormData] = useState<FormData>({
        nombreCompleto: '',
        cedula: '',
        genero: null,
        fechaNacimiento: '',
        direccion: '',
        telefono: '',
        telefonoCelular: '',
        idProvincia: null,
        sector: '',
        insidencia: false,
        comentario: '',
        fotoPaciente: null,
    });
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const [isSuccessDialogVisible, setSuccessDialogVisible] = useState(false);

    // Estados para la verificación de la cédula
    const [cedulaValid, setCedulaValid] = useState<boolean | null>(null); // null: no verificado, true: válido, false: inválido
    const [isVerifyingCedula, setIsVerifyingCedula] = useState<boolean>(false);

    useEffect(() => {
        const fetchPaciente = async () => {
            if (id) {
                try {
                    const pacienteData = await getPacienteById(Number(id));
                    setPaciente(pacienteData);

                    // Eliminar el prefijo 'data:image/*;base64,' si existe
                    const fotoPacienteSinPrefijo = pacienteData.fotoPaciente
                        ? pacienteData.fotoPaciente.replace(/^data:image\/[a-z]+;base64,/, "")
                        : null;

                    setFormData({
                        nombreCompleto: pacienteData.nombreCompleto || '',
                        cedula: pacienteData.cedula || '',
                        genero: pacienteData.genero ?? null, // null en lugar de 0 para consistencia
                        fechaNacimiento: pacienteData.fechaNacimiento || '',
                        direccion: pacienteData.direccion || '',
                        telefono: pacienteData.telefono || '',
                        telefonoCelular: pacienteData.telefonoCelular || '',
                        idProvincia: pacienteData.idProvincia ?? null, // null en lugar de 0 para consistencia
                        sector: pacienteData.sector || '',
                        insidencia: pacienteData.insidencia || false,
                        comentario: pacienteData.comentario || '',
                        fotoPaciente: fotoPacienteSinPrefijo, // Sin prefijo
                    });

                    if (pacienteData.historialPacienteIngresos && pacienteData.historialPacienteIngresos.length > 0) {
                        setHistorial(pacienteData.historialPacienteIngresos[0]); // Asumiendo que solo hay un historial por paciente
                    }
                    // Si no hay historial, `historial` permanece con valores vacíos
                } catch (error) {
                    console.error("Error al obtener el paciente:", error);
                    toast.error('Error al obtener los datos del paciente');
                }
            }
        };
        fetchPaciente();
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Si el campo que cambia es la cédula, resetear la validación
        if (name === 'cedula') {
            setCedulaValid(null);
        }

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
    };

    const handleHistorialChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, checked } = e.target;
        setHistorial(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (['tipoAmputacion', 'ladoAmputacion', 'causa'].includes(name) ? Number(value) : value)
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
    };

    const handleImageSelect = (imageBase64: string) => {
        console.log("Imagen seleccionada (base64):", imageBase64); // Log para verificar la imagen seleccionada
        if (imageBase64) {
            setFormData(prev => ({ ...prev, fotoPaciente: imageBase64 })); // Sin prefijo
        } else {
            setFormData(prev => ({ ...prev, fotoPaciente: null }));
        }
    };

    // Función para verificar la cédula
    const verifyCedula = async () => {
        const cedula = formData.cedula.trim();
        if (cedula.length === 0) {
            toast.error('Por favor, ingresa una cédula para verificar.');
            return;
        }

        setIsVerifyingCedula(true);
        try {
            const response = await fetch(`https://api.digital.gob.do/v3/cedulas/${cedula}/validate`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error en la verificacion de la cedula.');
            }

            const data = await response.json();
            if (data.valid) {
                setCedulaValid(true);
                toast.success('La cedula es válida.');
            } else {
                setCedulaValid(false);
                toast.error('La cedula es inválida.');
            }
        } catch (error) {
            console.error("Error al verificar la cedula:", error);
            toast.error('Ocurrio un error al verificar la cedula.');
            setCedulaValid(null);
        } finally {
            setIsVerifyingCedula(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!paciente) return;

        // Validación previa
        const newErrors: { [key: string]: boolean } = {};
        if (!formData.nombreCompleto.trim()) newErrors.nombreCompleto = true;
        if (!formData.cedula.trim()) newErrors.cedula = true;
        if (formData.genero === null) newErrors.genero = true;
        if (!formData.fechaNacimiento.trim()) newErrors.fechaNacimiento = true;
        if (!formData.direccion.trim()) newErrors.direccion = true;

        // Validación del historial
        if (historial.tipoAmputacion === null || historial.tipoAmputacion === undefined) newErrors.tipoAmputacion = true;
        if (historial.ladoAmputacion === null || historial.ladoAmputacion === undefined) newErrors.ladoAmputacion = true;
        if (historial.causa === null || historial.causa === undefined) newErrors.causa = true;
        if (historial.terapia && (!historial.tiempoTerapia || !historial.tiempoTerapia.trim())) newErrors.tiempoTerapia = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error('Por favor, completa todos los campos obligatorios.');
            return;
        }

        // Manejo de la foto
        let fotoBase64 = paciente.fotoPaciente; // Obtener la foto existente desde el backend (sin prefijo)
        if (formData.fotoPaciente) {
            fotoBase64 = formData.fotoPaciente; // Ya es base64 string sin prefijo
        }

        console.log("Foto a enviar (base64):", fotoBase64); // Log para verificar la foto que se enviará

        const updatedPaciente: Paciente = {
            ...paciente,
            nombreCompleto: formData.nombreCompleto,
            cedula: formData.cedula,
            genero: formData.genero,
            fechaNacimiento: formData.fechaNacimiento,
            direccion: formData.direccion,
            telefono: formData.telefono,
            telefonoCelular: formData.telefonoCelular,
            idProvincia: formData.idProvincia,
            sector: formData.sector,
            insidencia: formData.insidencia,
            comentario: formData.comentario,
            fotoPaciente: fotoBase64, // Sin prefijo
        };

        console.log("Paciente actualizado:", updatedPaciente); // Log para verificar los datos actualizados

        try {
            await updatePaciente(paciente.idPaciente, updatedPaciente, {
                ...historial,
                idHistorial: historial.idHistorial === 0 ? undefined : historial.idHistorial, // Si es 0, se creará un nuevo historial
            });
            toast.success('Paciente actualizado con exito.');
            setSuccessDialogVisible(true); // Abrir el modal de éxito
            navigate(`/paciente/${paciente.idPaciente}`);
        } catch (error) {
            console.error("Error al actualizar el paciente:", error);
            toast.error('Error al actualizar el paciente.');
        }
    };

    const handleDiscard = () => {
        if (id) {
            navigate(`/paciente/${id}`);
        } else {
            navigate('/'); // Ruta por defecto en caso de que id no esté disponible
        }
    };

    if (!paciente) return <div className="text-center text-gray-500">Cargando...</div>;

    return (
        <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-7xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-blue-600 flex items-center justify-center">
                <FaUser className="mr-2" />
                Editar Paciente
            </h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Nombre Completo */}
                    <div>
                        <label className="block mb-2 text-gray-700 flex items-center">
                            <FaUser className="mr-2 text-blue-500" />
                            <strong>Nombre Completo *</strong>
                        </label>
                        <InputText
                            name="nombreCompleto"
                            value={formData.nombreCompleto}
                            onChange={handleChange}
                            required
                            className={`w-full p-2 border ${errors.nombreCompleto ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                        />
                        {errors.nombreCompleto && <small className="text-red-500">Este campo es obligatorio.</small>}
                    </div>

                    {/* Cédula */}
                    <div>
                        <label className="block mb-2 text-gray-700 flex items-center">
                            <FaIdBadge className="mr-2 text-blue-500" />
                            <strong>Cédula *</strong>
                        </label>
                        <div className="flex">
                            <InputText
                                name="cedula"
                                value={formData.cedula}
                                onChange={handleChange}
                                required
                                className={`w-full p-2 border ${errors.cedula
                                    ? 'border-red-500'
                                    : cedulaValid === true
                                        ? 'border-green-500'
                                        : cedulaValid === false
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                                placeholder="Ingresa la cedula"
                            />
                            <button
                                type="button"
                                onClick={verifyCedula}
                                className={`flex items-center justify-center px-4 py-2 border-t border-b border-r ${errors.cedula
                                        ? 'border-red-500 bg-red-100 hover:bg-red-200'
                                        : cedulaValid === true
                                            ? 'border-green-500 bg-green-100 hover:bg-green-200'
                                            : cedulaValid === false
                                                ? 'border-red-500 bg-red-100 hover:bg-red-200'
                                                : 'border-gray-300 bg-gray-100 hover:bg-gray-200'
                                    } rounded-r focus:outline-none transition-colors duration-300`}
                                disabled={isVerifyingCedula}
                                title="Verificar Cedula"
                            >
                                {isVerifyingCedula ? (
                                    <FaSpinner className="animate-spin text-gray-600" />
                                ) : cedulaValid === true ? (
                                    <FaCheckCircle className="text-green-500" />
                                ) : cedulaValid === false ? (
                                    <FaTimesCircle className="text-red-500" />
                                ) : (
                                    <FaCheckCircle className="text-gray-500" />
                                )}
                            </button>
                        </div>
                        {errors.cedula && <small className="text-red-500">Este campo es obligatorio.</small>}
                    </div>

                    {/* Género */}
                    <div>
                        <label className="block mb-2 text-gray-700 flex items-center">
                            <FaVenusMars className="mr-2 text-blue-500" />
                            <strong>Genero *</strong>
                        </label>
                        <Dropdown
                            name="genero"
                            value={formData.genero}
                            options={generos}
                            onChange={(e) => setFormData(prev => ({ ...prev, genero: e.value as number }))}
                            placeholder="Seleccione Genero"
                            className={`w-full p-2 border ${errors.genero ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                        />
                        {errors.genero && <small className="text-red-500">Este campo es obligatorio.</small>}
                    </div>

                    {/* Fecha de Nacimiento */}
                    <div>
                        <label className="block mb-2 text-gray-700 flex items-center">
                            <FaCalendarAlt className="mr-2 text-blue-500" />
                            <strong>Fecha de Nacimiento *</strong>
                        </label>
                        <InputText
                            type="date"
                            name="fechaNacimiento"
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                            required
                            className={`w-full p-2 border ${errors.fechaNacimiento ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                        />
                        {errors.fechaNacimiento && <small className="text-red-500">Este campo es obligatorio.</small>}
                    </div>

                    {/* Provincia */}
                    <div>
                        <label className="block mb-2 text-gray-700 flex items-center">
                            <FaHome className="mr-2 text-blue-500" />
                            <strong>Provincia</strong>
                        </label>
                        <Dropdown
                            name="idProvincia"
                            value={formData.idProvincia}
                            options={provincias}
                            onChange={(e) => setFormData(prev => ({ ...prev, idProvincia: e.value as number }))}
                            placeholder="Seleccione Provincia"
                            className={`w-full p-2 border ${errors.idProvincia ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                        />
                        {errors.idProvincia && <small className="text-red-500">Este campo es obligatorio.</small>}
                    </div>

                    {/* Dirección */}
                    <div>
                        <label className="block mb-2 text-gray-700 flex items-center">
                            <FaHome className="mr-2 text-blue-500" />
                            <strong>Direccion *</strong>
                        </label>
                        <InputText
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            required
                            className={`w-full p-2 border ${errors.direccion ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                        />
                        {errors.direccion && <small className="text-red-500">Este campo es obligatorio.</small>}
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label className="block mb-2 text-gray-700 flex items-center">
                            <FaPhone className="mr-2 text-blue-500" />
                            <strong>Telefono</strong>
                        </label>
                        <InputText
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            // No es obligatorio
                            className={`w-full p-2 border ${errors.telefono ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                        />
                        {errors.telefono && <small className="text-red-500">Este campo es obligatorio.</small>}
                    </div>

                    {/* Teléfono Celular */}
                    <div>
                        <label className="block mb-2 text-gray-700 flex items-center">
                            <FaMobileAlt className="mr-2 text-blue-500" />
                            <strong>Telefono Celular</strong>
                        </label>
                        <InputText
                            type="text"
                            name="telefonoCelular"
                            value={formData.telefonoCelular}
                            onChange={handleChange}
                            // No es obligatorio
                            className={`w-full p-2 border ${errors.telefonoCelular ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                        />
                        {errors.telefonoCelular && <small className="text-red-500">Este campo es obligatorio.</small>}
                    </div>

                    {/* Sector */}
                    <div>
                        <label className="block mb-2 text-gray-700 flex items-center">
                            <FaBuilding className="mr-2 text-blue-500" />
                            <strong>Sector</strong>
                        </label>
                        <InputText
                            name="sector"
                            value={formData.sector}
                            onChange={handleChange}
                            // No es obligatorio
                            className={`w-full p-2 border ${errors.sector ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                        />
                        {errors.sector && <small className="text-red-500">Este campo es obligatorio.</small>}
                    </div>

                    {/* Incidencia */}
                    <div className="col-span-1 sm:col-span-2 flex items-center">
                        <Checkbox
                            inputId="insidencia"
                            name="insidencia"
                            checked={formData.insidencia}
                            onChange={(e) => setFormData(prev => ({ ...prev, insidencia: e.checked }))}
                        />
                        <label htmlFor="insidencia" className="ml-2 text-gray-700 flex items-center">
                            <FaExclamationTriangle className="mr-2 text-red-500" />
                            <strong>Incidencia</strong>
                        </label>
                    </div>

                    {/* Comentario */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block mb-2 text-gray-700 flex items-center">
                            <FaComment className="mr-2 text-blue-500" />
                            <strong>Comentario</strong>
                        </label>
                        <InputTextarea
                            name="comentario"
                            value={formData.comentario}
                            onChange={handleChange}
                            rows={4}
                            // No es obligatorio
                            className={`w-full p-2 border ${errors.comentario ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                        />
                        {errors.comentario && <small className="text-red-500">Este campo es obligatorio.</small>}
                    </div>

                    {/* Foto del Paciente */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block mb-2 text-gray-700 flex items-center">
                            <FaImage className="mr-2 text-blue-500" />
                            <strong>Foto del Paciente</strong>
                        </label>
                        <ImageCaptureUpload
                            onImageSelect={handleImageSelect}
                            label="Subir o Capturar Imagen"
                            fileName="fotoPaciente"
                            captureIcon="pi pi-camera"
                            discardIcon="pi pi-trash"
                            captureButtonStyle={{ backgroundColor: '#4CAF50', color: 'white' }}
                            discardButtonStyle={{ color: 'red' }}
                        />
                        {formData.fotoPaciente && (
                            <div className="mt-4 flex justify-center">
                                <img
                                    src={`data:image/jpeg;base64,${formData.fotoPaciente}`}
                                    alt="Foto Actual"
                                    className="w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 object-cover rounded-full shadow-md border-2 border-gray-300"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Historial de Ingresos */}
                <div className="mt-8">
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-blue-500 flex items-center">
                        <FaClipboardList className="mr-2 text-blue-500" />
                        Editar Historial de Ingresos
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Tipo de Amputación */}
                        <div>
                            <label className="block mb-2 text-gray-700 flex items-center">
                                <FaClipboardList className="mr-2 text-blue-500" />
                                <strong>Tipo de Amputacion *</strong>
                            </label>
                            <Dropdown
                                name="tipoAmputacion"
                                value={historial.tipoAmputacion}
                                options={tiposAmputacion}
                                onChange={(e) => setHistorial(prev => ({ ...prev, tipoAmputacion: e.value as number }))}
                                placeholder="Seleccione Tipo de Amputación"
                                className={`w-full p-2 border ${errors.tipoAmputacion ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                            />
                            {errors.tipoAmputacion && <small className="text-red-500">Este campo es obligatorio.</small>}
                        </div>

                        {/* Lado de Amputación */}
                        <div>
                            <label className="block mb-2 text-gray-700 flex items-center">
                                <FaArrowsAltH className="mr-2 text-blue-500" />
                                <strong>Lado de Amputacion *</strong>
                            </label>
                            <Dropdown
                                name="ladoAmputacion"
                                value={historial.ladoAmputacion}
                                options={ladosAmputacion}
                                onChange={(e) => setHistorial(prev => ({ ...prev, ladoAmputacion: e.value as number }))}
                                placeholder="Seleccione Lado de Amputación"
                                className={`w-full p-2 border ${errors.ladoAmputacion ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                            />
                            {errors.ladoAmputacion && <small className="text-red-500">Este campo es obligatorio.</small>}
                        </div>

                        {/* Fecha de Amputación */}
                        <div>
                            <label className="block mb-2 text-gray-700 flex items-center">
                                <FaCalendarAlt className="mr-2 text-blue-500" />
                                <strong>Fecha de Amputacion *</strong>
                            </label>
                            <InputText
                                type="date"
                                name="fechaAmputacion"
                                value={historial.fechaAmputacion}
                                onChange={handleHistorialChange}
                                required
                                className={`w-full p-2 border ${errors.fechaAmputacion ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                            />
                            {errors.fechaAmputacion && <small className="text-red-500">Este campo es obligatorio.</small>}
                        </div>

                        {/* Causa */}
                        <div>
                            <label className="block mb-2 text-gray-700 flex items-center">
                                <FaInfoCircle className="mr-2 text-blue-500" />
                                <strong>Causa *</strong>
                            </label>
                            <Dropdown
                                name="causa"
                                value={historial.causa}
                                options={causasAmputacion}
                                onChange={(e) => setHistorial(prev => ({ ...prev, causa: e.value as number }))}
                                placeholder="Seleccione Causa de Amputación"
                                className={`w-full p-2 border ${errors.causa ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                            />
                            {errors.causa && <small className="text-red-500">Este campo es obligatorio.</small>}
                        </div>

                        {/* Terapia */}
                        <div className="col-span-1 sm:col-span-2 flex items-center">
                            <Checkbox
                                inputId="terapia"
                                name="terapia"
                                checked={historial.terapia}
                                onChange={(e) => setHistorial(prev => ({ ...prev, terapia: e.checked }))}
                            />
                            <label htmlFor="terapia" className="ml-2 text-gray-700 flex items-center">
                                <FaThermometerHalf className="mr-2 text-blue-500" />
                                <strong>Terapia</strong>
                            </label>
                            {errors.terapia && <small className="text-red-500 ml-2">Este campo es obligatorio.</small>}
                        </div>

                        {/* Tiempo de Terapia */}
                        {historial.terapia && (
                            <div className="col-span-1 sm:col-span-2">
                                <label className="block mb-2 text-gray-700 flex items-center">
                                    <FaClock className="mr-2 text-blue-500" />
                                    <strong>Tiempo de Terapia *</strong>
                                </label>
                                <InputText
                                    name="tiempoTerapia"
                                    value={historial.tiempoTerapia}
                                    onChange={handleHistorialChange}
                                    required={historial.terapia}
                                    className={`w-full p-2 border ${errors.tiempoTerapia ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                                />
                                {errors.tiempoTerapia && <small className="text-red-500">Este campo es obligatorio.</small>}
                            </div>
                        )}

                        {/* Comentario */}
                        <div className="col-span-1 sm:col-span-2">
                            <label className="block mb-2 text-gray-700 flex items-center">
                                <FaComment className="mr-2 text-blue-500" />
                                <strong>Comentario</strong>
                            </label>
                            <InputTextarea
                                name="comentario"
                                value={formData.comentario}
                                onChange={handleChange}
                                rows={4}
                                // No es obligatorio
                                className={`w-full p-2 border ${errors.comentario ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                            />
                            {errors.comentario && <small className="text-red-500">Este campo es obligatorio.</small>}
                        </div>
                    </div>
                </div>

                {/* Botones de Guardar y Descartar */}
                <div className="flex flex-col sm:flex-row justify-end mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
                    {/* Botón Guardar Cambios */}
                    <Button
                        type="submit"
                        className="flex items-center justify-center w-full sm:w-auto p-button-success bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-transform duration-200 transform hover:scale-105 shadow-md"
                    >
                        <FaSave className="mr-2" />
                        Guardar Cambios
                    </Button>
                    {/* Botón Descartar */}
                    <Button
                        type="button"
                        className="flex items-center justify-center w-full sm:w-auto p-button-secondary bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-transform duration-200 transform hover:scale-105 shadow-md"
                        onClick={handleDiscard}
                    >
                        <FaUndo className="mr-2" />
                        Descartar
                    </Button>
                </div>
            </form>

            {/* Modal de Éxito */}
            <Dialog
                header="Éxito"
                visible={isSuccessDialogVisible}
                style={{ width: '90%', maxWidth: '400px' }}
                onHide={() => setSuccessDialogVisible(false)}
                footer={
                    <div className="flex justify-end">
                        <Button
                            className="flex items-center justify-center p-button-success bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-transform duration-200 transform hover:scale-105 shadow-md"
                            onClick={() => setSuccessDialogVisible(false)}
                        >
                            <FaSave className="mr-2" />
                            Cerrar
                        </Button>
                    </div>
                }
                modal
                dismissableMask
            >
                <p>El paciente ha sido actualizado exitosamente.</p>
            </Dialog>
        </div>
    );

};

export default EditPaciente;
