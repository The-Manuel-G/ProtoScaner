import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { CascadeSelect } from 'primereact/cascadeselect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUsuario } from '../../services/UsuarioService';
import { getRoles } from '../../services/RolService'; // Importando el servicio para obtener roles
import { Usuario } from '../../types/Usuario';

// Crear un tipo que excluya 'idUsuario' para la creación del usuario
type CreateUsuarioDTO = Omit<Usuario, 'idUsuario'>;

const UserRegistrationForm: React.FC = () => {
    const [nombreUsuario, setNombreUsuario] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [roles, setRoles] = useState<any[]>([]); // Estado para almacenar los roles
    const [selectedRol, setSelectedRol] = useState<any>(null); // Estado para almacenar el rol seleccionado
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    // Cargar roles al montar el componente
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const rolesData = await getRoles();
                setRoles(rolesData);
            } catch (error) {
                toast.error('Error al cargar los roles.');
            }
        };

        fetchRoles();
    }, []);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden.');
            return;
        }

        const newUser: CreateUsuarioDTO = {
            nombreUsuario,
            email,
            passwordHash: password,
            idRol: selectedRol?.idRol, // Establecer el ID del rol seleccionado
            fechaCreacion: new Date().toISOString(),
            activo: true
        };

        try {
            await createUsuario(newUser);
            setIsModalVisible(true); // Mostrar modal si el registro es exitoso
            toast.success('Usuario registrado con éxito');
            // Limpiar formulario
            setNombreUsuario('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setSelectedRol(null);
        } catch (error: any) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;
                if (errorMessage.includes('email')) {
                    toast.error('Este correo ya está registrado.');
                } else if (errorMessage.includes('usuario')) {
                    toast.error('Este nombre de usuario ya está en uso.');
                } else {
                    toast.error('Error al registrar el usuario.');
                }
            } else {
                toast.error('Error desconocido.');
            }
        }
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="card p-4 max-w-md mx-auto mt-10">
            <ToastContainer position="top-right" autoClose={5000} />
            <h2 className="text-center text-2xl font-bold mb-4">Registro de Usuario</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="field mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Correo Electrónico</label>
                    <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com" className="w-full" required />
                </div>
                <div className="field mb-4">
                    <label htmlFor="username" className="block text-sm font-medium mb-2">Nombre de Usuario</label>
                    <InputText id="username" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} placeholder="Nombre de Usuario" className="w-full" required />
                </div>
                <div className="field mb-4">
                    <label htmlFor="role" className="block text-sm font-medium mb-2">Selecciona un Rol</label>
                    <CascadeSelect
                        value={selectedRol}
                        options={roles}
                        optionLabel="nombreRol"
                        optionGroupLabel="nombreRol"
                        optionGroupChildren={[]}
                        placeholder="Selecciona un rol"
                        onChange={(e) => setSelectedRol(e.value)}
                        className="w-full"
                    />
                </div>
                <div className="field mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-2">Contraseña</label>
                    <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" toggleMask className="w-full" required />
                </div>
                <div className="field mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirmar Contraseña</label>
                    <Password id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar Contraseña" toggleMask className="w-full" required />
                </div>
                <Button type="submit" label="Registrar" className="p-button-primary w-full" />
            </form>

            {/* Modal de éxito */}
            <Dialog header="Registro Exitoso" visible={isModalVisible} onHide={hideModal}>
                <p>El usuario ha sido registrado exitosamente.</p>
                <Button label="Cerrar" icon="pi pi-check" onClick={hideModal} autoFocus />
            </Dialog>
        </div>
    );
};

export default UserRegistrationForm;
