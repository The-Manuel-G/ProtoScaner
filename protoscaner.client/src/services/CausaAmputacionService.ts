// src/services/CausaAmputacionService.ts
import apiClient from '../api/client';

// Función para obtener todas las causas de amputación
export const getCausasAmputacion = async () => {
    const response = await apiClient.get('/CausaAmputacion');
    return response.data;
};

// Función para obtener una causa de amputación específica por ID
export const getCausaAmputacion = async (id: number) => {
    const response = await apiClient.get(`/CausaAmputacion/${id}`);
    return response.data;
};

// Función para crear una nueva causa de amputación
export const createCausaAmputacion = async (causa: { descripcion: string }) => {
    const response = await apiClient.post('/CausaAmputacion', causa);
    return response.data;
};

// Función para actualizar una causa de amputación existente
export const updateCausaAmputacion = async (id: number, causa: { descripcion: string }) => {
    const response = await apiClient.put(`/CausaAmputacion/${id}`, causa);
    return response.data;
};

// Función para eliminar una causa de amputación por ID
export const deleteCausaAmputacion = async (id: number) => {
    const response = await apiClient.delete(`/CausaAmputacion/${id}`);
    return response.data;
};
