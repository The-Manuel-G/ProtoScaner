// src/services/GeneroService.ts
import apiClient from '../api/client';
import { Genero } from '../types/Genero';

// Función para obtener todos los géneros
export const getGeneros = async (): Promise<Genero[]> => {
    const response = await apiClient.get('/Genero');
    return response.data;
};

// Función para obtener un género específico por ID
export const getGenero = async (id: number): Promise<Genero> => {
    const response = await apiClient.get(`/Genero/${id}`);
    return response.data;
};

// Función para crear un nuevo género
export const createGenero = async (genero: Genero): Promise<Genero> => {
    const response = await apiClient.post('/Genero', genero);
    return response.data;
};

// Función para actualizar un género existente
export const updateGenero = async (id: number, genero: Genero): Promise<Genero> => {
    const response = await apiClient.put(`/Genero/${id}`, genero);
    return response.data;
};

// Función para eliminar un género por ID
export const deleteGenero = async (id: number): Promise<void> => {
    await apiClient.delete(`/Genero/${id}`);
};
