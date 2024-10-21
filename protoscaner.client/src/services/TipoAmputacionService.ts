// src/services/TipoAmputacionService.ts
import apiClient from '../api/client';

// Función para obtener todos los tipos de amputación
export const getTiposAmputacion = async () => {
    const response = await apiClient.get('/TipoAmputacion');
    return response.data;
};

// Función para obtener un tipo de amputación específico por ID
export const getTipoAmputacion = async (id: number) => {
    const response = await apiClient.get(`/TipoAmputacion/${id}`);
    return response.data;
};

// Función para crear un nuevo tipo de amputación
export const createTipoAmputacion = async (tipoAmputacion: {
    tipoAmputacion1: string;
}) => {
    const response = await apiClient.post('/TipoAmputacion', tipoAmputacion);
    return response.data;
};

// Función para actualizar un tipo de amputación existente
export const updateTipoAmputacion = async (id: number, tipoAmputacion: {
    tipoAmputacion1: string;
}) => {
    const response = await apiClient.put(`/TipoAmputacion/${id}`, tipoAmputacion);
    return response.data;
};

// Función para eliminar un tipo de amputación por ID
export const deleteTipoAmputacion = async (id: number) => {
    const response = await apiClient.delete(`/TipoAmputacion/${id}`);
    return response.data;
};
