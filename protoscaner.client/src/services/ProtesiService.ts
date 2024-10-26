// src/services/ProtesiService.ts
import apiClient from '../api/client';

// Funci�n para obtener todas las pr�tesis
export const getProtesis = async () => {
    const response = await apiClient.get('/protesi');
    return response.data;
};

// Funci�n para obtener una pr�tesis espec�fica por ID
export const getProtesiById = async (id: number) => {
    const response = await apiClient.get(`/protesi/${id}`);
    return response.data;
};

// Funci�n para obtener pr�tesis por c�dula del paciente
export const getProtesisByCedula = async (cedula: string) => {
    const response = await apiClient.get(`/protesi/cedula/${cedula}`);
    return response.data;
};

// Funci�n para crear una nueva pr�tesis
export const createProtesi = async (protesi: {
    linerTipo: number;
    linerTamano: number;
    protesista: string;
    fechaEntrega: string;
    material: string;
}) => {
    const response = await apiClient.post('/protesi', protesi);
    return response.data;
};

// Funci�n para actualizar una pr�tesis existente
export const updateProtesi = async (id: number, protesi: {
    linerTipo: number;
    linerTamano: number;
    protesista: string;
    fechaEntrega: string;
    material: string;
}) => {
    const response = await apiClient.put(`/protesi/${id}`, protesi);
    return response.data;
};

// Funci�n para eliminar una pr�tesis por ID
export const deleteProtesi = async (id: number) => {
    const response = await apiClient.delete(`/protesi/${id}`);
    return response.data;
};
