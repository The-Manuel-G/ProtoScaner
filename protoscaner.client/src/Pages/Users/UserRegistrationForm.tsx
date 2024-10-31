// src/components/UserRegistrationForm.tsx

import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FileUpload, FileUploadSelectEvent, ItemTemplateOptions } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import 'primeicons/primeicons.css';
import { createUsuario } from '../../services/UsuarioService';
import { CreateUsuarioDTO } from '../../types/Usuario';

const roles = [
    { label: 'Diseñadores', value: 1 },
    { label: 'Técnicos', value: 2 },
    { label: 'Soportes', value: 3 },
    { label: 'Directiva', value: 4 },
];

export function UserRegistrationForm() {
    const [nombreUsuario, setNombreUsuario] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [idRol, setIdRol] = useState<number | null>(null);
    const [imagen, setImagen] = useState<string | null>(null);
    const [totalSize, setTotalSize] = useState(0);
    const navigate = useNavigate();
    const fileUploadRef = useRef<FileUpload>(null);

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }
        if (!idRol) {
            toast.error('Por favor, selecciona un rol');
            return;
        }

        const usuarioData: CreateUsuarioDTO = {
            nombreUsuario,
            email,
            passwordHash: password,
            idRol,
            activo: true,
            fechaCreacion: new Date().toISOString().split('T')[0], // Formato "YYYY-MM-DD"
            imagenPerfil: imagen ? { imagen: imagen, descripcion: "Imagen de perfil" } : undefined,
        };

        try {
            await createUsuario(usuarioData);
            toast.success('Usuario creado con éxito');
            navigate('/usuarios');
        } catch (error) {
            toast.error('Error al crear el usuario');
            console.error(error);
        }
    };

    const onTemplateSelect = (e: FileUploadSelectEvent) => {
        fileUploadRef.current?.clear();
        setTotalSize(e.files[0]?.size || 0);

        const file = e.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result as string;
            setImagen(base64String.split(',')[1]); // Extrae solo el contenido base64
        };
        reader.readAsDataURL(file); // Convierte a base64
    };

    const onTemplateClear = () => {
        setTotalSize(0);
        setImagen(null);
    };

    const headerTemplate = (options: any) => {
        const { className, chooseButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef.current?.formatSize(totalSize) || '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
        const file = inFile as File;
        return (
            <div className="flex align-items-center flex-wrap" style={{ maxHeight: '120px', overflowY: 'auto' }}>
                <div className="flex align-items-center" style={{ width: '30%' }}>
                    <img alt={file.name} role="presentation" src={URL.createObjectURL(file)} width={80} height={80} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button
                    type="button"
                    icon="pi pi-times"
                    className="p-button-outlined p-button-rounded p-button-danger ml-auto"
                    onClick={() => props.onRemove?.(file as any)} // Cambia a `file as any` para evitar problemas de tipado
                />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column" style={{ width: '200px', height: '200px', borderRadius: '2rem' }}>
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '3rem', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1em', color: 'var(--text-color-secondary)' }} className="my-2">
                    Arrastra y suelta la imagen aquí
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

 

   

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl bg-gray-800 shadow-lg rounded-lg p-8 text-white">
                <h2 className="text-3xl font-semibold text-center mb-6">Registro de Usuario</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="mb-4">
                            <label htmlFor="nombreUsuario" className="block text-lg font-medium mb-2 text-gray-200">Nombre</label>
                            <InputText
                                id="nombreUsuario"
                                value={nombreUsuario}
                                onChange={(e) => setNombreUsuario(e.target.value)}
                                placeholder="Introduce el nombre"
                                className="w-full p-inputtext-lg"
                                style={{ color: 'black', backgroundColor: 'white' }}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-lg font-medium mb-2 text-gray-200">Email</label>
                            <InputText
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Introduce el email"
                                className="w-full p-inputtext-lg"
                                style={{ color: 'black', backgroundColor: 'white' }}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-lg font-medium mb-2 text-gray-200">Contraseña</label>
                            <Password
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                toggleMask
                                placeholder="Introduce la contraseña"
                                className="w-full p-inputtext-lg"
                                inputStyle={{ color: 'black', backgroundColor: 'white' }}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-lg font-medium mb-2 text-gray-200">Confirmar Contraseña</label>
                            <Password
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                toggleMask
                                placeholder="Confirma la contraseña"
                                className="w-full p-inputtext-lg"
                                inputStyle={{ color: 'black', backgroundColor: 'white' }}
                            />
                        </div>

                        <div className="flex justify-between mt-6">
                            <Button
                                label="Descartar"
                                className="p-button-danger p-button-lg shadow-lg w-full md:w-auto mb-4 md:mb-0"
                                onClick={() => navigate('/usuarios')}
                                style={{ backgroundColor: '#ff6b6b', borderColor: '#ff6b6b', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Button
                                label="Confirmar"
                                className="p-button-success p-button-lg shadow-lg w-full md:w-auto"
                                onClick={handleSubmit}
                                style={{ backgroundColor: '#38b000', borderColor: '#38b000', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="mb-4">
                            <label htmlFor="idRol" className="block text-lg font-medium mb-2 text-gray-200">Rol</label>
                            <Dropdown
                                id="idRol"
                                value={idRol}
                                onChange={(e) => setIdRol(e.value)}
                                options={roles}
                                placeholder="Selecciona un rol"
                                className="w-full p-inputtext-lg"
                                style={{ color: 'black', backgroundColor: 'white' }}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="imagen" className="block text-lg font-medium mb-2 text-gray-200">Subir Imagen</label>
                            <FileUpload
                                ref={fileUploadRef}
                                name="image"
                                accept="image/*"
                                maxFileSize={1000000}
                                onSelect={onTemplateSelect}
                                onClear={onTemplateClear}
                                headerTemplate={headerTemplate}
                                itemTemplate={itemTemplate}
                                emptyTemplate={emptyTemplate}
                                chooseOptions={chooseOptions}
                                cancelOptions={cancelOptions}
                                className="w-full p-fileupload p-fileupload-basic"
                                style={{ backgroundColor: '#1f2937' }}
                            />
                        </div>
                    </div>
                </div>

                <ToastContainer position="top-right" autoClose={5000} />
            </div>
        </div>
    );
}
