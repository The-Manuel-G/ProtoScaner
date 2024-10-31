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
import { createPaciente } from '../../services/PacienteService';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../App';

export function RegistroPaciente() {
    const [formData, setFormData] = useState<Omit<Paciente, 'idPaciente'>>({
        nombreCompleto: '',
        cedula: '',
        genero: null,
        fechaNacimiento: '',
        direccion: '',
        telefono: '',
        telefonoCelular: '',
        idProvincia: null,
        sector: '',
        comentario: '',
        fotoPaciente: ''
    });

    const [totalSize, setTotalSize] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const themeContext = useContext(ThemeContext);

    const generos = [
        { label: 'Masculino', value: 1 },
        { label: 'Femenino', value: 2 }
    ];

    const provincias = [
        { label: 'Distrito Nacional', value: 1 },
        { label: 'Santo Domingo', value: 2 }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDropdownChange = (e: { value: any }, field: keyof Omit<Paciente, 'idPaciente'>) => {
        setFormData({ ...formData, [field]: e.value });
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

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (currentStep === 0) {
            if (formData.nombreCompleto && formData.cedula && formData.genero !== null && formData.fechaNacimiento) {
                setCurrentStep(1);
            } else {
                toast.error('Complete los campos obligatorios');
            }
        } else if (currentStep === 1) {
            handleSubmit(e);
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await createPaciente({
                ...formData,
                fechaNacimiento: formData.fechaNacimiento
                    ? new Date(formData.fechaNacimiento).toISOString().split('T')[0]
                    : ''
            });
            setShowSuccessDialog(true);
        } catch (error) {
            toast.error('Error al registrar el paciente');
            setShowErrorDialog(true);
        }
    };

    const resetForm = () => {
        setFormData({
            nombreCompleto: '',
            cedula: '',
            genero: null,
            fechaNacimiento: '',
            direccion: '',
            telefono: '',
            telefonoCelular: '',
            idProvincia: null,
            sector: '',
            comentario: '',
            fotoPaciente: ''
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
                                <label htmlFor="cedula" className="block text-lg font-medium mb-2">Cédula</label>
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
                                <label htmlFor="genero" className="block text-lg font-medium mb-2">Género</label>
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
                        </motion.div>
                    )}
                    {currentStep === 1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label htmlFor="direccion" className="block text-lg font-medium mb-2">Dirección</label>
                                <InputText
                                    id="direccion"
                                    name="direccion"
                                    value={formData.direccion}
                                    onChange={handleChange}
                                    className="w-full p-4 text-xl rounded-md border"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="telefono" className="block text-lg font-medium mb-2">Teléfono</label>
                                <InputText
                                    id="telefono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    className="w-full p-4 text-xl rounded-md border"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="telefonoCelular" className="block text-lg font-medium mb-2">Teléfono Celular</label>
                                <InputText
                                    id="telefonoCelular"
                                    name="telefonoCelular"
                                    value={formData.telefonoCelular}
                                    onChange={handleChange}
                                    className="w-full p-4 text-xl rounded-md border"
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
                                <label htmlFor="sector" className="block text-lg font-medium mb-2">Sector (Opcional)</label>
                                <InputText
                                    id="sector"
                                    name="sector"
                                    value={formData.sector}
                                    onChange={handleChange}
                                    className="w-full p-4 text-xl rounded-md border"
                                />
                            </div>
                            <div>
                                <label htmlFor="comentario" className="block text-lg font-medium mb-2">Observaciones (Opcional)</label>
                                <InputTextarea
                                    id="comentario"
                                    name="comentario"
                                    value={formData.comentario}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full p-4 text-xl rounded-md border"
                                />
                            </div>
                            <div>
                                <label htmlFor="fotoPaciente" className="block text-lg font-medium mb-2">Foto del Paciente (Opcional)</label>
                                <FileUpload
                                    name="fotoPaciente"
                                    accept="image/*"
                                    maxFileSize={1000000}
                                    onSelect={onTemplateSelect}
                                    chooseOptions={{ icon: 'pi pi-camera', className: 'p-button-rounded p-button-info mr-2' }}
                                    cancelOptions={{ icon: 'pi pi-times', className: "p-button-rounded p-button-danger" }}
                                    className="text-2xl p-4 rounded-md border"
                                />
                                <ProgressBar value={(totalSize / 10000) * 10} showValue={false} className="mt-2" />
                            </div>
                        </motion.div>
                    )}
                    <div className="flex justify-between mt-6">
                        <Button label="Descartar" className="p-button-danger p-4 text-xl shadow-lg rounded-md" onClick={() => setShowCancelDialog(true)} />
                        <Button label={currentStep < 1 ? "Siguiente" : "Registrar"} className="p-button-success p-4 text-xl shadow-lg rounded-md" onClick={handleNext} />
                    </div>
                </form>
            </div>

            {/* Diálogo de Cancelación */}
            <Dialog header="Cancelar Registro" visible={showCancelDialog} style={{ width: '50vw' }} onHide={() => setShowCancelDialog(false)}>
                <p>¿Está seguro de que desea cancelar el registro? Los datos ingresados no se guardarán.</p>
                <div className="flex justify-end gap-3 mt-4">
                    <Button label="No" className="p-button-text p-4" onClick={() => setShowCancelDialog(false)} />
                    <Button label="Sí" className="p-button-danger p-4 text-xl shadow-lg" onClick={() => { resetForm(); setShowCancelDialog(false); }} />
                </div>
            </Dialog>

            {/* Diálogo de Registro Exitoso */}
            <Dialog header="Registro Exitoso" visible={showSuccessDialog} style={{ width: '50vw' }} onHide={resetForm}>
                <p>El paciente ha sido registrado con éxito.</p>
                <Button label="Aceptar" className="p-button-success p-4 text-xl shadow-lg" onClick={resetForm} />
            </Dialog>

            {/* Diálogo de Error en el Registro */}
            <Dialog header="Error en el Registro" visible={showErrorDialog} style={{ width: '50vw' }} onHide={() => setShowErrorDialog(false)}>
                <p>Hubo un problema al registrar el paciente. Por favor, intente nuevamente.</p>
                <Button label="Cerrar" className="p-button-danger p-4 text-xl shadow-lg" onClick={() => setShowErrorDialog(false)} />
            </Dialog>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
}

export default RegistroPaciente;
