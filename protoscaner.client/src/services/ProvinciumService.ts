// src/services/ProvinciumService.ts
import apiClient from '../api/client';

// Función para obtener todas las provincias
export const getProvincias = async () => {
    const response = await apiClient.get('/provincium');
    return response.data;
};

// Función para obtener una provincia específica por ID
export const getProvincium = async (id: number) => {
    const response = await apiClient.get(`/provincium/${id}`);
    return response.data;
};

// Función para crear una nueva provincia
export const createProvincium = async (provincia: {
    nombreProvincia: string;
}) => {
    const response = await apiClient.post('/provincium', provincia);
    return response.data;
};

// Función para actualizar una provincia existente
export const updateProvincium = async (id: number, provincia: {
    nombreProvincia: string;
}) => {
    const response = await apiClient.put(`/provincium/${id}`, provincia);
    return response.data;
};

// Función para eliminar una provincia por ID
export const deleteProvincium = async (id: number) => {
    const response = await apiClient.delete(`/provincium/${id}`);
    return response.data;
};
