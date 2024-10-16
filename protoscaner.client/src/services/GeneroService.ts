// src/services/GeneroService.ts
import apiClient from '../api/client';

// Funci�n para obtener todos los g�neros
export const getGeneros = async () => {
    const response = await apiClient.get('/Genero');
    return response.data;
};

// Funci�n para obtener un g�nero espec�fico por ID
export const getGenero = async (id: number) => {
    const response = await apiClient.get(`/Genero/${id}`);
    return response.data;
};

// Funci�n para crear un nuevo g�nero
export const createGenero = async (genero: { genero1: string }) => {
    const response = await apiClient.post('/Genero', genero);
    return response.data;
};

// Funci�n para actualizar un g�nero existente
export const updateGenero = async (id: number, genero: { genero1: string }) => {
    const response = await apiClient.put(`/Genero/${id}`, genero);
    return response.data;
};

// Funci�n para eliminar un g�nero por ID
export const deleteGenero = async (id: number) => {
    const response = await apiClient.delete(`/Genero/${id}`);
    return response.data;
};
