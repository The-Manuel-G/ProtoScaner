// src/services/EstatusProtesiService.ts
import apiClient from '../api/client';

// Función para obtener todos los estatus de prótesis
export const getEstatusProtesis = async () => {
    const response = await apiClient.get('/EstatusProtesi');
    return response.data;
};

// Función para obtener un estatus de prótesis específico por ID
export const getEstatusProtesi = async (id: number) => {
    const response = await apiClient.get(`/EstatusProtesi/${id}`);
    return response.data;
};

// Función para crear un nuevo estatus de prótesis
export const createEstatusProtesi = async (estatusProtesi: { descripcion: string }) => {
    const response = await apiClient.post('/EstatusProtesi', estatusProtesi);
    return response.data;
};

// Función para actualizar un estatus de prótesis existente
export const updateEstatusProtesi = async (id: number, estatusProtesi: { descripcion: string }) => {
    const response = await apiClient.put(`/EstatusProtesi/${id}`, estatusProtesi);
    return response.data;
};

// Función para eliminar un estatus de prótesis por ID
export const deleteEstatusProtesi = async (id: number) => {
    const response = await apiClient.delete(`/EstatusProtesi/${id}`);
    return response.data;
};
