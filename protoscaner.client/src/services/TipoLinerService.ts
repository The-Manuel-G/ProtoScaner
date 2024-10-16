// src/services/TipoLinerService.ts
import apiClient from '../api/client';

// Función para obtener todos los tipos de liner
export const getTiposLiner = async () => {
    const response = await apiClient.get('/TipoLiner');
    return response.data;
};

// Función para obtener un tipo de liner específico por ID
export const getTipoLiner = async (id: number) => {
    const response = await apiClient.get(`/TipoLiner/${id}`);
    return response.data;
};

// Función para crear un nuevo tipo de liner
export const createTipoLiner = async (tipoLiner: {
    tipoNombre: string;
}) => {
    const response = await apiClient.post('/TipoLiner', tipoLiner);
    return response.data;
};

// Función para actualizar un tipo de liner existente
export const updateTipoLiner = async (id: number, tipoLiner: {
    tipoNombre: string;
}) => {
    const response = await apiClient.put(`/TipoLiner/${id}`, tipoLiner);
    return response.data;
};

// Función para eliminar un tipo de liner por ID
export const deleteTipoLiner = async (id: number) => {
    const response = await apiClient.delete(`/TipoLiner/${id}`);
    return response.data;
};
