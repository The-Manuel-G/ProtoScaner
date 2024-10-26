// src/services/ComponenteTipoService.ts
import apiClient from '../api/client';

// Funci�n para obtener todos los tipos de componentes
export const getComponentesTipos = async () => {
    const response = await apiClient.get('/ComponenteTipo');
    return response.data;
};

// Funci�n para obtener un tipo de componente espec�fico por ID
export const getComponenteTipo = async (id: number) => {
    const response = await apiClient.get(`/ComponenteTipo/${id}`);
    return response.data;
};

// Funci�n para crear un nuevo tipo de componente
export const createComponenteTipo = async (componenteTipo: { tipoNombre: string }) => {
    const response = await apiClient.post('/ComponenteTipo', componenteTipo);
    return response.data;
};

// Funci�n para actualizar un tipo de componente existente
export const updateComponenteTipo = async (id: number, componenteTipo: { tipoNombre: string }) => {
    const response = await apiClient.put(`/ComponenteTipo/${id}`, componenteTipo);
    return response.data;
};

// Funci�n para eliminar un tipo de componente por ID
export const deleteComponenteTipo = async (id: number) => {
    const response = await apiClient.delete(`/ComponenteTipo/${id}`);
    return response.data;
};
