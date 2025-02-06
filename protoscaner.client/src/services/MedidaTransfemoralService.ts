// src/services/MedidaTransfemoralService.ts

import apiClient from '../api/client';
import { MedidaTransfemoral } from '../types/MedidaTransfemoral';
import { CreateMedidaTransfemoral } from '../types/CreateMedidaTransfemoral';

// Funci�n para obtener todas las medidas de transfemoral
export const getMedidasTransfemoral = async (): Promise<MedidaTransfemoral[]> => {
    const response = await apiClient.get('/MedidaTransfemoral');
    return response.data;
};

// Funci�n para obtener una medida de transfemoral espec�fica por ID
export const getMedidaTransfemoralById = async (id: number): Promise<MedidaTransfemoral> => {
    const response = await apiClient.get(`/MedidaTransfemoral/${id}`);
    return response.data;
};

// Funci�n para crear una nueva medida de transfemoral
export const createMedidaTransfemoral = async (medida: CreateMedidaTransfemoral): Promise<MedidaTransfemoral> => {
    const response = await apiClient.post('/MedidaTransfemoral', medida);
    return response.data;
};

// Funci�n para actualizar una medida de transfemoral existente
export const updateMedidaTransfemoral = async (
    id: number,
    medida: Partial<CreateMedidaTransfemoral>
): Promise<void> => {
    await apiClient.put(`/MedidaTransfemoral/${id}`, medida);
};

// Funci�n para eliminar una medida de transfemoral por ID
export const deleteMedidaTransfemoral = async (id: number): Promise<void> => {
    await apiClient.delete(`/MedidaTransfemoral/${id}`);
};
