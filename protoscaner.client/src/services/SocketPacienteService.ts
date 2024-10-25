// src/services/SocketPacienteService.ts
import apiClient from '../api/client';

// Funci�n para obtener todos los socket pacientes
export const getSocketPacientes = async () => {
    const response = await apiClient.get('/socketpaciente');
    return response.data;
};

// Funci�n para obtener un socket paciente espec�fico por ID
export const getSocketPaciente = async (id: number) => {
    const response = await apiClient.get(`/socketpaciente/${id}`);
    return response.data;
};

// Funci�n para crear un nuevo socket paciente
export const createSocketPaciente = async (socketPaciente: {
    idPaciente: number;
    descripcion: string;
    fechaCreacion: string; // o Date, dependiendo de c�mo est� manejando las fechas en el cliente
    tama�o: string;
}) => {
    const response = await apiClient.post('/socketpaciente', socketPaciente);
    return response.data;
};

// Funci�n para actualizar un socket paciente existente
export const updateSocketPaciente = async (id: number, socketPaciente: {
    descripcion: string;
    fechaCreacion: string; // o Date
    tama�o: string;
}) => {
    const response = await apiClient.put(`/socketpaciente/${id}`, socketPaciente);
    return response.data;
};

// Funci�n para eliminar un socket paciente por ID
export const deleteSocketPaciente = async (id: number) => {
    const response = await apiClient.delete(`/socketpaciente/${id}`);
    return response.data;
};
