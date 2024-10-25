// src/services/ProtesisComponenteService.ts
import apiClient from '../api/client';

// Funci�n para obtener todos los componentes de pr�tesis
export const getProtesisComponentes = async () => {
    const response = await apiClient.get('/protesisComponente');
    return response.data;
};

// Funci�n para obtener un componente espec�fico por IDs de pr�tesis y componente
export const getProtesisComponente = async (protesisId: number, componentId: number) => {
    const response = await apiClient.get(`/protesisComponente/${protesisId}/${componentId}`);
    return response.data;
};

// Funci�n para crear un nuevo componente de pr�tesis
export const createProtesisComponente = async (componente: {
    protesisId: number;
    componentId: number;
    cantidad: number;
}) => {
    const response = await apiClient.post('/protesisComponente', componente);
    return response.data;
};

// Funci�n para actualizar un componente de pr�tesis existente
export const updateProtesisComponente = async (protesisId: number, componentId: number, componente: {
    cantidad: number;
}) => {
    const response = await apiClient.put(`/protesisComponente/${protesisId}/${componentId}`, componente);
    return response.data;
};

// Funci�n para eliminar un componente de pr�tesis por IDs de pr�tesis y componente
export const deleteProtesisComponente = async (protesisId: number, componentId: number) => {
    const response = await apiClient.delete(`/protesisComponente/${protesisId}/${componentId}`);
    return response.data;
};
