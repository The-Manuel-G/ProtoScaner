// src/services/EstatusPacienteService.ts
import apiClient from '../api/client';

// Funci�n para obtener todos los estatus de pacientes
export const getEstatusPacientes = async () => {
    const response = await apiClient.get('/EstatusPaciente');
    return response.data;
};

// Funci�n para obtener un estatus de paciente espec�fico por ID
export const getEstatusPaciente = async (id: number) => {
    const response = await apiClient.get(`/EstatusPaciente/${id}`);
    return response.data;
};

// Funci�n para crear un nuevo estatus de paciente
export const createEstatusPaciente = async (estatusPaciente: { descripcion: string }) => {
    const response = await apiClient.post('/EstatusPaciente', estatusPaciente);
    return response.data;
};

// Funci�n para actualizar un estatus de paciente existente
export const updateEstatusPaciente = async (id: number, estatusPaciente: { descripcion: string }) => {
    const response = await apiClient.put(`/EstatusPaciente/${id}`, estatusPaciente);
    return response.data;
};

// Funci�n para eliminar un estatus de paciente por ID
export const deleteEstatusPaciente = async (id: number) => {
    const response = await apiClient.delete(`/EstatusPaciente/${id}`);
    return response.data;
};
