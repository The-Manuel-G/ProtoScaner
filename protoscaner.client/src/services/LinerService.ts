// src/services/LinerService.ts
import apiClient from '../api/client';

// Funci�n para obtener todos los liners
export const getLiners = async () => {
    const response = await apiClient.get('/Liner');
    return response.data;
};

// Funci�n para obtener un liner espec�fico por ID
export const getLiner = async (id: number) => {
    const response = await apiClient.get(`/Liner/${id}`);
    return response.data;
};

// Funci�n para crear un nuevo liner
export const createLiner = async (liner: {
    tipoLiner: string;
    talla: string;
}) => {
    const response = await apiClient.post('/Liner', liner);
    return response.data;
};

// Funci�n para actualizar un liner existente
export const updateLiner = async (id: number, liner: {
    tipoLiner: string;
    talla: string;
}) => {
    const response = await apiClient.put(`/Liner/${id}`, liner);
    return response.data;
};

// Funci�n para eliminar un liner por ID
export const deleteLiner = async (id: number) => {
    const response = await apiClient.delete(`/Liner/${id}`);
    return response.data;
};
