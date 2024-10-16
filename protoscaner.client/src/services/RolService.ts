// src/services/RolService.ts
import apiClient from '../api/client';

// Función para obtener todos los roles
export const getRoles = async () => {
    const response = await apiClient.get('/rol');
    return response.data;
};

// Función para obtener un rol específico por ID
export const getRol = async (id: number) => {
    const response = await apiClient.get(`/rol/${id}`);
    return response.data;
};

// Función para crear un nuevo rol
export const createRol = async (rol: {
    nombreRol: string;
    descripcion: string;
}) => {
    const response = await apiClient.post('/rol', rol);
    return response.data;
};

// Función para actualizar un rol existente
export const updateRol = async (id: number, rol: {
    nombreRol: string;
    descripcion: string;
}) => {
    const response = await apiClient.put(`/rol/${id}`, rol);
    return response.data;
};

// Función para eliminar un rol por ID
export const deleteRol = async (id: number) => {
    const response = await apiClient.delete(`/rol/${id}`);
    return response.data;
};
