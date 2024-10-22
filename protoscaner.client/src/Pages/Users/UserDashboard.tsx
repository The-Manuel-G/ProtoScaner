import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Usuario } from '../../types/Usuario';
import { getUsuarios, deleteUsuario } from '../../services/UsuarioService';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EmptyState } from '../../components/EmptyState';
import { FaPlus } from 'react-icons/fa';  // Importamos el icono para el botón

const UserDashboard: React.FC = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await getUsuarios();
                setUsuarios(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
                toast.error('Error al cargar los usuarios.');
            }
        };

        fetchUsuarios();
    }, []);

    // Cambiamos el enlace a la ruta correcta
    const handleAddUser = () => {
        navigate('/Usuario-Registro');  // Cambiamos '/registro-usuario' a '/Usuario-Registro'
    };

    const confirmDeleteUser = (user: Usuario) => {
        setSelectedUser(user);
        setIsDeleteDialogVisible(true);
    };

    const handleDeleteUser = async () => {
        if (selectedUser) {
            try {
                await deleteUsuario(selectedUser.idUsuario);
                setUsuarios((prevUsuarios) => prevUsuarios.filter(u => u.idUsuario !== selectedUser.idUsuario));
                toast.success('Usuario eliminado exitosamente.');
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
                toast.error('Error al eliminar el usuario.');
            }
        }
        setIsDeleteDialogVisible(false);
    };

    const actionBodyTemplate = (rowData: Usuario) => {
        return (
            <div className="flex justify-around">
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-info p-button-sm hover:shadow-md transition duration-300 ease-in-out"
                    onClick={() => navigate(`/editar-usuario/${rowData.idUsuario}`)}  // Ajusta la ruta si ya existe
                    tooltip="Editar"
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger p-button-sm hover:shadow-md transition duration-300 ease-in-out"
                    onClick={() => confirmDeleteUser(rowData)}
                    tooltip="Eliminar"
                />
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-between p-6 bg-gray-800 min-h-screen h-screen">
            <ToastContainer position="top-right" autoClose={5000} />

            {/* Header con el botón de agregar y el filtro */}
            <div className="mb-6 w-full max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <h2 className="text-3xl font-semibold text-white">Gestión de Usuarios</h2>

                    <div className="mt-4 md:mt-0 flex justify-end items-center">
                        <span className="p-input-icon-left">
                            <i className="pi pi-search text-gray-400" />
                            <InputText
                                value={globalFilter}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                placeholder="Buscar usuarios"
                                className="w-full md:w-96 p-inputtext-lg rounded-lg p-2"
                            />
                        </span>
                        <Button
                            label="Agregar"
                            icon={null}
                            onClick={handleAddUser}  // Enlazamos correctamente al formulario de registro
                            className="p-button-success ml-4 shadow-lg rounded-lg px-4 py-2 text-lg transition duration-300 ease-in-out hover:bg-green-600"
                        />
                    </div>
                </div>
            </div>

            {/* DataTable o mensaje de que no hay usuarios */}
            <div className="w-full max-w-6xl bg-gray-900 shadow-md rounded-lg p-6 flex-grow h-full">
                {usuarios.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <EmptyState message="No hay usuarios registrados. Agrega nuevos usuarios para comenzar." />
                        <button
                            onClick={handleAddUser}
                            className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 mt-6"
                        >
                            <FaPlus className="text-3xl" /> {/* Usamos un icono FaPlus */}
                        </button>
                    </div>
                ) : (
                    <DataTable
                        value={usuarios}
                        paginator
                        rows={10}
                        globalFilter={globalFilter}
                        emptyMessage="No se encontraron usuarios."
                        className="p-datatable-sm p-datatable-gridlines"
                        header="Lista de Usuarios"
                    >
                        <Column field="nombreUsuario" header="Nombre de Usuario" sortable className="text-white" />
                        <Column field="email" header="Correo Electrónico" sortable className="text-white" />
                        <Column field="fechaCreacion" header="Fecha de Creación" sortable className="text-white" />
                        <Column field="activo" header="Activo" sortable body={(rowData) => (rowData.activo ? 'Sí' : 'No')} className="text-white" />
                        <Column field="idRol" header="Rol" sortable body={(rowData) => rowData.idRol} className="text-white" />
                        <Column header="Acciones" body={actionBodyTemplate} style={{ textAlign: 'center', width: '120px' }} />
                    </DataTable>
                )}
            </div>

            {/* Modal de confirmación para eliminar usuarios */}
            <Dialog
                header="Confirmación"
                visible={isDeleteDialogVisible}
                style={{ width: '350px' }}
                footer={
                    <>
                        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setIsDeleteDialogVisible(false)} />
                        <Button label="Sí" icon="pi pi-check" className="p-button-danger" onClick={handleDeleteUser} />
                    </>
                }
                onHide={() => setIsDeleteDialogVisible(false)}
            >
                <p>¿Está seguro de que desea eliminar el usuario <b>{selectedUser?.nombreUsuario}</b>?</p>
            </Dialog>
        </div>
    );
};

export default UserDashboard;
