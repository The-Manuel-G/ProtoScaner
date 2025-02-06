// src/services/TomaMedidasEscaneoService.ts

import apiClient from '../api/client';
import { TomaMedidasEscaneo } from '../types/TomaMedidasEscaneo';

// Función para obtener todas las tomas de medidas
export const getTomasMedidasEscaneo = async (): Promise<TomaMedidasEscaneo[]> => {
    const response = await apiClient.get('/TomaMedidasEscaneo');
    return response.data;
};

// Función para obtener una toma de medidas por ID
export const getTomaMedidasEscaneo = async (id: number): Promise<TomaMedidasEscaneo> => {
    const response = await apiClient.get(`/TomaMedidasEscaneo/${id}`);
    return response.data;
};

// Función para crear una nueva toma de medidas
export const createTomaMedidasEscaneo = async (tomaMedidasEscaneo: Omit<TomaMedidasEscaneo, 'IdEscaneo'>): Promise<TomaMedidasEscaneo> => {
    const response = await apiClient.post('/TomaMedidasEscaneo', tomaMedidasEscaneo);
    return response.data;
};

// Función para eliminar una toma de medidas por ID
export const deleteTomaMedidasEscaneo = async (id: number): Promise<void> => {
    await apiClient.delete(`/TomaMedidasEscaneo/${id}`);
};
