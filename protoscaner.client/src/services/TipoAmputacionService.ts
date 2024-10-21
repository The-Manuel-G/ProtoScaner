// src/services/TipoAmputacionService.ts
import apiClient from '../api/client';

// Funci�n para obtener todos los tipos de amputaci�n
export const getTiposAmputacion = async () => {
    const response = await apiClient.get('/TipoAmputacion');
    return response.data;
};

// Funci�n para obtener un tipo de amputaci�n espec�fico por ID
export const getTipoAmputacion = async (id: number) => {
    const response = await apiClient.get(`/TipoAmputacion/${id}`);
    return response.data;
};

// Funci�n para crear un nuevo tipo de amputaci�n
export const createTipoAmputacion = async (tipoAmputacion: {
    tipoAmputacion1: string;
}) => {
    const response = await apiClient.post('/TipoAmputacion', tipoAmputacion);
    return response.data;
};

// Funci�n para actualizar un tipo de amputaci�n existente
export const updateTipoAmputacion = async (id: number, tipoAmputacion: {
    tipoAmputacion1: string;
}) => {
    const response = await apiClient.put(`/TipoAmputacion/${id}`, tipoAmputacion);
    return response.data;
};

// Funci�n para eliminar un tipo de amputaci�n por ID
export const deleteTipoAmputacion = async (id: number) => {
    const response = await apiClient.delete(`/TipoAmputacion/${id}`);
    return response.data;
};
