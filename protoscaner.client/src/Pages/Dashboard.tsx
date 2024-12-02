// src/pages/Dashboard.tsx

import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { ToastContainer, toast } from 'react-toastify';
import { Paciente } from '../types/Paciente';
import { getPacientes } from '../services/PacienteService';
import { Pagination } from '@nextui-org/react';
import { ThemeContext } from '../App';
import { FaPlus, FaEye } from 'react-icons/fa';
import ContentGrid from '../components/ContentGrid';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { generos, estatusPaciente, estatusProtesis, tiposAmputacion } from '../constants';
import { Skeleton } from '@/components/ui/skeleton';
import { Tag } from 'primereact/tag';

interface DashboardProps {
    sidebarOpen: boolean;
}

const itemsPerPage = 10;

const Dashboard = ({ sidebarOpen }: DashboardProps): JSX.Element => {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [selectedGenero, setSelectedGenero] = useState<number[]>([]);
    const [selectedEstatusPaciente, setSelectedEstatusPaciente] = useState<number[]>([]);
    const [selectedEstatusProtesis, setSelectedEstatusProtesis] = useState<number[]>([]);
    const [selectedTipoAmputacion, setSelectedTipoAmputacion] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const themeContext = useContext(ThemeContext);
    const navigate = useNavigate();

    // Mapeo de colores con tonalidades diferentes pero coherentes
    const generoColors: { [key: number]: string } = {
        1: 'bg-red-400',    // Masculino - tono más claro
        2: 'bg-teal-400',   // Femenino - tono más claro
    };

    const estatusPacienteColors: { [key: number]: string } = {
        1: 'from-gray-600 to-gray-400',      // Estado 1: Gris oscuro
        2: 'from-blue-600 to-blue-400',      // Estado 2: Azul intenso
        3: 'from-green-600 to-green-400',    // Estado 3: Verde intenso
        4: 'from-yellow-500 to-yellow-300',  // Estado 4: Amarillo vibrante
        5: 'from-orange-600 to-orange-400',  // Estado 5: Naranja intenso
        6: 'from-purple-600 to-purple-400',  // Estado 6: Púrpura intenso
    };

    const estatusProtesisColors: { [key: number]: string } = {
        1: 'from-yellow-500 to-yellow-300',  // Estado 1: Amarillo vibrante
        2: 'from-pink-600 to-pink-400',      // Estado 2: Rosa intenso
        3: 'from-purple-600 to-purple-400',  // Estado 3: Púrpura intenso
        4: 'from-orange-600 to-orange-400',  // Estado 4: Naranja intenso
        5: 'from-green-600 to-green-400',    // Estado 5: Verde intenso
        6: 'from-red-600 to-red-400',        // Estado 6: Rojo intenso ('Descartado')
    };

    const tiposAmputacionColors: { [key: number]: string } = {
        1: 'bg-indigo-400', // Transtibial - tono más claro
        2: 'bg-yellow-400', // Transfemoral - tono más claro
    };

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const data = await getPacientes();
                setPacientes(data);
                setTotalPages(Math.ceil(data.length / itemsPerPage));
            } catch (error) {
                toast.error('Error al cargar los pacientes.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPacientes();
    }, []);

    // Templates para las columnas del DataTable
    const generosBodyTemplate = (rowData: Paciente) => {
        const generoInfo = generos.find((g) => g.value === rowData.genero);
        const colorClass = generoColors[rowData.genero || 0] || 'bg-gray-500';
        return (
            <Tag
                value={generoInfo?.label || 'Desconocido'}
                className={`${colorClass} text-white p-2 rounded-full`}
            />
        );
    };

    const estatusPacienteBodyTemplate = (rowData: Paciente) => {
        const estatusInfo = estatusPaciente.find((e) => e.value === rowData.idEstatusPaciente);
        const colorClass = estatusPacienteColors[rowData.idEstatusPaciente || 0] || 'from-gray-500 to-gray-300';
        return (
            <span className={`inline-block text-white p-2 rounded-full bg-gradient-to-r ${colorClass}`}>
                {estatusInfo?.label || 'Desconocido'}
            </span>
        );
    };

    const estatusProtesisBodyTemplate = (rowData: Paciente) => {
        const estatusInfo = estatusProtesis.find((e) => e.value === rowData.idEstatusProtesis);
        const colorClass = estatusProtesisColors[rowData.idEstatusProtesis || 0] || 'from-gray-500 to-gray-300';
        return (
            <span className={`inline-block text-white p-2 rounded-full bg-gradient-to-r ${colorClass}`}>
                {estatusInfo?.label || 'Desconocido'}
            </span>
        );
    };

    const tipoAmputacionBodyTemplate = (rowData: Paciente) => {
        // Obtener el tipo de amputación del último historial de ingreso
        const ultimoHistorial = rowData.historialPacienteIngresos?.[rowData.historialPacienteIngresos.length - 1];
        const tipoAmputacionId = ultimoHistorial?.tipoAmputacion || 0;
        const tipoInfo = tiposAmputacion.find((t) => t.value === tipoAmputacionId);
        const colorClass = tiposAmputacionColors[tipoAmputacionId] || 'bg-gray-500';
        return (
            <Tag
                value={tipoInfo?.label || 'Desconocido'}
                className={`${colorClass} text-white p-2 rounded-full`}
            />
        );
    };

    const handleViewPaciente = (pacienteId: number) => {
        navigate(`/paciente/${pacienteId}`);
    };

    // Lógica de filtrado
    const filteredPacientes = pacientes.filter((paciente) => {
        // Obtener el último historial para el tipo de amputación
        const ultimoHistorial = paciente.historialPacienteIngresos?.[paciente.historialPacienteIngresos.length - 1];

        // Verificar filtros individuales
        const matchesGlobalFilter =
            !globalFilter ||
            paciente.nombreCompleto?.toLowerCase().includes(globalFilter.toLowerCase()) ||
            paciente.cedula?.toLowerCase().includes(globalFilter.toLowerCase()) ||
            paciente.telefono?.toLowerCase().includes(globalFilter.toLowerCase());

        const matchesGenero =
            selectedGenero.length === 0 || selectedGenero.includes(paciente.genero || 0);

        const matchesEstatusPaciente =
            selectedEstatusPaciente.length === 0 || selectedEstatusPaciente.includes(paciente.idEstatusPaciente || 0);

        const matchesEstatusProtesis =
            selectedEstatusProtesis.length === 0 || selectedEstatusProtesis.includes(paciente.idEstatusProtesis || 0);

        const matchesTipoAmputacion =
            selectedTipoAmputacion.length === 0 ||
            (ultimoHistorial && selectedTipoAmputacion.includes(ultimoHistorial.tipoAmputacion || 0));

        return (
            matchesGlobalFilter &&
            matchesGenero &&
            matchesEstatusPaciente &&
            matchesEstatusProtesis &&
            matchesTipoAmputacion
        );
    });

    useEffect(() => {
        setTotalPages(Math.ceil(filteredPacientes.length / itemsPerPage));
        if (currentPage > Math.ceil(filteredPacientes.length / itemsPerPage)) {
            setCurrentPage(1);
        }
    }, [filteredPacientes, currentPage]);

    const paginatedPacientes = filteredPacientes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Esqueleto de la tabla
    const SkeletonTable = () => {
        const skeletonRows = Array.from({ length: itemsPerPage }).map((_, index) => (
            <tr key={index} className="animate-pulse">
                <td><Skeleton className="h-4 w-full" /></td>
                <td><Skeleton className="h-4 w-full" /></td>
                <td><Skeleton className="h-4 w-full" /></td>
                <td><Skeleton className="h-8 w-full rounded-full" /></td>
                <td><Skeleton className="h-8 w-full rounded-full" /></td>
                <td><Skeleton className="h-8 w-full rounded-full" /></td>
                <td><Skeleton className="h-8 w-full rounded-full" /></td>
                <td><Skeleton className="h-10 w-full rounded-full" /></td>
            </tr>
        ));

        return (
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th><Skeleton className="h-4 w-32" /></th>
                        <th><Skeleton className="h-4 w-20" /></th>
                        <th><Skeleton className="h-4 w-24" /></th>
                        <th><Skeleton className="h-4 w-16" /></th>
                        <th><Skeleton className="h-4 w-24" /></th>
                        <th><Skeleton className="h-4 w-24" /></th>
                        <th><Skeleton className="h-4 w-24" /></th>
                        <th><Skeleton className="h-4 w-20" /></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">{skeletonRows}</tbody>
            </table>
        );
    };

    return (
        <div className={`flex flex-col items-center justify-center p-4 min-h-screen ${themeContext?.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} transition-colors duration-300`}>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className={`${sidebarOpen ? 'ml-72' : 'ml-20'} transition-all duration-500 ease-in-out w-full max-w-6xl`}>
                {/* <h2 className="text-4xl font-semibold mb-6">Gestión de Pacientes</h2> */}
                <ContentGrid />
                <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                    <div className="flex flex-wrap gap-4">
                        <MultiSelect
                            value={selectedGenero}
                            options={generos}
                            onChange={(e) => setSelectedGenero(e.value)}
                            placeholder="Filtrar por Género"
                            optionLabel="label"
                            optionValue="value"
                            className="w-48"
                        />
                        <MultiSelect
                            value={selectedEstatusPaciente}
                            options={estatusPaciente}
                            onChange={(e) => setSelectedEstatusPaciente(e.value)}
                            placeholder="Filtrar por Estatus Paciente"
                            optionLabel="label"
                            optionValue="value"
                            className="w-64"
                        />
                        <MultiSelect
                            value={selectedEstatusProtesis}
                            options={estatusProtesis}
                            onChange={(e) => setSelectedEstatusProtesis(e.value)}
                            placeholder="Filtrar por Estatus Prótesis"
                            optionLabel="label"
                            optionValue="value"
                            className="w-64"
                        />
                        <MultiSelect
                            value={selectedTipoAmputacion}
                            options={tiposAmputacion}
                            onChange={(e) => setSelectedTipoAmputacion(e.value)}
                            placeholder="Filtrar por Tipo de Amputación"
                            optionLabel="label"
                            optionValue="value"
                            className="w-64"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            icon={<FaPlus />}
                            onClick={() => navigate('/paciente-Registro')}
                            className="bg-green-600 hover:bg-green-500 text-white shadow-lg rounded-full px-4 py-2 text-lg transition duration-300 ease-in-out flex items-center"
                        >
                            Agregar Paciente
                        </Button>
                        <InputText
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Buscar pacientes"
                            className="w-80 p-inputtext-lg rounded-full p-2 bg-gray-100 text-gray-900 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                            style={{ height: '3rem' }}
                        />
                    </div>
                </div>
                <div className={`w-full shadow-lg rounded-3xl p-6 ${themeContext?.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
                    {isLoading ? (
                        <SkeletonTable />
                    ) : filteredPacientes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-80 text-center text-gray-500">
                            <p>No hay pacientes registrados.</p>
                            <button
                                onClick={() => navigate('/paciente-Registro')}
                                className={`mt-4 w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-transform duration-300 hover:scale-105 ${themeContext?.theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-black'}`}
                            >
                                <FaPlus className="text-2xl" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <DataTable
                                value={paginatedPacientes}
                                emptyMessage="No se encontraron pacientes."
                                className="p-datatable-sm p-datatable-gridlines shadow-sm rounded-3xl w-full"
                                paginator={false} // Paginación manejada manualmente
                            >
                                <Column field="nombreCompleto" header="Nombre Completo" sortable />
                                <Column field="cedula" header="Cédula" sortable />
                                <Column field="telefono" header="Teléfono" sortable />
                                <Column field="genero" header="Género" body={generosBodyTemplate} sortable />
                                <Column field="idEstatusPaciente" header="Estatus Paciente" body={estatusPacienteBodyTemplate} sortable />
                                <Column field="idEstatusProtesis" header="Estatus Prótesis" body={estatusProtesisBodyTemplate} sortable />
                                <Column header="Tipo de Amputación" body={tipoAmputacionBodyTemplate} sortable />
                                <Column
                                    header="Acciones"
                                    body={(rowData) => (
                                        <div className="flex space-x-2">
                                            <Button
                                                icon={<FaEye />}
                                                className="p-button-info p-button-rounded"
                                                onClick={() => handleViewPaciente(rowData.idPaciente)}
                                            />
                                        </div>
                                    )}
                                    style={{ textAlign: 'center', width: '8rem' }}
                                />
                            </DataTable>
                            <div className="flex justify-center mt-4">
                                <Pagination
                                    total={totalPages}
                                    page={currentPage}
                                    onChange={(page) => setCurrentPage(page)}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};

export default Dashboard;
