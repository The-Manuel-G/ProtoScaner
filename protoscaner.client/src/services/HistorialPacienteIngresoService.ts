// src/services/HistorialPacienteIngresoService.ts
import apiClient from '../api/client';

// Función para obtener todos los registros de historial de ingreso de pacientes
export const getHistorialPacientesIngreso = async () => {
    const response = await apiClient.get('/HistorialPacienteIngreso');
    return response.data;
};

// Función para obtener un registro específico de historial de ingreso de paciente por ID
export const getHistorialPacienteIngreso = async (id: number) => {
    const response = await apiClient.get(`/HistorialPacienteIngreso/${id}`);
    return response.data;
};

// Función para crear un nuevo registro de historial de ingreso de paciente
export const createHistorialPacienteIngreso = async (historialPacienteIngreso: {
    idPaciente: number;
    tipoAmputacion: string;
    ladoAmputacion: string;
    fechaAmputacion: Date;
    causa: string;
    terapia: string;
    tiempoTerapia: number;
    idMedida: number;
    comentario: string;
}) => {
    const response = await apiClient.post('/HistorialPacienteIngreso', historialPacienteIngreso);
    return response.data;
};

// Función para actualizar un registro de historial de ingreso de paciente existente
export const updateHistorialPacienteIngreso = async (id: number, historialPacienteIngreso: {
    idPaciente: number;
    tipoAmputacion: string;
    ladoAmputacion: string;
    fechaAmputacion: Date;
    causa: string;
    terapia: string;
    tiempoTerapia: number;
    idMedida: number;
    comentario: string;
}) => {
    const response = await apiClient.put(`/HistorialPacienteIngreso/${id}`, historialPacienteIngreso);
    return response.data;
};

// Función para eliminar un registro de historial de ingreso de paciente por ID
export const deleteHistorialPacienteIngreso = async (id: number) => {
    const response = await apiClient.delete(`/HistorialPacienteIngreso/${id}`);
    return response.data;
};
