// src/services/CausaAmputacionService.ts
import apiClient from '../api/client';

// Funci�n para obtener todas las causas de amputaci�n
export const getCausasAmputacion = async () => {
    const response = await apiClient.get('/CausaAmputacion');
    return response.data;
};

// Funci�n para obtener una causa de amputaci�n espec�fica por ID
export const getCausaAmputacion = async (id: number) => {
    const response = await apiClient.get(`/CausaAmputacion/${id}`);
    return response.data;
};

// Funci�n para crear una nueva causa de amputaci�n
export const createCausaAmputacion = async (causa: { descripcion: string }) => {
    const response = await apiClient.post('/CausaAmputacion', causa);
    return response.data;
};

// Funci�n para actualizar una causa de amputaci�n existente
export const updateCausaAmputacion = async (id: number, causa: { descripcion: string }) => {
    const response = await apiClient.put(`/CausaAmputacion/${id}`, causa);
    return response.data;
};

// Funci�n para eliminar una causa de amputaci�n por ID
export const deleteCausaAmputacion = async (id: number) => {
    const response = await apiClient.delete(`/CausaAmputacion/${id}`);
    return response.data;
};
