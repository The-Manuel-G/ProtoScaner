// src/services/ProtesiService.ts
import apiClient from '../api/client';

// Función para obtener todas las prótesis
export const getProtesis = async () => {
    const response = await apiClient.get('/protesi');
    return response.data;
};

// Función para obtener una prótesis específica por ID
export const getProtesiById = async (id: number) => {
    const response = await apiClient.get(`/protesi/${id}`);
    return response.data;
};

// Función para obtener prótesis por cédula del paciente
export const getProtesisByCedula = async (cedula: string) => {
    const response = await apiClient.get(`/protesi/cedula/${cedula}`);
    return response.data;
};

// Función para crear una nueva prótesis
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

// Función para actualizar una prótesis existente
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

// Función para eliminar una prótesis por ID
export const deleteProtesi = async (id: number) => {
    const response = await apiClient.delete(`/protesi/${id}`);
    return response.data;
};
