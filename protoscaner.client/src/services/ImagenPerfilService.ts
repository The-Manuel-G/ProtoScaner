// src/services/ImagenPerfilService.ts
import apiClient from '../api/client';

// Funci�n para obtener todas las im�genes de perfil
export const getImagenesPerfil = async () => {
    const response = await apiClient.get('/ImagenPerfil');
    return response.data;
};

// Funci�n para obtener una imagen de perfil espec�fica por ID
export const getImagenPerfil = async (id: number) => {
    const response = await apiClient.get(`/ImagenPerfil/${id}`);
    return response.data;
};

// Funci�n para crear una nueva imagen de perfil
export const createImagenPerfil = async (imagenPerfil: {
    idUsuario: number;
    imagen: string;
    descripcion: string;
}) => {
    const response = await apiClient.post('/ImagenPerfil', imagenPerfil);
    return response.data;
};

// Funci�n para actualizar una imagen de perfil existente
export const updateImagenPerfil = async (id: number, imagenPerfil: {
    idUsuario: number;
    imagen: string;
    descripcion: string;
}) => {
    const response = await apiClient.put(`/ImagenPerfil/${id}`, imagenPerfil);
    return response.data;
};

// Funci�n para eliminar una imagen de perfil por ID
export const deleteImagenPerfil = async (id: number) => {
    const response = await apiClient.delete(`/ImagenPerfil/${id}`);
    return response.data;
};
