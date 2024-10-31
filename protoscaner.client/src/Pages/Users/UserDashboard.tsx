import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Usuario } from '../../types/Usuario';
import { getUsuarios, deleteUsuario } from '../../services/UsuarioService';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from 'react-icons/fa';
import { ThemeContext } from '../../App';
import { Pagination } from "@nextui-org/react";

// Definición de roles con colores basados en jerarquía
const roles = [
    { id: 1, name: 'Directiva', color: 'bg-purple-500' },
    { id: 2, name: 'Soportes', color: 'bg-yellow-500' },
    { id: 3, name: 'Técnicos', color: 'bg-green-500' },
    { id: 4, name: 'Diseñadores', color: 'bg-blue-500' },
];

// Función para obtener el nombre y color del rol según su ID
const getRoleInfo = (roleId: number) => {
    const role = roles.find((r) => r.id === roleId);
    return role ? role : { name: 'Desconocido', color: 'bg-gray-500' };
};

export function UserDashboard(): JSX.Element {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Ajusta esto según el número de usuarios
    const itemsPerPage = 10; // Cambia esto según la cantidad de elementos por página
    const navigate = useNavigate();
    const themeContext = useContext(ThemeContext);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await getUsuarios();
                setUsuarios(Array.isArray(data) ? data : []);
                setTotalPages(Math.ceil(data.length / itemsPerPage)); // Calcular total de páginas
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
                toast.error('Error al cargar los usuarios.');
            }
        };
        fetchUsuarios();
    }, []);

    const handleAddUser = () => {
        navigate('/Usuario-Registro');
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

    const actionBodyTemplate = (rowData: Usuario) => (
        <div className="flex justify-around">
            <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-info p-button-sm hover:shadow-md transition duration-300 ease-in-out"
                onClick={() => navigate(`/editar-usuario/${rowData.idUsuario}`)}
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

    const imageBodyTemplate = (rowData: Usuario) => (
        <img
            src={`data:image/jpeg;base64,${rowData.imagenPerfil?.imagen}`}
            alt="Imagen de perfil"
            className="w-12 h-12 rounded-full shadow-md"
        />
    );

    const roleBodyTemplate = (rowData: Usuario) => {
        const roleInfo = getRoleInfo(rowData.idRol || 0);
        return (
            <Tag
                value={roleInfo.name}
                className={`${roleInfo.color} text-white p-2 rounded-full text-center`}
            />
        );
    };

    const paginatedUsuarios = usuarios.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className={`flex flex-col items-center justify-center p-6 min-h-screen ${themeContext?.theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} transition-colors duration-300`}>
            <ToastContainer position="top-right" autoClose={5000} />

            <div className="mb-6 w-full max-w-5xl text-center">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h2 className="text-4xl font-semibold">{themeContext?.theme === "dark" ? "Gestión de Usuarios (Modo Oscuro)" : "Gestión de Usuarios"}</h2>

                    <div className="mt-4 md:mt-0 flex justify-end items-center">
                        <span className="p-input-icon-left">
                            <i className="pi pi-search text-gray-400" />
                            <InputText
                                value={globalFilter}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                placeholder="Buscar usuarios"
                                className={`w-full md:w-96 p-inputtext-lg rounded-full p-2 ${themeContext?.theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} shadow-lg transition-shadow duration-300 hover:shadow-xl`}
                            />
                        </span>
                        <Button
                            icon={<FaPlus />}
                            label="Agregar"
                            onClick={handleAddUser}
                            className={`ml-4 ${themeContext?.theme === "dark" ? "bg-green-700 hover:bg-green-600 text-white" : "bg-green-600 hover:bg-green-500 text-black"} shadow-lg rounded-full px-4 py-2 text-lg transition duration-300 ease-in-out flex items-center`}
                        />
                    </div>
                </div>
            </div>

            <div className={`w-full max-w-5xl mx-auto shadow-lg rounded-3xl p-6 ${themeContext?.theme === "dark" ? "bg-gray-800" : "bg-white"} transition-colors duration-300`}>
                {usuarios.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-80 text-center text-gray-500">
                        <p>No hay usuarios registrados. Agrega nuevos usuarios para comenzar.</p>
                        <button
                            onClick={handleAddUser}
                            className={`mt-4 w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-transform duration-300 hover:scale-105 ${themeContext?.theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-500 text-black"}`}
                        >
                            <FaPlus className="text-2xl" />
                        </button>
                    </div>
                ) : (
                    <>
                        <DataTable
                            value={paginatedUsuarios}
                            globalFilter={globalFilter}
                            emptyMessage="No se encontraron usuarios."
                            className="p-datatable-sm p-datatable-gridlines shadow-sm rounded-3xl"
                            header="Lista de Usuarios"
                        >
                            <Column header="Imagen" body={imageBodyTemplate} style={{ textAlign: 'center', width: '80px' }} />
                            <Column field="nombreUsuario" header="Nombre de Usuario" sortable className="text-gray-900 dark:text-white" />
                            <Column field="email" header="Correo Electrónico" sortable className="text-gray-900 dark:text-white" />
                            <Column field="fechaCreacion" header="Fecha de Creación" sortable className="text-gray-900 dark:text-white" />
                            <Column field="activo" header="Activo" sortable body={(rowData) => (rowData.activo ? 'Sí' : 'No')} className="text-gray-900 dark:text-white" />
                            <Column header="Rol" body={roleBodyTemplate} style={{ textAlign: 'center' }} />
                            <Column header="Acciones" body={actionBodyTemplate} style={{ textAlign: 'center', width: '120px' }} />
                        </DataTable>
                        <div className="flex justify-center mt-4">
                            <Pagination
                                total={totalPages}
                                initialPage={currentPage}
                                onChange={(page) => setCurrentPage(page)}
                                shadow
                                color="primary"
                            />
                        </div>
                    </>
                )}
            </div>

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
}

export default UserDashboard;
