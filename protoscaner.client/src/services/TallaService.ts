// src/services/TallaService.ts
import apiClient from '../api/client';

// Funci�n para obtener todas las tallas
export const getTallas = async () => {
    const response = await apiClient.get('/talla');
    return response.data;
};

// Funci�n para obtener una talla espec�fica por ID
export const getTalla = async (id: number) => {
    const response = await apiClient.get(`/talla/${id}`);
    return response.data;
};

// Funci�n para crear una nueva talla
export const createTalla = async (talla: {
    tallaNombre: string;
}) => {
    const response = await apiClient.post('/talla', talla);
    return response.data;
};

// Funci�n para actualizar una talla existente
export const updateTalla = async (id: number, talla: {
    tallaNombre: string;
}) => {
    const response = await apiClient.put(`/talla/${id}`, talla);
    return response.data;
};

// Funci�n para eliminar una talla por ID
export const deleteTalla = async (id: number) => {
    const response = await apiClient.delete(`/talla/${id}`);
    return response.data;
};
