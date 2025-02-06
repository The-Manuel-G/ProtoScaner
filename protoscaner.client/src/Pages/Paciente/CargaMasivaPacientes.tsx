// CargaMasivaPacientes.tsx
import React, { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Paciente, HistorialPacienteIngreso } from '../../types/Paciente';
import { createPacientes } from '../../services/PacienteService';
import { ThemeContext } from '../../App';
import { read, utils, WorkBook } from 'xlsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// Importamos el diálogo desde Dialog.tsx (con "D" mayúscula)
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
    // Se pueden agregar o eliminar otros componentes según se requiera.
} from '@/components/ui/Dialog';
import { DataTable } from '@/components/ui/data-table';
import { getColumns } from './columns';
import {
    generos,
    tiposAmputacion,
    ladosAmputacion,
    causasAmputacion,
    provincias,
    estatusPaciente,
    estatusProtesis
} from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface PacienteData {
    Paciente: Paciente;
}

export default function CargaMasivaPacientes() {
    // Estados
    const [excelData, setExcelData] = useState<PacienteData[]>([]);
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingData, setEditingData] = useState<Paciente | null>(null);
    // Si no utilizas missingFields para mostrar errores, podrías eliminar este estado.
    const [missingFields, setMissingFields] = useState<{ [key: number]: string[] }>({});
    const themeContext = useContext(ThemeContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);

    // Función para mapear texto a valores constantes
    const mapToConstantValue = (
        label: string,
        constants: { label: string; value: number }[]
    ): number | undefined => {
        const found = constants.find(
            (constant) => constant.label.toLowerCase() === label.toLowerCase().trim()
        );
        return found ? found.value : undefined;
    };

    // Manejo de la carga del archivo Excel usando readAsArrayBuffer
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (evt) => {
                const data = evt.target?.result;
                if (data) {
                    try {
                        const workbook: WorkBook = read(data, { type: 'array' });
                        const sheetName = workbook.SheetNames[0];
                        const sheet = workbook.Sheets[sheetName];
                        const rows: any[] = utils.sheet_to_json(sheet);

                        // Mapear datos del Excel a objetos Paciente
                        const pacientesData: PacienteData[] = rows.map((row: any) => {
                            const cedula = row['Cedula']?.toString().trim() || '';
                            const nombreCompleto = row['Nombre Completo']?.toString().trim() || '';
                            const codigoPaciente = row['Codigo Paciente']?.toString().trim() || '';
                            const generoLabel = row['Género']?.toString().trim();
                            const genero = generoLabel ? mapToConstantValue(generoLabel, generos) : undefined;
                            const fechaNacimiento = row['Fecha de Nacimiento']
                                ? new Date(row['Fecha de Nacimiento']).toISOString().split('T')[0]
                                : undefined;
                            const direccion = row['Dirección']?.toString().trim();
                            const telefono = row['Teléfono']?.toString().trim();
                            const telefonoCelular = row['Teléfono Celular']?.toString().trim();
                            const provinciaLabel = row['Provincia']?.toString().trim();
                            const idProvincia = provinciaLabel ? mapToConstantValue(provinciaLabel, provincias) : undefined;
                            const sector = row['Sector']?.toString().trim();
                            const insidencia =
                                row['Insidencia'] === 'Sí' ||
                                row['Insidencia'] === 'Si' ||
                                row['Insidencia'] === '1';
                            const idEstatusPacienteLabel = row['Estatus Paciente']?.toString().trim();
                            const idEstatusPaciente = idEstatusPacienteLabel
                                ? mapToConstantValue(idEstatusPacienteLabel, estatusPaciente)
                                : undefined;
                            const idEstatusProtesisLabel = row['Estatus Prótese']?.toString().trim();
                            const idEstatusProtesis = idEstatusProtesisLabel
                                ? mapToConstantValue(idEstatusProtesisLabel, estatusProtesis)
                                : undefined;
                            const comentario = row['Comentario']?.toString().trim();
                            const fechaIngreso = row['Fecha Ingreso']
                                ? new Date(row['Fecha Ingreso']).toISOString().split('T')[0]
                                : undefined;

                            // Historial del paciente
                            const tipoAmputacionLabel = row['Tipo Amputación']?.toString().trim();
                            const tipoAmputacion = tipoAmputacionLabel ? mapToConstantValue(tipoAmputacionLabel, tiposAmputacion) : undefined;
                            const ladoAmputacionLabel = row['Lado Amputación']?.toString().trim();
                            const ladoAmputacion = ladoAmputacionLabel ? mapToConstantValue(ladoAmputacionLabel, ladosAmputacion) : undefined;
                            const causaAmputacionLabel = row['Causa Amputación']?.toString().trim();
                            const causaAmputacion = causaAmputacionLabel ? mapToConstantValue(causaAmputacionLabel, causasAmputacion) : undefined;
                            const fechaAmputacion = row['Fecha Amputación']
                                ? new Date(row['Fecha Amputación']).toISOString().split('T')[0]
                                : undefined;
                            const terapia =
                                row['Terapia'] === 'Sí' ||
                                row['Terapia'] === 'Si' ||
                                row['Terapia'] === '1';
                            const tiempoTerapia = row['Tiempo Terapia']?.toString().trim();

                            return {
                                Paciente: {
                                    idPaciente: 0, // Valor por defecto para cumplir con el tipo
                                    cedula,
                                    nombreCompleto,
                                    codigoPaciente,
                                    genero,
                                    fechaNacimiento,
                                    direccion,
                                    telefono,
                                    telefonoCelular,
                                    idProvincia,
                                    sector,
                                    insidencia,
                                    idEstatusPaciente,
                                    idEstatusProtesis,
                                    comentario,
                                    fechaIngreso,
                                    historialPacienteIngresos: [
                                        {
                                            idHistorial: 0, // Valor por defecto
                                            idPaciente: 0,  // Valor por defecto
                                            tipoAmputacion,
                                            ladoAmputacion,
                                            causa: causaAmputacion,
                                            fechaAmputacion,
                                            terapia,
                                            tiempoTerapia,
                                            comentario: row['Comentario Historial']?.toString().trim()
                                        } as HistorialPacienteIngreso
                                    ]
                                }
                            };
                        });

                        // Validar campos faltantes (por ejemplo, se requiere la cédula)
                        const missingFieldsTemp: { [key: number]: string[] } = {};
                        pacientesData.forEach((data, index) => {
                            const missing: string[] = [];
                            if (!data.Paciente.cedula) missing.push('Cédula');
                            if (missing.length > 0) {
                                missingFieldsTemp[index] = missing;
                            }
                        });
                        setMissingFields(missingFieldsTemp);

                        setExcelData(pacientesData);
                        setShowPreview(true);
                        toast.success('Archivo cargado correctamente. Revisa la previsualización.');
                    } catch (error) {
                        console.error('Error al leer el archivo:', error);
                        toast.error('Hubo un error al leer el archivo Excel.');
                    }
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleEditPaciente = (index: number) => {
        setEditingIndex(index);
        setEditingData(excelData[index].Paciente);
    };

    const handleSaveEdit = () => {
        if (editingIndex !== null && editingData) {
            if (!editingData.cedula) {
                toast.error('La cédula es obligatoria.');
                return;
            }
            const updatedData = [...excelData];
            updatedData[editingIndex] = { Paciente: editingData };
            setExcelData(updatedData);
            setEditingIndex(null);
            setEditingData(null);
            toast.success('Paciente actualizado correctamente.');
        }
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditingData(null);
    };

    const handleDiscardPaciente = (index: number) => {
        const updatedData = [...excelData];
        updatedData.splice(index, 1);
        setExcelData(updatedData);
        toast.info('Paciente descartado.');
    };

    const handleEditingFieldChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        let newValue: any = value;
        if (type === 'checkbox') {
            // Aseguramos que e.target es HTMLInputElement para acceder a "checked"
            newValue = (e.target as HTMLInputElement).checked;
        }
        if (name.startsWith('historialPacienteIngresos.')) {
            const field = name.split('.')[1] as keyof HistorialPacienteIngreso;
            setEditingData((prevData) => {
                if (!prevData) return prevData;
                return {
                    ...prevData,
                    // Si historialPacienteIngresos es undefined, usamos un objeto vacío por defecto
                    historialPacienteIngresos: [
                        {
                            ...(prevData.historialPacienteIngresos?.[0] || {}),
                            [field]: newValue
                        } as HistorialPacienteIngreso
                    ]
                };
            });
        } else {
            setEditingData((prevData) => {
                if (!prevData) return prevData;
                return {
                    ...prevData,
                    [name]: newValue
                };
            });
        }
    };

    const handleSubmit = async () => {
        const pacientesConCedula = excelData.filter((data) => data.Paciente.cedula);
        if (pacientesConCedula.length === 0) {
            toast.error('Debe haber al menos un paciente con cédula.');
            return;
        }
        setIsLoading(true);
        try {
            await createPacientes(pacientesConCedula);
            setShowSuccessDialog(true);
            setExcelData([]);
            setShowPreview(false);
            toast.success('Pacientes registrados correctamente.');
        } catch (error: any) {
            console.error(
                'Error al registrar los pacientes:',
                error.response ? error.response.data : error.message
            );
            toast.error('Error al registrar los pacientes.');
        } finally {
            setIsLoading(false);
        }
    };

    const columns = getColumns({ handleEditPaciente, handleDiscardPaciente });

    return (
        <div
            lang="es"
            className={`flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 ${themeContext?.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}
        >
            <div
                className={`w-full max-w-6xl ${themeContext?.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-lg rounded-lg p-8`}
            >
                <h2 className="text-3xl font-semibold text-center mb-6">
                    Carga Masiva de Pacientes
                </h2>
                <div className="mb-4">
                    <Input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        className="w-full"
                    />
                </div>
                {showPreview && (
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">
                            Previsualización de Datos
                        </h3>
                        <DataTable data={excelData} columns={columns} />
                        <div className="mt-4 flex justify-end gap-4">
                            <Button onClick={handleSubmit} disabled={isLoading}>
                                {isLoading ? 'Cargando...' : 'Registrar Pacientes'}
                            </Button>
                        </div>
                    </div>
                )}
                {editingData && (
                    <Dialog open={editingIndex !== null} onOpenChange={handleCancelEdit}>
                        <DialogContent className="max-w-3xl w-full">
                            <DialogHeader>
                                <DialogTitle>Editar Paciente</DialogTitle>
                                <DialogDescription>
                                    Modifica la información del paciente
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="codigoPaciente" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Código de Paciente
                                        </label>
                                        <Input
                                            id="codigoPaciente"
                                            name="codigoPaciente"
                                            value={editingData.codigoPaciente || ''}
                                            onChange={handleEditingFieldChange}
                                        />
                                    </div>
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
                                            Cédula<span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="cedula"
                                            name="cedula"
                                            value={editingData.cedula || ''}
                                            onChange={handleEditingFieldChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="genero" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Género
                                        </label>
                                        <select
                                            id="genero"
                                            name="genero"
                                            value={editingData.genero || ''}
                                            onChange={handleEditingFieldChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="">Seleccione Género</option>
                                            {generos.map((g) => (
                                                <option key={g.value} value={g.value}>
                                                    {g.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Fecha de Nacimiento
                                        </label>
                                        <Input
                                            id="fechaNacimiento"
                                            name="fechaNacimiento"
                                            type="date"
                                            value={editingData.fechaNacimiento || ''}
                                            onChange={handleEditingFieldChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Dirección
                                        </label>
                                        <Input
                                            id="direccion"
                                            name="direccion"
                                            value={editingData.direccion || ''}
                                            onChange={handleEditingFieldChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Teléfono
                                        </label>
                                        <Input
                                            id="telefono"
                                            name="telefono"
                                            value={editingData.telefono || ''}
                                            onChange={handleEditingFieldChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="telefonoCelular" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Teléfono Celular
                                        </label>
                                        <Input
                                            id="telefonoCelular"
                                            name="telefonoCelular"
                                            value={editingData.telefonoCelular || ''}
                                            onChange={handleEditingFieldChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="idProvincia" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Provincia
                                        </label>
                                        <select
                                            id="idProvincia"
                                            name="idProvincia"
                                            value={editingData.idProvincia || ''}
                                            onChange={handleEditingFieldChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="">Seleccione Provincia</option>
                                            {provincias.map((p) => (
                                                <option key={p.value} value={p.value}>
                                                    {p.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="sector" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Sector
                                        </label>
                                        <Input
                                            id="sector"
                                            name="sector"
                                            value={editingData.sector || ''}
                                            onChange={handleEditingFieldChange}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="insidencia"
                                            name="insidencia"
                                            type="checkbox"
                                            checked={editingData.insidencia || false}
                                            onChange={handleEditingFieldChange}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="insidencia" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                            Insidencia
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="idEstatusPaciente" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Estatus Paciente
                                        </label>
                                        <select
                                            id="idEstatusPaciente"
                                            name="idEstatusPaciente"
                                            value={editingData.idEstatusPaciente || ''}
                                            onChange={handleEditingFieldChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="">Seleccione Estatus Paciente</option>
                                            {estatusPaciente.map((e) => (
                                                <option key={e.value} value={e.value}>
                                                    {e.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="idEstatusProtesis" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Estatus Prótese
                                        </label>
                                        <select
                                            id="idEstatusProtesis"
                                            name="idEstatusProtesis"
                                            value={editingData.idEstatusProtesis || ''}
                                            onChange={handleEditingFieldChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="">Seleccione Estatus Prótese</option>
                                            {estatusProtesis.map((e) => (
                                                <option key={e.value} value={e.value}>
                                                    {e.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="comentario" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Comentario
                                        </label>
                                        <textarea
                                            id="comentario"
                                            name="comentario"
                                            value={editingData.comentario || ''}
                                            onChange={handleEditingFieldChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="fechaIngreso" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Fecha de Ingreso
                                        </label>
                                        <Input
                                            id="fechaIngreso"
                                            name="fechaIngreso"
                                            type="date"
                                            value={editingData.fechaIngreso || ''}
                                            onChange={handleEditingFieldChange}
                                        />
                                    </div>
                                    <div className="mt-6 p-4 border rounded-md">
                                        <h4 className="text-lg font-semibold mb-4">
                                            Historial de Ingreso
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="tipoAmputacion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Tipo Amputación
                                                </label>
                                                <select
                                                    id="tipoAmputacion"
                                                    name="historialPacienteIngresos.tipoAmputacion"
                                                    value={editingData.historialPacienteIngresos?.[0]?.tipoAmputacion || ''}
                                                    onChange={handleEditingFieldChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                >
                                                    <option value="">Seleccione Tipo Amputación</option>
                                                    {tiposAmputacion.map((t) => (
                                                        <option key={t.value} value={t.value}>
                                                            {t.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="ladoAmputacion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Lado Amputación
                                                </label>
                                                <select
                                                    id="ladoAmputacion"
                                                    name="historialPacienteIngresos.ladoAmputacion"
                                                    value={editingData.historialPacienteIngresos?.[0]?.ladoAmputacion || ''}
                                                    onChange={handleEditingFieldChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                >
                                                    <option value="">Seleccione Lado Amputación</option>
                                                    {ladosAmputacion.map((l) => (
                                                        <option key={l.value} value={l.value}>
                                                            {l.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="causaAmputacion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Causa Amputación
                                                </label>
                                                <select
                                                    id="causaAmputacion"
                                                    name="historialPacienteIngresos.causa"
                                                    value={editingData.historialPacienteIngresos?.[0]?.causa || ''}
                                                    onChange={handleEditingFieldChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                >
                                                    <option value="">Seleccione Causa Amputación</option>
                                                    {causasAmputacion.map((c) => (
                                                        <option key={c.value} value={c.value}>
                                                            {c.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="fechaAmputacion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Fecha Amputación
                                                </label>
                                                <Input
                                                    id="fechaAmputacion"
                                                    name="historialPacienteIngresos.fechaAmputacion"
                                                    type="date"
                                                    value={editingData.historialPacienteIngresos?.[0]?.fechaAmputacion || ''}
                                                    onChange={handleEditingFieldChange}
                                                />
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    id="terapia"
                                                    name="historialPacienteIngresos.terapia"
                                                    type="checkbox"
                                                    checked={editingData.historialPacienteIngresos?.[0]?.terapia || false}
                                                    onChange={handleEditingFieldChange}
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="terapia" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                                    Terapia
                                                </label>
                                            </div>
                                            <div>
                                                <label htmlFor="tiempoTerapia" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Tiempo Terapia
                                                </label>
                                                <Input
                                                    id="tiempoTerapia"
                                                    name="historialPacienteIngresos.tiempoTerapia"
                                                    value={editingData.historialPacienteIngresos?.[0]?.tiempoTerapia || ''}
                                                    onChange={handleEditingFieldChange}
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label htmlFor="comentarioHistorial" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Comentario Historial
                                                </label>
                                                <textarea
                                                    id="comentarioHistorial"
                                                    name="historialPacienteIngresos.comentario"
                                                    value={editingData.historialPacienteIngresos?.[0]?.comentario || ''}
                                                    onChange={handleEditingFieldChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-6 gap-4">
                                    <Button variant="outline" onClick={handleCancelEdit}>
                                        Cancelar
                                    </Button>
                                    <Button onClick={handleSaveEdit}>
                                        Guardar
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
                <Dialog open={showSuccessDialog} onOpenChange={() => setShowSuccessDialog(false)}>
                    <DialogContent>
                        <div className="flex flex-col items-center p-6">
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="h-16 w-16 text-green-500 mb-4 animate-bounce"
                            />
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
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
}
