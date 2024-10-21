// src/services/EstatusPacienteService.ts
import apiClient from '../api/client';

// Función para obtener todos los estatus de pacientes
export const getEstatusPacientes = async () => {
    const response = await apiClient.get('/EstatusPaciente');
    return response.data;
};

// Función para obtener un estatus de paciente específico por ID
export const getEstatusPaciente = async (id: number) => {
    const response = await apiClient.get(`/EstatusPaciente/${id}`);
    return response.data;
};

// Función para crear un nuevo estatus de paciente
export const createEstatusPaciente = async (estatusPaciente: { descripcion: string }) => {
    const response = await apiClient.post('/EstatusPaciente', estatusPaciente);
    return response.data;
};

// Función para actualizar un estatus de paciente existente
export const updateEstatusPaciente = async (id: number, estatusPaciente: { descripcion: string }) => {
    const response = await apiClient.put(`/EstatusPaciente/${id}`, estatusPaciente);
    return response.data;
};

// Función para eliminar un estatus de paciente por ID
export const deleteEstatusPaciente = async (id: number) => {
    const response = await apiClient.delete(`/EstatusPaciente/${id}`);
    return response.data;
};
