// src/services/LadoAmputacionService.ts
import apiClient from '../api/client';

// Funci�n para obtener todos los lados de amputaci�n
export const getLadosAmputacion = async () => {
    const response = await apiClient.get('/LadoAmputacion');
    return response.data;
};

// Funci�n para obtener un lado de amputaci�n espec�fico por ID
export const getLadoAmputacion = async (id: number) => {
    const response = await apiClient.get(`/LadoAmputacion/${id}`);
    return response.data;
};

// Funci�n para crear un nuevo lado de amputaci�n
export const createLadoAmputacion = async (ladoAmputacion: {
    ladoAmputacion1: string;
}) => {
    const response = await apiClient.post('/LadoAmputacion', ladoAmputacion);
    return response.data;
};

// Funci�n para actualizar un lado de amputaci�n existente
export const updateLadoAmputacion = async (id: number, ladoAmputacion: {
    ladoAmputacion1: string;
}) => {
    const response = await apiClient.put(`/LadoAmputacion/${id}`, ladoAmputacion);
    return response.data;
};

// Funci�n para eliminar un lado de amputaci�n por ID
export const deleteLadoAmputacion = async (id: number) => {
    const response = await apiClient.delete(`/LadoAmputacion/${id}`);
    return response.data;
};