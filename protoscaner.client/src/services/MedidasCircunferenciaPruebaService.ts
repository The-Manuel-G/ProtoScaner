// src/services/MedidasCircunferenciaPruebaService.ts
import apiClient from '../api/client';

// Función para obtener todas las medidas de circunferencia de prueba
export const getMedidasCircunferenciaPruebas = async () => {
    const response = await apiClient.get('/MedidasCircunferenciaPrueba');
    return response.data;
};

// Función para obtener una medida de circunferencia de prueba específica por ID
export const getMedidaCircunferenciaPrueba = async (id: number) => {
    const response = await apiClient.get(`/MedidasCircunferenciaPrueba/${id}`);
    return response.data;
};

// Función para crear una nueva medida de circunferencia de prueba
export const createMedidaCircunferenciaPrueba = async (medida: {
    idValor: number;
    numeroCircunferencia: number;
    valorMm: number;
}) => {
    const response = await apiClient.post('/MedidasCircunferenciaPrueba', medida);
    return response.data;
};

// Función para actualizar una medida de circunferencia de prueba existente
export const updateMedidaCircunferenciaPrueba = async (id: number, medida: {
    numeroCircunferencia: number;
    valorMm: number;
}) => {
    const response = await apiClient.put(`/MedidasCircunferenciaPrueba/${id}`, medida);
    return response.data;
};

// Función para eliminar una medida de circunferencia de prueba por ID
export const deleteMedidaCircunferenciaPrueba = async (id: number) => {
    const response = await apiClient.delete(`/MedidasCircunferenciaPrueba/${id}`);
    return response.data;
};
