// src/pages/Dashboard.tsx

import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { ToastContainer, toast } from 'react-toastify';
import { Paciente } from '../types/Paciente';
import { getPacientes, deletePaciente } from '../services/PacienteService';
import { Pagination } from '@nextui-org/react';
import { ThemeContext } from '../App';
import { FaPlus, FaEye } from 'react-icons/fa';
import ContentGrid from '../components/ContentGrid';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
    sidebarOpen: boolean;
}

const generos = [
    { id: 1, name: 'Masculino', color: 'bg-blue-500' },
    { id: 2, name: 'Femenino', color: 'bg-pink-500' },
    { id: 3, name: 'Otro', color: 'bg-green-500' }
];

const estatusPaciente = [
    { id: 1, name: 'Activo', color: 'bg-green-500' },
    { id: 2, name: 'Inactivo', color: 'bg-gray-500' },
];

const itemsPerPage = 10;

export function Dashboard({ sidebarOpen }: DashboardProps): JSX.Element {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null);
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const themeContext = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const data = await getPacientes();
                setPacientes(data);
                setTotalPages(Math.ceil(data.length / itemsPerPage));
            } catch (error) {
                toast.error('Error al cargar los pacientes.');
            }
        };
        fetchPacientes();
    }, []);

    const confirmDeletePaciente = (paciente: Paciente) => {
        setSelectedPaciente(paciente);
        setIsDeleteDialogVisible(true);
    };

    const handleDeletePaciente = async () => {
        if (selectedPaciente) {
            try {
                await deletePaciente(selectedPaciente.idPaciente);
                setPacientes(pacientes.filter(p => p.idPaciente !== selectedPaciente.idPaciente));
                toast.success('Paciente eliminado exitosamente.');
            } catch (error) {
                toast.error('Error al eliminar el paciente.');
            }
        }
        setIsDeleteDialogVisible(false);
    };

    const generosBodyTemplate = (rowData: Paciente) => {
        const generoInfo = generos.find(g => g.id === rowData.genero);
        return <Tag value={generoInfo?.name || 'Desconocido'} className={`${generoInfo?.color} text-white p-2 rounded-full`} />;
    };

    const estatusBodyTemplate = (rowData: Paciente) => {
        const estatusInfo = estatusPaciente.find(e => e.id === rowData.idEstatusPaciente);
        return <Tag value={estatusInfo?.name || 'Sin Estatus'} className={`${estatusInfo?.color} text-white p-2 rounded-full`} />;
    };

    const handleViewPaciente = (pacienteId: number) => {
        navigate(`/paciente/${pacienteId}`);
    };

    const paginatedPacientes = pacientes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className={`flex flex-col items-center justify-center p-6 min-h-screen ${themeContext?.theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} transition-colors duration-300`}>
            <ToastContainer position="top-right" autoClose={5000} />

            <div className={`${sidebarOpen ? 'ml-72' : 'ml-20'} transition-all duration-500 ease-in-out w-full max-w-6xl`}>
                <h2 className="text-4xl font-semibold mb-6">Gestión de Pacientes</h2>
                <ContentGrid />

                <div className="flex justify-between items-center mb-6">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search text-gray-400" />
                        <InputText
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Buscar pacientes"
                            className="w-80 p-inputtext-lg rounded-full p-2 bg-gray-100 text-gray-900 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                        />
                    </span>
                    <Button
                        label="Agregar Paciente"
                        icon={<FaPlus />}
                        onClick={() => navigate('/paciente-Registro')}
                        className="ml-4 bg-green-600 hover:bg-green-500 text-white shadow-lg rounded-full px-4 py-2 text-lg transition duration-300 ease-in-out"
                    />
                </div>

                <div className={`w-full shadow-lg rounded-3xl p-6 ${themeContext?.theme === "dark" ? "bg-gray-800" : "bg-white"} transition-colors duration-300`}>
                    {pacientes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-80 text-center text-gray-500">
                            <p>No hay pacientes registrados.</p>
                            <button
                                onClick={() => navigate('/paciente-Registro')}
                                className={`mt-4 w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-transform duration-300 hover:scale-105 ${themeContext?.theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-500 text-black"}`}
                            >
                                <FaPlus className="text-2xl" />
                            </button>
                        </div>
                    ) : (
                        <>
                            <DataTable
                                value={paginatedPacientes}
                                globalFilter={globalFilter}
                                emptyMessage="No se encontraron pacientes."
                                className="p-datatable-sm p-datatable-gridlines shadow-sm rounded-3xl"
                            >
                                <Column field="nombreCompleto" header="Nombre Completo" sortable />
                                <Column field="cedula" header="Cédula" sortable />
                                <Column field="telefono" header="Teléfono" sortable />
                                <Column field="genero" header="Género" body={generosBodyTemplate} />
                                <Column field="idEstatusPaciente" header="Estatus" body={estatusBodyTemplate} />
                                <Column
                                    header="Acciones"
                                    body={(rowData) => (
                                        <div className="flex space-x-2">
                                            <Button
                                                icon={<FaEye />}
                                                className="p-button-info p-button-rounded"
                                                onClick={() => handleViewPaciente(rowData.idPaciente)}
                                            />
                                            <Button
                                                icon="pi pi-trash"
                                                className="p-button-danger p-button-rounded"
                                                onClick={() => confirmDeletePaciente(rowData)}
                                            />
                                        </div>
                                    )}
                                    style={{ textAlign: 'center', width: '10rem' }}
                                />
                            </DataTable>
                            <div className="flex justify-center mt-4">
                                <Pagination total={totalPages} initialPage={currentPage} onChange={(page) => setCurrentPage(page)} />
                            </div>
                        </>
                    )}
                </div>

                <Dialog
                    header="Confirmación"
                    visible={isDeleteDialogVisible}
                    onHide={() => setIsDeleteDialogVisible(false)}
                    footer={
                        <>
                            <Button label="No" onClick={() => setIsDeleteDialogVisible(false)} />
                            <Button label="Sí" onClick={handleDeletePaciente} className="p-button-danger" />
                        </>
                    }
                >
                    <p>¿Está seguro de que desea eliminar al paciente <b>{selectedPaciente?.nombreCompleto}</b>?</p>
                </Dialog>
            </div>
        </div>
    );
}

export default Dashboard;
