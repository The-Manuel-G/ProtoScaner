// src/services/TallaService.ts

import apiClient from '../api/client';
import { TallaDTO } from '../types/Talla';

// Funci�n para obtener todas las tallas
export const getTallas = async (): Promise<TallaDTO[]> => {
    const response = await apiClient.get('/talla');
    return response.data;
};

// Funci�n para obtener tallas por TipoAmputacionId
export const getTallasByTipoAmputacion = async (tipoAmputacionId: number): Promise<TallaDTO[]> => {
    const response = await apiClient.get(`/talla/tipoAmputacion/${tipoAmputacionId}`);
    return response.data;
};

// Funci�n para obtener una talla espec�fica por ID
export const getTalla = async (id: number): Promise<TallaDTO> => {
    const response = await apiClient.get(`/talla/${id}`);
    return response.data;
};

// Funci�n para crear una nueva talla
export const createTalla = async (talla: Omit<TallaDTO, 'IdTalla'>): Promise<TallaDTO> => {
    const response = await apiClient.post('/talla', talla);
    return response.data;
};

// Funci�n para actualizar una talla existente
export const updateTalla = async (id: number, talla: TallaDTO): Promise<void> => {
    await apiClient.put(`/talla/${id}`, talla);
};

// Funci�n para eliminar una talla por ID
export const deleteTalla = async (id: number): Promise<void> => {
    await apiClient.delete(`/talla/${id}`);
};
