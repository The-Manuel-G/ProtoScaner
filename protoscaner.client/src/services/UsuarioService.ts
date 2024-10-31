// src/services/UsuarioService.ts
import apiClient from '../api/client';
import { Usuario, CreateUsuarioDTO } from '../types/Usuario';

// Función para obtener todos los usuarios
export const getUsuarios = async (): Promise<Usuario[]> => {
    // Cambié '/Uuario' a '/Usuario' para corregir el error tipográfico
    const response = await apiClient.get<Usuario[]>('/Usuario');
    return response.data;
};

// Función para obtener un usuario por ID
export const getUsuarioById = async (id: number): Promise<Usuario> => {
    // Cambié '//' a '/Usuario/' para que el endpoint sea correcto
    const response = await apiClient.get<Usuario>(`/Usuario/${id}`);
    return response.data;
};

// Función para crear un nuevo usuario, usando CreateUsuarioDTO
export const createUsuario = async (usuario: CreateUsuarioDTO): Promise<Usuario> => {
    // Cambié '/Uuario' a '/Usuario' para corregir el error tipográfico
    const response = await apiClient.post<Usuario>('/Usuario', usuario);
    return response.data;
};

// Función para actualizar un usuario por ID, usando Partial<Usuario>
export const updateUsuario = async (id: number, usuario: Partial<Usuario>): Promise<void> => {
    // Asegurándome de que '/usuario' esté en mayúscula para ser consistente
    await apiClient.put(`/Usuario/${id}`, usuario);
};

// Función para eliminar un usuario por ID
export const deleteUsuario = async (id: number): Promise<void> => {
    // Asegurándome de que '/usuario' esté en mayúscula para ser consistente
    await apiClient.delete(`/Usuario/${id}`);
};
