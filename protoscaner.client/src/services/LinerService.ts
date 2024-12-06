// src/services/LinerService.ts

import apiClient from '../api/client';
import { LinerDTO } from '../types/Liner';

// Función para obtener todos los liners
export const getLiners = async (): Promise<LinerDTO[]> => {
    const response = await apiClient.get('/Liner');
    return response.data;
};

// Función para obtener un liner específico por ID
export const getLiner = async (id: number): Promise<LinerDTO> => {
    const response = await apiClient.get(`/Liner/${id}`);
    return response.data;

    // src/services/LinerService.ts

   

};

// Función para crear un nuevo liner
export const createLiner = async (liner: Omit<LinerDTO, 'IdLiner'>): Promise<LinerDTO> => {
    const response = await apiClient.post('/Liner', liner);
    return response.data;
};

// Función para actualizar un liner existente
export const updateLiner = async (id: number, liner: LinerDTO): Promise<void> => {
    await apiClient.put(`/Liner/${id}`, liner);
};

// Función para eliminar un liner por ID
export const deleteLiner = async (id: number): Promise<void> => {
    await apiClient.delete(`/Liner/${id}`);
};
