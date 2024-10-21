// src/services/LinerTranstibialService.ts
import apiClient from '../api/client';

// Funci�n para obtener todos los liners transtibiales
export const getLinersTranstibiales = async () => {
    const response = await apiClient.get('/LinerTranstibial');
    return response.data;
};

// Funci�n para obtener un liner transtibial espec�fico por ID
export const getLinerTranstibial = async (id: number) => {
    const response = await apiClient.get(`/LinerTranstibial/${id}`);
    return response.data;
};

// Funci�n para crear un nuevo liner transtibial
export const createLinerTranstibial = async (linerTranstibial: {
    tipoLinerId: number;
    tallaId: number;
}) => {
    const response = await apiClient.post('/LinerTranstibial', linerTranstibial);
    return response.data;
};

// Funci�n para actualizar un liner transtibial existente
export const updateLinerTranstibial = async (id: number, linerTranstibial: {
    tipoLinerId: number;
    tallaId: number;
}) => {
    const response = await apiClient.put(`/LinerTranstibial/${id}`, linerTranstibial);
    return response.data;
};

// Funci�n para eliminar un liner transtibial por ID
export const deleteLinerTranstibial = async (id: number) => {
    const response = await apiClient.delete(`/LinerTranstibial/${id}`);
    return response.data;
};
