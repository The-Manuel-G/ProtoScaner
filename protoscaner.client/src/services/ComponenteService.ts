// src/services/ComponenteService.ts
import apiClient from '../api/client';

// Función para obtener todos los componentes
export const getComponentes = async () => {
    const response = await apiClient.get('/Componente');
    return response.data;
};

// Función para obtener un componente específico por ID
export const getComponente = async (id: number) => {
    const response = await apiClient.get(`/Componente/${id}`);
    return response.data;
};

// Función para crear un nuevo componente
export const createComponente = async (componente: { componentTipoId: number; codigo: string; description: string }) => {
    const response = await apiClient.post('/Componente', componente);
    return response.data;
};

// Función para actualizar un componente existente
export const updateComponente = async (id: number, componente: { componentTipoId: number; codigo: string; description: string }) => {
    const response = await apiClient.put(`/Componente/${id}`, componente);
    return response.data;
};

// Función para eliminar un componente por ID
export const deleteComponente = async (id: number) => {
    const response = await apiClient.delete(`/Componente/${id}`);
    return response.data;
};
