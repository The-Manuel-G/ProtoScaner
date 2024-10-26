import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa el CSS de react-toastify
import { useNavigate } from 'react-router-dom';
import { FileUpload, FileUploadHeaderTemplateOptions, FileUploadSelectEvent, FileUploadUploadEvent, ItemTemplateOptions } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import 'primeicons/primeicons.css';

const roles = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Usuario', value: 'user' },
];

export function UserRegistrationForm() {
    const [nombre, setNombre] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [role, setRole] = useState<string | null>(null);
    const [totalSize, setTotalSize] = useState(0);
    const navigate = useNavigate();
    const fileUploadRef = useRef<FileUpload>(null);

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }
        if (!role) {
            toast.error('Por favor, selecciona un rol');
            return;
        }
        navigate('/usuarios');
    };

    const onTemplateSelect = (e: FileUploadSelectEvent) => {
        if (fileUploadRef.current?.getFiles().length > 0) {
            fileUploadRef.current.clear();
        }
        setTotalSize(e.files[0]?.size || 0);
    };

    const onTemplateUpload = (e: FileUploadUploadEvent) => {
        let _totalSize = 0;
        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });
        setTotalSize(_totalSize);
        toast.info('Archivo subido con éxito');
    };

    const onTemplateRemove = (file: File, callback: Function) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const { className, chooseButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

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
                    <img alt={file.name} role="presentation" src={file.objectURL} width={80} height={80} />
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
                    onClick={() => onTemplateRemove(file, props.onRemove)}
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
                            <label htmlFor="nombre" className="block text-lg font-medium mb-2 text-gray-200">Nombre</label>
                            <InputText
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
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
                            <label htmlFor="role" className="block text-lg font-medium mb-2 text-gray-200">Rol</label>
                            <Dropdown
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.value)}
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
                                url="/api/upload"
                                accept="image/*"
                                maxFileSize={1000000}
                                onUpload={onTemplateUpload}
                                onSelect={onTemplateSelect}
                                onError={onTemplateClear}
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
