// src/services/EstatusProtesiService.ts
import apiClient from '../api/client';

// Funci�n para obtener todos los estatus de pr�tesis
export const getEstatusProtesis = async () => {
    const response = await apiClient.get('/EstatusProtesi');
    return response.data;
};

// Funci�n para obtener un estatus de pr�tesis espec�fico por ID
export const getEstatusProtesi = async (id: number) => {
    const response = await apiClient.get(`/EstatusProtesi/${id}`);
    return response.data;
};

// Funci�n para crear un nuevo estatus de pr�tesis
export const createEstatusProtesi = async (estatusProtesi: { descripcion: string }) => {
    const response = await apiClient.post('/EstatusProtesi', estatusProtesi);
    return response.data;
};

// Funci�n para actualizar un estatus de pr�tesis existente
export const updateEstatusProtesi = async (id: number, estatusProtesi: { descripcion: string }) => {
    const response = await apiClient.put(`/EstatusProtesi/${id}`, estatusProtesi);
    return response.data;
};

// Funci�n para eliminar un estatus de pr�tesis por ID
export const deleteEstatusProtesi = async (id: number) => {
    const response = await apiClient.delete(`/EstatusProtesi/${id}`);
    return response.data;
};
