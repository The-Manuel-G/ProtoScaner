// src/components/RegistroPaciente.tsx
import React, { useState, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { ToastContainer, toast } from 'react-toastify';
import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'react-toastify/dist/ReactToastify.css';
import { Paciente } from '../../types/Paciente';
import { HistorialPacienteIngreso } from '../../types/HistorialPacienteIngreso';
import { createPaciente } from '../../services/PacienteService';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../App';

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
    const [totalSize, setTotalSize] = useState(0);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const themeContext = useContext(ThemeContext);

    const generos = [
        { label: 'Masculino', value: 1 },
        { label: 'Femenino', value: 2 }
    ];

    const provincias = [
        { label: 'Azua', value: 1 },
        { label: 'Bahoruco', value: 2 },
        { label: 'Barahona', value: 3 },
        { label: 'Dajab�n', value: 4 },
        { label: 'Distrito Nacional', value: 5 },
        { label: 'Duarte', value: 6 },
        { label: 'El Seibo', value: 7 },
        { label: 'El�as Pi�a', value: 8 },
        { label: 'Espaillat', value: 9 },
        { label: 'Hato Mayor', value: 10 },
        { label: 'Hermanas Mirabal', value: 11 },
        { label: 'Independencia', value: 12 },
        { label: 'La Altagracia', value: 13 },
        { label: 'La Romana', value: 14 },
        { label: 'La Vega', value: 15 },
        { label: 'Mar�a Trinidad S�nchez', value: 16 },
        { label: 'Monse�or Nouel', value: 17 },
        { label: 'Monte Cristi', value: 18 },
        { label: 'Monte Plata', value: 19 },
        { label: 'Pedernales', value: 20 },
        { label: 'Peravia', value: 21 },
        { label: 'Puerto Plata', value: 22 },
        { label: 'Saman�', value: 23 },
        { label: 'San Crist�bal', value: 24 },
        { label: 'San Jos� de Ocoa', value: 25 },
        { label: 'San Juan', value: 26 },
        { label: 'San Pedro de Macor�s', value: 27 },
        { label: 'S�nchez Ram�rez', value: 28 },
        { label: 'Santiago', value: 29 },
        { label: 'Santiago Rodr�guez', value: 30 },
        { label: 'Santo Domingo', value: 31 },
        { label: 'Valverde', value: 32 }
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
        { label: 'Cong�nita', value: 1 },
        { label: 'Enfermedad', value: 2 },
        { label: 'Accidente', value: 3 },
        { label: 'Diabetes' , value: 4},
        { label: 'Infecci�n', value: 5 },
        { label: 'Traumatismo', value: 6 },
        { label: 'C�ncer', value: 7 },
        { label: 'Vascular', value: 8 },
        { label: 'Quemaduras', value: 9 },
        { label: 'Lesiones deportivas', value: 10 },
        { label: 'Mala circulaci�n', value: 11 },
        { label: 'Frostbite (congelaci�n)', value: 12 },
        { label: 'Neuropat�a perif�rica', value: 13 },
        { label: 'S�ndrome de compartimento', value: 14 },
        { label: 'Trombosis venosa profunda', value: 15 },
        { label: 'Complicaciones quir�rgicas', values: 16 },
        { label: 'Infecciones �seas', values: 17 },
        { label: 'Tumores benignos', values: 18 },
        { label: 'Trastornos neuromusculares', values: 19 },
        { label: 'Exposici�n a sustancias t�xicas', values: 20 },
        { label: 'Malformaciones cong�nitas', values: 21 },
        { label: 'Factores gen�ticos', values: 22 },
        { label: 'Otro', value: 23 }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleHistorialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setHistorialData({ ...historialData, [name]: value });
    };

    const handleDropdownChange = (e: { value: any }, field: keyof Omit<Paciente, 'idPaciente'>) => {
        setFormData({ ...formData, [field]: e.value });
    };

    const handleDropdownHistorialChange = (e: { value: any }, field: keyof Omit<HistorialPacienteIngreso, 'idHistorial' | 'idPaciente'>) => {
        setHistorialData({ ...historialData, [field]: e.value });
    };

    const onTemplateSelect = (e: FileUploadSelectEvent) => {
        const file = e.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setFormData({ ...formData, fotoPaciente: reader.result as string });
                }
            };
            reader.readAsDataURL(file);
            setTotalSize(file.size);
        }
    };

    // Funci�n para abrir la c�mara y capturar una foto
    const openCamera = () => {
        const video = document.createElement("video");
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            video.srcObject = stream;
            video.play();

            const capture = () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context?.drawImage(video, 0, 0);
                const dataURL = canvas.toDataURL("image/png");
                setFormData({ ...formData, fotoPaciente: dataURL });
                stream.getTracks().forEach(track => track.stop()); // Stop camera
            };

            setTimeout(capture, 3000); // Captura autom�tica despu�s de 3 segundos
        });
    };

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (currentStep === 0) {
            if (formData.nombreCompleto && formData.cedula && formData.genero !== undefined && formData.fechaNacimiento) {
                setCurrentStep(1);
            } else {
                toast.error('Complete los campos obligatorios');
            }
        } else if (currentStep === 1) {
            setCurrentStep(2);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createPaciente(formData);
            toast.success('Paciente registrado con �xito');
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
        setShowSuccessDialog(false);
        setShowErrorDialog(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className={`w-full max-w-4xl ${themeContext?.theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} shadow-lg rounded-lg p-8 transition-all duration-500`}>
                <h2 className="text-3xl font-semibold text-center mb-6">Registro de Paciente</h2>
                <form className="space-y-8">
                    {currentStep === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label htmlFor="nombreCompleto" className="block text-lg font-medium mb-2">Nombre Completo</label>
                                <InputText
                                    id="nombreCompleto"
                                    name="nombreCompleto"
                                    value={formData.nombreCompleto}
                                    onChange={handleChange}
                                    className="w-full p-4 text-xl rounded-md border"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="cedula" className="block text-lg font-medium mb-2">C�dula</label>
                                <InputText
                                    id="cedula"
                                    name="cedula"
                                    value={formData.cedula}
                                    onChange={handleChange}
                                    className="w-full p-4 text-xl rounded-md border"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="genero" className="block text-lg font-medium mb-2">G�nero</label>
                                <Dropdown
                                    id="genero"
                                    name="genero"
                                    value={formData.genero}
                                    options={generos}
                                    onChange={(e) => handleDropdownChange(e, 'genero')}
                                    className="w-full p-4 text-xl rounded-md border"
                                    placeholder="Seleccione"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="fechaNacimiento" className="block text-lg font-medium mb-2">Fecha de Nacimiento</label>
                                <Calendar
                                    id="fechaNacimiento"
                                    name="fechaNacimiento"
                                    value={formData.fechaNacimiento ? new Date(formData.fechaNacimiento) : null}
                                    onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.value ? new Date(e.value).toISOString().split('T')[0] : '' })}
                                    className="w-full p-4 text-xl rounded-md border"
                                    dateFormat="mm/dd/yy"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="idProvincia" className="block text-lg font-medium mb-2">Provincia</label>
                                <Dropdown
                                    id="idProvincia"
                                    name="idProvincia"
                                    value={formData.idProvincia}
                                    options={provincias}
                                    onChange={(e) => handleDropdownChange(e, 'idProvincia')}
                                    className="w-full p-4 text-xl rounded-md border"
                                    placeholder="Seleccione"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="sector" className="block text-lg font-medium mb-2">Sector</label>
                                <InputText
                                    id="sector"
                                    name="sector"
                                    value={formData.sector}
                                    onChange={handleChange}
                                    className="w-full p-4 text-xl rounded-md border"
                                />
                            </div>
                            <div>
                                <label htmlFor="comentario" className="block text-lg font-medium mb-2">Comentario</label>
                                <InputTextarea
                                    id="comentario"
                                    name="comentario"
                                    value={formData.comentario}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full p-4 text-xl rounded-md border"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="fotoPaciente" className="block text-lg font-medium mb-2">Foto del Paciente</label>
                                <div className="flex gap-2">
                                    <FileUpload
                                        name="fotoPaciente"
                                        accept="image/*"
                                        maxFileSize={10000000}
                                        onSelect={onTemplateSelect}
                                        chooseOptions={{ icon: 'pi pi-camera', className: 'p-button-rounded p-button-info mr-2' }}
                                        cancelOptions={{ icon: 'pi pi-times', className: "p-button-rounded p-button-danger" }}
                                        className="text-2xl p-4 rounded-md border"
                                    />
                                    <Button label="Abrir C�mara" icon="pi pi-camera" className="p-button-success p-button-rounded" onClick={openCamera} />
                                </div>
                                <ProgressBar value={(totalSize / 10000) * 10} showValue={false} className="mt-2" />
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                    <div>
                                        <label htmlFor="tipoAmputacion" className="block text-lg font-medium mb-2">Tipo de Amputaci�n</label>
                                        <Dropdown
                                            id="tipoAmputacion"
                                            name="tipoAmputacion"
                                            value={historialData.tipoAmputacion}
                                            options={tiposAmputacion}
                                            onChange={(e) => handleDropdownHistorialChange(e, 'tipoAmputacion')}
                                            className="w-full p-4 text-xl rounded-md border"
                                            placeholder="Seleccione"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="ladoAmputacion" className="block text-lg font-medium mb-2">Lado de Amputaci�n</label>
                                        <Dropdown
                                            id="ladoAmputacion"
                                            name="ladoAmputacion"
                                            value={historialData.ladoAmputacion}
                                            options={ladosAmputacion}
                                            onChange={(e) => handleDropdownHistorialChange(e, 'ladoAmputacion')}
                                            className="w-full p-4 text-xl rounded-md border"
                                            placeholder="Seleccione"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="fechaAmputacion" className="block text-lg font-medium mb-2">Fecha de Amputaci�n</label>
                                        <Calendar
                                            id="fechaAmputacion"
                                            name="fechaAmputacion"
                                            value={historialData.fechaAmputacion ? new Date(historialData.fechaAmputacion) : null}
                                            onChange={(e) => setHistorialData({ ...historialData, fechaAmputacion: e.value ? new Date(e.value).toISOString().split('T')[0] : '' })}
                                            className="w-full p-4 text-xl rounded-md border"
                                            dateFormat="mm/dd/yy"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="causa" className="block text-lg font-medium mb-2">Causa</label>
                                        <Dropdown
                                            id="causa"
                                            name="causa"
                                            value={historialData.causa}
                                            options={causasAmputacion}
                                            onChange={(e) => handleDropdownHistorialChange(e, 'causa')}
                                            className="w-full p-4 text-xl rounded-md border"
                                            placeholder="Seleccione"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="terapia" className="block text-lg font-medium mb-2">Terapia</label>
                                        <Dropdown
                                            id="terapia"
                                            name="terapia"
                                            value={historialData.terapia}
                                            options={[
                                                { label: 'S�', value: true },
                                                { label: 'No', value: false }
                                            ]}
                                            onChange={(e) => handleDropdownHistorialChange(e, 'terapia')}
                                            className="w-full p-4 text-xl rounded-md border"
                                            placeholder="Seleccione"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="tiempoTerapia" className="block text-lg font-medium mb-2">Tiempo de Terapia</label>
                                        <InputText
                                            id="tiempoTerapia"
                                            name="tiempoTerapia"
                                            value={historialData.tiempoTerapia}
                                            onChange={handleHistorialChange}
                                            className="w-full p-4 text-xl rounded-md border"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="comentario" className="block text-lg font-medium mb-2">Comentario</label>
                                        <InputTextarea
                                            id="comentario"
                                            name="comentario"
                                            value={historialData.comentario}
                                            onChange={handleHistorialChange}
                                            rows={3}
                                            className="w-full p-4 text-xl rounded-md border"
                                        />
                                    </div>
                        </motion.div>
                    )}
                    <div className="flex justify-between mt-6">
                        <Button label="Descartar" className="p-button-danger p-4 text-xl shadow-lg rounded-md" onClick={() => setShowCancelDialog(true)} />
                        <Button label={currentStep < 1 ? "Siguiente" : "Registrar"} className="p-button-success p-4 text-xl shadow-lg rounded-md" onClick={currentStep < 1 ? handleNext : handleSubmit} />
                    </div>
                </form>
            </div>

            {/* Di�logos de confirmaci�n y notificaciones */}
            <Dialog header="Cancelar Registro" visible={showCancelDialog} style={{ width: '50vw' }} onHide={() => setShowCancelDialog(false)}>
                <p>�Est� seguro de que desea cancelar el registro? Los datos ingresados no se guardar�n.</p>
                <div className="flex justify-end gap-3 mt-4">
                    <Button label="No" className="p-button-text p-4" onClick={() => setShowCancelDialog(false)} />
                    <Button label="S�" className="p-button-danger p-4 text-xl shadow-lg" onClick={() => { resetForm(); setShowCancelDialog(false); }} />
                </div>
            </Dialog>

            <Dialog header="Registro Exitoso" visible={showSuccessDialog} style={{ width: '50vw' }} onHide={resetForm}>
                <p>El paciente ha sido registrado con �xito.</p>
                <Button label="Aceptar" className="p-button-success p-4 text-xl shadow-lg" onClick={resetForm} />
            </Dialog>

            <Dialog header="Error en el Registro" visible={showErrorDialog} style={{ width: '50vw' }} onHide={() => setShowErrorDialog(false)}>
                <p>Hubo un problema al registrar el paciente. Por favor, intente nuevamente.</p>
                <Button label="Cerrar" className="p-button-danger p-4 text-xl shadow-lg" onClick={() => setShowErrorDialog(false)} />
            </Dialog>

            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
}

export default RegistroPaciente;


    