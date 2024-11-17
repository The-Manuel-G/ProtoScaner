// src/Pages/EntregaPage.tsx

import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { ToastContainer, toast } from 'react-toastify';
import { Entrega } from '../../../types/Entrega';
import { getEntregas, deleteEntrega } from "../../../services/EntregaService";
import { Pagination } from '@nextui-org/react';
import { ThemeContext } from "../../../App";
import { FaPlus, FaEye } from 'react-icons/fa';
import ContentGrid2 from "../../../components/ContentGrid2";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


interface EntregasProps {
    sidebarOpen: boolean;
}

const itemsPerPage = 10;

export function Entregas({ sidebarOpen }: EntregasProps): JSX.Element {
    const [entregas, setEntregas] = useState<Entrega[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [selectedEntrega, setSelectedEntrega] = useState<Entrega | null>(null);
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const themeContext = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEntregas = async () => {
            try {
                const data = await getEntregas();
                setEntregas(data);
                setTotalPages(Math.ceil(data.length / itemsPerPage));
            } catch (error) {
                toast.error('Error al cargar las entregas.');
            }
        };
        fetchEntregas();
    }, []);

    const confirmDeleteEntrega = (entrega: Entrega) => {
        setSelectedEntrega(entrega);
        setIsDeleteDialogVisible(true);
    };

    const handleDeleteEntrega = async () => {
        if (selectedEntrega) {
            try {
                await deleteEntrega(selectedEntrega.idEntregas);
                setEntregas(entregas.filter(e => e.idEntregas !== selectedEntrega.idEntregas));
                toast.success('Entrega eliminada exitosamente.');
            } catch (error) {
                toast.error('Error al eliminar la entrega.');
            }
        }
        setIsDeleteDialogVisible(false);
    };

    const FechaBodyTemplate = (rowData: Entrega) => {
        const formattedDate = rowData.fechaEntrega
            ? new Date(rowData.fechaEntrega).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            })
            : 'Fecha no disponible';

        return (
            <Tag value={formattedDate} className="bg-blue-500 text-white p-2 rounded-full" />
        );
    };


    const handleViewEntrega = (entregaId: number) => {
        navigate(`/Entrega/${entregaId}`);
    };

    const paginatedEntregas = entregas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className={`flex flex-col items-center justify-center p-6 min-h-screen ${themeContext?.theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} transition-colors duration-300`}>
            <ToastContainer position="top-right" autoClose={5000} />

            <div className={`${sidebarOpen ? 'ml-72' : 'ml-20'} transition-all duration-500 ease-in-out w-full max-w-6xl`}>
                <h2 className="text-4xl font-semibold mb-6">Gestión de Entregas de Prótesis</h2>
                <ContentGrid2 />

                <div className="flex justify-between items-center mb-6">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search text-gray-400" />
                        <InputText
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Buscar entregas"
                            className="w-80 p-inputtext-lg rounded-full p-2 bg-gray-100 text-gray-900 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                        />
                    </span>
                    <Button
                        label="Agregar Entrega"
                        icon={<FaPlus />}
                        onClick={() => navigate('/Formulario-entregas/:id')} // Cambia EntregaForm por la ruta
                        className="ml-4 bg-green-600 hover:bg-green-500 text-white shadow-lg rounded-full px-4 py-2 text-lg transition duration-300 ease-in-out"
                    />
                </div>

                <div className={`w-full shadow-lg rounded-3xl p-6 ${themeContext?.theme === "dark" ? "bg-gray-800" : "bg-white"} transition-colors duration-300`}>
                    {entregas.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-80 text-center text-gray-500">
                            <p>No hay entregas registradas.</p>
                            <button
                                onClick={() => navigate('/Formulario-entregas/:id')}
                                className={`mt-4 w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-transform duration-300 hover:scale-105 ${themeContext?.theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-500 text-black"}`}
                            >
                                <FaPlus className="text-2xl" />
                            </button>
                        </div>
                    ) : (
                        <>
                            <DataTable
                                value={paginatedEntregas}
                                globalFilter={globalFilter}
                                emptyMessage="No se encontraron entregas."
                                className="p-datatable-sm p-datatable-gridlines shadow-sm rounded-3xl"
                            >
                                <Column field="paciente" header="Paciente" sortable />
                                <Column field="protesisTipo" header="Tipo de Prótesis" sortable />
                                <Column field="fechaEntrega" header="Fecha de Entrega" sortable />
                                <Column field="fechaEntrega" header="Estatus" body={FechaBodyTemplate} />
                                <Column
                                    header="Acciones"
                                    body={(rowData) => (
                                        <div className="flex space-x-2">
                                            <Button
                                                icon={<FaEye />}
                                                className="p-button-info p-button-rounded"
                                                onClick={() => handleViewEntrega(rowData.idEntrega)}
                                            />
                                            <Button
                                                icon="pi pi-trash"
                                                className="p-button-danger p-button-rounded"
                                                onClick={() => confirmDeleteEntrega(rowData)}
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
                            <Button label="Sí" onClick={handleDeleteEntrega} className="p-button-danger" />
                        </>
                    }
                >
                    <p>¿Está seguro de que desea eliminar la entrega del paciente <b>{selectedEntrega?.idPaciente}</b>?</p>
                </Dialog>
            </div>
        </div>
    );
}

export default Entregas;


