// src/api/usuarios.ts
import apiClient from '../api/client';  // Importa el cliente Axios ya configurado
import { Usuario } from '../types/Usuario';  // Importa el tipo de Usuario

// Función para obtener todos los usuarios
export const getUsuarios = async (): Promise<Usuario[]> => {
    const response = await apiClient.get<Usuario[]>('/Usuario');
    return response.data;
};

// Función para obtener un usuario por ID
export const getUsuarioById = async (id: number): Promise<Usuario> => {
    const response = await apiClient.get<Usuario>(`/Usuario/${id}`);
    return response.data;
};

// Función para crear un nuevo usuario
export const createUsuario = async (usuario: Usuario): Promise<Usuario> => {
    const response = await apiClient.post<Usuario>('/Usuario', usuario);
    return response.data;
};

// Función para actualizar un usuario por ID
export const updateUsuario = async (id: number, usuario: Usuario): Promise<void> => {
    await apiClient.put(`/Usuario/${id}`, usuario);
};

// Función para eliminar un usuario por ID
export const deleteUsuario = async (id: number): Promise<void> => {
    await apiClient.delete(`/Usuario/${id}`);
};
