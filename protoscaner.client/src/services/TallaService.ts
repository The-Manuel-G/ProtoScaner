// src/services/TallaService.ts
import apiClient from '../api/client';

// Función para obtener todas las tallas
export const getTallas = async () => {
    const response = await apiClient.get('/talla');
    return response.data;
};

// Función para obtener una talla específica por ID
export const getTalla = async (id: number) => {
    const response = await apiClient.get(`/talla/${id}`);
    return response.data;
};

// Función para crear una nueva talla
export const createTalla = async (talla: {
    tallaNombre: string;
}) => {
    const response = await apiClient.post('/talla', talla);
    return response.data;
};

// Función para actualizar una talla existente
export const updateTalla = async (id: number, talla: {
    tallaNombre: string;
}) => {
    const response = await apiClient.put(`/talla/${id}`, talla);
    return response.data;
};

// Función para eliminar una talla por ID
export const deleteTalla = async (id: number) => {
    const response = await apiClient.delete(`/talla/${id}`);
    return response.data;
};
