// src/services/MedidasCircunferenciumService.ts
import apiClient from '../api/client';

// Funci�n para obtener todas las medidas de circunferencia
export const getMedidasCircunferenciums = async () => {
    const response = await apiClient.get('/MedidasCircunferencium');
    return response.data;
};

// Funci�n para obtener una medida de circunferencia espec�fica por ID
export const getMedidaCircunferencium = async (id: number) => {
    const response = await apiClient.get(`/MedidasCircunferencium/${id}`);
    return response.data;
};

// Funci�n para crear una nueva medida de circunferencia
export const createMedidaCircunferencium = async (medida: {
    idValor: number;
    numeroCircunferencia: number;
    valorMm: number;
}) => {
    const response = await apiClient.post('/MedidasCircunferencium', medida);
    return response.data;
};

// Funci�n para actualizar una medida de circunferencia existente
export const updateMedidaCircunferencium = async (id: number, medida: {
    numeroCircunferencia: number;
    valorMm: number;
}) => {
    const response = await apiClient.put(`/MedidasCircunferencium/${id}`, medida);
    return response.data;
};

// Funci�n para eliminar una medida de circunferencia por ID
export const deleteMedidaCircunferencium = async (id: number) => {
    const response = await apiClient.delete(`/MedidasCircunferencium/${id}`);
    return response.data;
};
