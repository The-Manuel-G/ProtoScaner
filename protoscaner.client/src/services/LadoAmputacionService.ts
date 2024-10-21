// src/services/LadoAmputacionService.ts
import apiClient from '../api/client';

// Función para obtener todos los lados de amputación
export const getLadosAmputacion = async () => {
    const response = await apiClient.get('/LadoAmputacion');
    return response.data;
};

// Función para obtener un lado de amputación específico por ID
export const getLadoAmputacion = async (id: number) => {
    const response = await apiClient.get(`/LadoAmputacion/${id}`);
    return response.data;
};

// Función para crear un nuevo lado de amputación
export const createLadoAmputacion = async (ladoAmputacion: {
    ladoAmputacion1: string;
}) => {
    const response = await apiClient.post('/LadoAmputacion', ladoAmputacion);
    return response.data;
};

// Función para actualizar un lado de amputación existente
export const updateLadoAmputacion = async (id: number, ladoAmputacion: {
    ladoAmputacion1: string;
}) => {
    const response = await apiClient.put(`/LadoAmputacion/${id}`, ladoAmputacion);
    return response.data;
};

// Función para eliminar un lado de amputación por ID
export const deleteLadoAmputacion = async (id: number) => {
    const response = await apiClient.delete(`/LadoAmputacion/${id}`);
    return response.data;
};