// src/services/TipoLinerService.ts

import apiClient from '../api/client';
import { TipoLinerDTO } from '../types/TipoLiner';

// Función para obtener todos los tipos de liner
export const getTipoLiners = async (): Promise<TipoLinerDTO[]> => {
    const response = await apiClient.get('/tipoLiner'); // Asegúrate de tener este endpoint en el backend
    return response.data;
};

// Función para obtener un tipo de liner específico por ID
export const getTipoLiner = async (id: number): Promise<TipoLinerDTO> => {
    const response = await apiClient.get(`/tipoLiner/${id}`);
    return response.data;
};

// Función para crear un nuevo tipo de liner
export const createTipoLiner = async (tipoLiner: Omit<TipoLinerDTO, 'IdTipoLiner'>): Promise<TipoLinerDTO> => {
    const response = await apiClient.post('/tipoLiner', tipoLiner);
    return response.data;
};

// Función para actualizar un tipo de liner existente
export const updateTipoLiner = async (id: number, tipoLiner: TipoLinerDTO): Promise<void> => {
    await apiClient.put(`/tipoLiner/${id}`, tipoLiner);
};

// Función para eliminar un tipo de liner por ID
export const deleteTipoLiner = async (id: number): Promise<void> => {
    await apiClient.delete(`/tipoLiner/${id}`);
};
