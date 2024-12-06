// src/Pages/Paciente/CargaMasivaPacientes.tsx

import React, { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importar estilos de react-toastify
import { Paciente } from '../../types/Paciente';
import { createPacientes } from '../../services/PacienteService';
import { ThemeContext } from '../../App';
import { read, utils } from 'xlsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { DataTable } from '@/components/ui/data-table';
import { getColumns } from './columns'; // Importamos getColumns

// Importar los iconos necesarios directamente
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export function CargaMasivaPacientes() {
    const [excelData, setExcelData] = useState<{ Paciente: Paciente }[]>([]);
    const [showPreview, setShowPreview] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingData, setEditingData] = useState<Partial<Paciente>>({});
    const [missingFields, setMissingFields] = useState<{ [key: number]: string[] }>({});
    const themeContext = useContext(ThemeContext);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    // Función para manejar la carga del archivo Excel
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (evt) => {
                const binaryStr = evt.target?.result;
                const workbook = read(binaryStr, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const data = utils.sheet_to_json(sheet);

                // Mapear los datos del Excel a objetos Paciente
                const pacientesData = data.map((row: any) => {
                    const cedula = row['Cédula'] || '';
                    const nombreCompleto = row['Nombre Completo'] || '';

                    return { Paciente: { cedula, nombreCompleto } };
                });

                // Validar campos faltantes
                const missingFieldsTemp: { [key: number]: string[] } = {};
                pacientesData.forEach((data, index) => {
                    const missing = [];
                    const paciente = data.Paciente;

                    if (!paciente.nombreCompleto) missing.push('Nombre Completo');
                    if (!paciente.cedula) missing.push('Cédula');

                    if (missing.length > 0) {
                        missingFieldsTemp[index] = missing;
                    }
                });

                setMissingFields(missingFieldsTemp);
                setExcelData(pacientesData);
                setShowPreview(true);
            };
            reader.readAsBinaryString(file);
        }
    };

    // Función para manejar la edición de un paciente
    const handleEditPaciente = (index: number) => {
        setEditingIndex(index);
        setEditingData(excelData[index].Paciente);
    };

    // Función para guardar los cambios de edición
    const handleSaveEdit = () => {
        if (editingIndex !== null) {
            const updatedData = [...excelData];
            updatedData[editingIndex] = { Paciente: editingData as Paciente };
            setExcelData(updatedData);
            setEditingIndex(null);
            setEditingData({});
            toast.success('Paciente actualizado');
        }
    };

    // Función para cancelar la edición
    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditingData({});
    };

    // Función para descartar un paciente
    const handleDiscardPaciente = (index: number) => {
        const updatedData = [...excelData];
        updatedData.splice(index, 1);
        setExcelData(updatedData);
        toast.info('Paciente descartado');
    };

    // Función para manejar el cambio de los campos en edición
    const handleEditingFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditingData({
            ...editingData,
            [name]: value,
        });
    };

    // Función para enviar los datos al backend
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await createPacientes(excelData);
            setShowSuccessDialog(true);
            setExcelData([]);
            setShowPreview(false);
        } catch (error: any) {
            console.error('Error al registrar los pacientes:', error.response ? error.response.data : error.message);
            toast.error('Error al registrar los pacientes');
        } finally {
            setIsLoading(false);
        }
    };

    // Obtener las columnas pasando las funciones
    const columns = getColumns({ handleEditPaciente, handleDiscardPaciente });

    return (
        <div
            lang="es"
            className={`flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 ${themeContext?.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                }`}
        >
            <div
                className={`w-full max-w-6xl ${themeContext?.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
                    } shadow-lg rounded-lg p-8`}
            >
                <h2 className="text-3xl font-semibold text-center mb-6">Carga Masiva de Pacientes</h2>
                <div className="mb-4">
                    <Input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="w-full" />
                </div>
                {showPreview && (
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Previsualización de Datos</h3>
                        {/* Tabla de previsualización */}
                        <DataTable data={excelData} columns={columns} />
                        <div className="mt-4 flex justify-end gap-4">
                            <Button onClick={handleSubmit} disabled={isLoading}>
                                {isLoading ? 'Cargando...' : 'Registrar Pacientes'}
                            </Button>
                        </div>
                    </div>
                )}
                {/* Diálogo para editar paciente */}
                <Dialog open={editingIndex !== null} onOpenChange={handleCancelEdit}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Editar Paciente</DialogTitle>
                            <DialogDescription>Modifica la información del paciente</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            {/* Datos del Paciente */}
                            <div>
                                <label htmlFor="nombreCompleto" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Nombre Completo
                                </label>
                                <Input
                                    id="nombreCompleto"
                                    name="nombreCompleto"
                                    value={editingData.nombreCompleto || ''}
                                    onChange={handleEditingFieldChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="cedula" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Cédula
                                </label>
                                <Input
                                    id="cedula"
                                    name="cedula"
                                    value={editingData.cedula || ''}
                                    onChange={handleEditingFieldChange}
                                />
                            </div>
                            <div className="flex justify-end mt-4 gap-2">
                                <Button variant="outline" onClick={handleCancelEdit}>
                                    Cancelar
                                </Button>
                                <Button onClick={handleSaveEdit}>Guardar</Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                {/* Diálogo de éxito */}
                <Dialog open={showSuccessDialog} onOpenChange={() => setShowSuccessDialog(false)}>
                    <DialogContent>
                        <div className="flex flex-col items-center p-6">
                            {/* Usar el icono importado directamente */}
                            <FontAwesomeIcon icon={faCheckCircle} className="h-16 w-16 text-green-500 mb-4 animate-bounce" />
                            <h2 className="text-2xl font-semibold mb-2">¡Registro Exitoso!</h2>
                            <p className="text-center text-gray-600">
                                Los pacientes han sido registrados correctamente.
                            </p>
                            <Button className="mt-6" onClick={() => setShowSuccessDialog(false)}>
                                Cerrar
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            {/* Asegúrate de tener solo una instancia de ToastContainer */}
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );

}

export default CargaMasivaPacientes;
