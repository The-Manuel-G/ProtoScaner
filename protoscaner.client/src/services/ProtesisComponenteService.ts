// src/services/ProtesisComponenteService.ts
import apiClient from '../api/client';

// Función para obtener todos los componentes de prótesis
export const getProtesisComponentes = async () => {
    const response = await apiClient.get('/protesisComponente');
    return response.data;
};

// Función para obtener un componente específico por IDs de prótesis y componente
export const getProtesisComponente = async (protesisId: number, componentId: number) => {
    const response = await apiClient.get(`/protesisComponente/${protesisId}/${componentId}`);
    return response.data;
};

// Función para crear un nuevo componente de prótesis
export const createProtesisComponente = async (componente: {
    protesisId: number;
    componentId: number;
    cantidad: number;
}) => {
    const response = await apiClient.post('/protesisComponente', componente);
    return response.data;
};

// Función para actualizar un componente de prótesis existente
export const updateProtesisComponente = async (protesisId: number, componentId: number, componente: {
    cantidad: number;
}) => {
    const response = await apiClient.put(`/protesisComponente/${protesisId}/${componentId}`, componente);
    return response.data;
};

// Función para eliminar un componente de prótesis por IDs de prótesis y componente
export const deleteProtesisComponente = async (protesisId: number, componentId: number) => {
    const response = await apiClient.delete(`/protesisComponente/${protesisId}/${componentId}`);
    return response.data;
};
