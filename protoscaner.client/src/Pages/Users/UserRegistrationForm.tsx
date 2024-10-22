import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { ToastContainer, toast } from 'react-toastify';
import { FileUpload } from 'primereact/fileupload'; // Importamos el componente FileUpload de PrimeReact
import { ProgressBar } from 'primereact/progressbar';
import { useNavigate } from 'react-router-dom';

const roles = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Usuario', value: 'user' },
];

const UserRegistrationForm: React.FC = () => {
    const [nombre, setNombre] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [role, setRole] = useState<string | null>(null);
    const [totalSize, setTotalSize] = useState(0); // Tamaño total para el archivo
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

        // Aquí iría la lógica para registrar al usuario
        console.log('Nombre:', nombre);
        console.log('Email:', email);
        console.log('Contraseña:', password);
        console.log('Rol:', role);

        navigate('/gestion-usuarios');
    };

    const onTemplateSelect = (e: any) => {
        let _totalSize = totalSize;
        let files = e.files;

        for (let i = 0; i < files.length; i++) {
            _totalSize += files[i].size || 0;
        }

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e: any) => {
        let _totalSize = 0;

        e.files.forEach((file: any) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.success('Imagen subida correctamente');
    };

    const headerTemplate = () => {
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="mr-auto">{formatedValue} / 1 MB</span>
                <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900"> {/* Fondo oscuro */}
            <div className="w-full max-w-4xl bg-gray-800 shadow-lg rounded-lg p-8 text-white"> {/* Fondo gris oscuro */}
                <h2 className="text-3xl font-semibold text-center mb-6">Registro de Usuario</h2>

                <div className="grid grid-cols-2 gap-8"> {/* Dividimos el formulario en 2 columnas */}
                    {/* Columna Izquierda */}
                    <div>
                        {/* Campo de Nombre */}
                        <div className="mb-4">
                            <label htmlFor="nombre" className="block text-lg font-medium mb-2 text-gray-200">Nombre</label>
                            <InputText
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Introduce el nombre"
                                className="w-full p-inputtext-lg"
                                style={{ color: 'black', backgroundColor: 'white' }} // Color de texto negro sobre fondo blanco
                            />
                        </div>

                        {/* Campo de Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-lg font-medium mb-2 text-gray-200">Email</label>
                            <InputText
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Introduce el email"
                                className="w-full p-inputtext-lg"
                                style={{ color: 'black', backgroundColor: 'white' }} // Color de texto negro
                            />
                        </div>

                        {/* Campo de Contraseña */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-lg font-medium mb-2 text-gray-200">Contraseña</label>
                            <Password
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                toggleMask
                                placeholder="Introduce la contraseña"
                                className="w-full p-inputtext-lg"
                                inputStyle={{ color: 'black', backgroundColor: 'white' }} // Color de texto negro en campo de contraseña
                            />
                        </div>

                        {/* Campo de Confirmar Contraseña */}
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-lg font-medium mb-2 text-gray-200">Confirmar Contraseña</label>
                            <Password
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                toggleMask
                                placeholder="Confirma la contraseña"
                                className="w-full p-inputtext-lg"
                                inputStyle={{ color: 'black', backgroundColor: 'white' }} // Color de texto negro en el campo
                            />
                        </div>
                    </div>

                    {/* Columna Derecha */}
                    <div>
                        {/* Dropdown para seleccionar Rol */}
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-lg font-medium mb-2 text-gray-200">Rol</label>
                            <Dropdown
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.value)}
                                options={roles}
                                placeholder="Selecciona un rol"
                                className="w-full p-inputtext-lg"
                                style={{ color: 'black', backgroundColor: 'white' }} // Color de texto negro
                            />
                        </div>

                        {/* FileUpload para subir imagen */}
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
                                headerTemplate={headerTemplate}
                                chooseOptions={{ label: 'Elegir Imagen', icon: 'pi pi-fw pi-images', iconOnly: false }} // Usamos icono e texto
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Botones para confirmar o descartar */}
                <div className="flex justify-between mt-6">
                    <Button
                        label="Descartar"
                        className="p-button-danger p-button-lg"
                        onClick={() => navigate('/gestion-usuarios')}
                    />
                    <Button
                        label="Confirmar"
                        className="p-button-success p-button-lg"
                        onClick={handleSubmit}
                    />
                </div>

                {/* Notificaciones de error */}
                <ToastContainer position="top-right" autoClose={5000} />
            </div>
        </div>
    );
};

export default UserRegistrationForm;
