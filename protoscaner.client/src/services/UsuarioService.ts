// src/api/usuarios.ts
import apiClient from '../api/client';
import { Usuario, CreateUsuarioDTO } from '../types/Usuario';  // Importa CreateUsuarioDTO

// Funci�n para obtener todos los usuarios
export const getUsuarios = async (): Promise<Usuario[]> => {
    const response = await apiClient.get<Usuario[]>('/Usuario');
    return response.data;
};

// Funci�n para obtener un usuario por ID
export const getUsuarioById = async (id: number): Promise<Usuario> => {
    const response = await apiClient.get<Usuario>(`/Usuario/${id}`);
    return response.data;
};

// Funci�n para crear un nuevo usuario, usando CreateUsuarioDTO
export const createUsuario = async (usuario: CreateUsuarioDTO): Promise<Usuario> => {
    const response = await apiClient.post<Usuario>('/Usuario', usuario);
    return response.data;
};

// Funci�n para actualizar un usuario por ID
export const updateUsuario = async (id: number, usuario: Usuario): Promise<void> => {
    await apiClient.put(`/Usuario/${id}`, usuario);
};

// Funci�n para eliminar un usuario por ID
export const deleteUsuario = async (id: number): Promise<void> => {
    await apiClient.delete(`/Usuario/${id}`);
};
