// src/pages/RegistroPaciente.tsx

import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { ToastContainer, toast } from 'react-toastify';
import { FileUpload, FileUploadSelectEvent, FileUploadUploadEvent, FileUploadHeaderTemplateOptions, ItemTemplateOptions } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Paciente } from '../types/Paciente';

const RegistroPaciente: React.FC = () => {
    const [formData, setFormData] = useState<Paciente>({
        idPaciente: 0,
        nombreCompleto: '',
        cedula: '',
        genero: 0,
        fechaNacimiento: '',
        direccion: '',
        telefono: '',
        telefonoCelular: '',
        idProvincia: 0,
        sector: '',
        insidencia: false,
        idEstatusPaciente: 0,
        idEstatusProtesis: 0,
        comentario: '',
        fotoPaciente: new Uint8Array()
    });

    const fileUploadRef = useRef<FileUpload>(null);
    const [totalSize, setTotalSize] = useState(0);

    const generos = [
        { label: 'Masculino', value: 1 },
        { label: 'Femenino', value: 2 }
    ];

    const provincias = [
        { label: 'Distrito Nacional', value: 1 },
        { label: 'Santo Domingo', value: 2 },
        // Añadir más provincias aquí si es necesario
    ];

    const estatusPaciente = [
        { label: 'Activo', value: 1 },
        { label: 'Inactivo', value: 2 }
    ];

    const estatusProtesis = [
        { label: 'Con Prótesis', value: 1 },
        { label: 'Sin Prótesis', value: 2 }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onTemplateSelect = (e: FileUploadSelectEvent) => {
        if (fileUploadRef.current?.getFiles().length > 0) {
            fileUploadRef.current.clear();
        }
        setTotalSize(e.files[0]?.size || 0);

        const file = e.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setFormData({ ...formData, fotoPaciente: new Uint8Array(reader.result as ArrayBuffer) });
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const onTemplateUpload = (e: FileUploadUploadEvent) => {
        let _totalSize = 0;
        e.files.forEach(file => {
            _totalSize += file.size || 0;
        });
        setTotalSize(_totalSize);
        toast.success('Archivo subido con éxito');
    };

    const onTemplateClear = () => {
        setTotalSize(0);
        setFormData({ ...formData, fotoPaciente: new Uint8Array() });
    };

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const { className, chooseButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formattedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formattedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const apiEndpoint = 'https://your-api-url/endpoint';
        const data = new FormData();

        Object.keys(formData).forEach(key => {
            const value = formData[key as keyof Paciente];
            if (value instanceof Uint8Array) {
                data.append(key, new Blob([value]));
            } else {
                data.append(key, value as string | Blob);
            }
        });

        try {
            const response = await axios.post(apiEndpoint, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Registro exitoso!');
            console.log('Respuesta del servidor:', response.data);
        } catch (error) {
            toast.error('Error al enviar los datos. Intente nuevamente.');
            console.error('Error al enviar los datos:', error);
        }
    };

    return (
        <div className="RegistroPaciente">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="form-container mx-auto max-w-xl mt-10">
                <Card title="REGISTRO DE PACIENTES" className="p-shadow-5 bg-gray-900 text-white">
                    <form onSubmit={handleSubmit} className="p-fluid space-y-4">
                        <div className="field">
                            <label htmlFor="nombre_completo" className="text-white">Nombre Completo</label>
                            <InputText
                                id="nombre_completo"
                                name="nombre_completo"
                                value={formData.nombreCompleto || ''}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="cedula" className="text-white">Cédula</label>
                            <InputText
                                id="cedula"
                                name="cedula"
                                value={formData.cedula || ''}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="genero" className="text-white">Género</label>
                            <Dropdown
                                id="genero"
                                name="genero"
                                value={formData.genero || null}
                                options={generos}
                                onChange={(e) => setFormData({ ...formData, genero: e.value })}
                                placeholder="Seleccione su género"
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="fecha_nacimiento" className="text-white">Fecha de Nacimiento</label>
                            <Calendar
                                id="fecha_nacimiento"
                                name="fecha_nacimiento"
                                value={formData.fechaNacimiento || null}
                                onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.value })}
                                placeholder="Fecha de Nacimiento"
                                className="input-field"
                                dateFormat="mm/dd/yy"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="direccion" className="text-white">Dirección</label>
                            <InputText
                                id="direccion"
                                name="direccion"
                                value={formData.direccion || ''}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="telefono" className="text-white">Teléfono</label>
                            <InputText
                                id="telefono"
                                name="telefono"
                                value={formData.telefono || ''}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="telefono_celular" className="text-white">Teléfono Celular</label>
                            <InputText
                                id="telefono_celular"
                                name="telefono_celular"
                                value={formData.telefonoCelular || ''}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="id_provincia" className="text-white">Provincia</label>
                            <Dropdown
                                id="id_provincia"
                                name="id_provincia"
                                value={formData.idProvincia || null}
                                options={provincias}
                                onChange={(e) => setFormData({ ...formData, idProvincia: e.value })}
                                placeholder="Seleccione una provincia"
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="sector" className="text-white">Sector</label>
                            <InputText
                                id="sector"
                                name="sector"
                                value={formData.sector || ''}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="observaciones" className="text-white">Observaciones</label>
                            <InputTextarea
                                id="observaciones"
                                name="observaciones"
                                value={formData.comentario || ''}
                                onChange={handleChange}
                                rows={3}
                                className="input-field"
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="fotoPaciente" className="text-white">Foto del Paciente</label>
                            <FileUpload
                                ref={fileUploadRef}
                                name="fotoPaciente"
                                accept="image/*"
                                maxFileSize={1000000}
                                onUpload={onTemplateUpload}
                                onSelect={onTemplateSelect}
                                onError={onTemplateClear}
                                onClear={onTemplateClear}
                                headerTemplate={headerTemplate}
                                className="input-field"
                            />
                        </div>

                        <div className="flex justify-center mt-6">
                            <Button label="Registrar" type="submit" className="p-button-lg p-button-success" />
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default RegistroPaciente;
