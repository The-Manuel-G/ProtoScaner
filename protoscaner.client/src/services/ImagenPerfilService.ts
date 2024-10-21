// src/services/ImagenPerfilService.ts
import apiClient from '../api/client';

// Función para obtener todas las imágenes de perfil
export const getImagenesPerfil = async () => {
    const response = await apiClient.get('/ImagenPerfil');
    return response.data;
};

// Función para obtener una imagen de perfil específica por ID
export const getImagenPerfil = async (id: number) => {
    const response = await apiClient.get(`/ImagenPerfil/${id}`);
    return response.data;
};

// Función para crear una nueva imagen de perfil
export const createImagenPerfil = async (imagenPerfil: {
    idUsuario: number;
    imagen: string;
    descripcion: string;
}) => {
    const response = await apiClient.post('/ImagenPerfil', imagenPerfil);
    return response.data;
};

// Función para actualizar una imagen de perfil existente
export const updateImagenPerfil = async (id: number, imagenPerfil: {
    idUsuario: number;
    imagen: string;
    descripcion: string;
}) => {
    const response = await apiClient.put(`/ImagenPerfil/${id}`, imagenPerfil);
    return response.data;
};

// Función para eliminar una imagen de perfil por ID
export const deleteImagenPerfil = async (id: number) => {
    const response = await apiClient.delete(`/ImagenPerfil/${id}`);
    return response.data;
};
