// src/services/LinerTransfemoralService.ts
import apiClient from '../api/client';

// Funci�n para obtener todos los liners transfemorales
export const getLinersTransfemorales = async () => {
    const response = await apiClient.get('/LinerTransfemoral');
    return response.data;
};

// Funci�n para obtener un liner transfemoral espec�fico por ID
export const getLinerTransfemoral = async (id: number) => {
    const response = await apiClient.get(`/LinerTransfemoral/${id}`);
    return response.data;
};

// Funci�n para crear un nuevo liner transfemoral
export const createLinerTransfemoral = async (linerTransfemoral: {
    tipoLinerId: number;
    tallaId: number;
}) => {
    const response = await apiClient.post('/LinerTransfemoral', linerTransfemoral);
    return response.data;
};

// Funci�n para actualizar un liner transfemoral existente
export const updateLinerTransfemoral = async (id: number, linerTransfemoral: {
    tipoLinerId: number;
    tallaId: number;
}) => {
    const response = await apiClient.put(`/LinerTransfemoral/${id}`, linerTransfemoral);
    return response.data;
};

// Funci�n para eliminar un liner transfemoral por ID
export const deleteLinerTransfemoral = async (id: number) => {
    const response = await apiClient.delete(`/LinerTransfemoral/${id}`);
    return response.data;
};
