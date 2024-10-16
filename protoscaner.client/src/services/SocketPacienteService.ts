// src/services/SocketPacienteService.ts
import apiClient from '../api/client';

// Función para obtener todos los socket pacientes
export const getSocketPacientes = async () => {
    const response = await apiClient.get('/socketpaciente');
    return response.data;
};

// Función para obtener un socket paciente específico por ID
export const getSocketPaciente = async (id: number) => {
    const response = await apiClient.get(`/socketpaciente/${id}`);
    return response.data;
};

// Función para crear un nuevo socket paciente
export const createSocketPaciente = async (socketPaciente: {
    idPaciente: number;
    descripcion: string;
    fechaCreacion: string; // o Date, dependiendo de cómo esté manejando las fechas en el cliente
    tamaño: string;
}) => {
    const response = await apiClient.post('/socketpaciente', socketPaciente);
    return response.data;
};

// Función para actualizar un socket paciente existente
export const updateSocketPaciente = async (id: number, socketPaciente: {
    descripcion: string;
    fechaCreacion: string; // o Date
    tamaño: string;
}) => {
    const response = await apiClient.put(`/socketpaciente/${id}`, socketPaciente);
    return response.data;
};

// Función para eliminar un socket paciente por ID
export const deleteSocketPaciente = async (id: number) => {
    const response = await apiClient.delete(`/socketpaciente/${id}`);
    return response.data;
};
