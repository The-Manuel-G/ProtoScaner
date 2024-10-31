// src/services/UsuarioService.ts
import apiClient from '../api/client';
import { Usuario, CreateUsuarioDTO } from '../types/Usuario';

// Funci�n para obtener todos los usuarios
export const getUsuarios = async (): Promise<Usuario[]> => {
    // Cambi� '/Uuario' a '/Usuario' para corregir el error tipogr�fico
    const response = await apiClient.get<Usuario[]>('/Usuario');
    return response.data;
};

// Funci�n para obtener un usuario por ID
export const getUsuarioById = async (id: number): Promise<Usuario> => {
    // Cambi� '//' a '/Usuario/' para que el endpoint sea correcto
    const response = await apiClient.get<Usuario>(`/Usuario/${id}`);
    return response.data;
};

// Funci�n para crear un nuevo usuario, usando CreateUsuarioDTO
export const createUsuario = async (usuario: CreateUsuarioDTO): Promise<Usuario> => {
    // Cambi� '/Uuario' a '/Usuario' para corregir el error tipogr�fico
    const response = await apiClient.post<Usuario>('/Usuario', usuario);
    return response.data;
};

// Funci�n para actualizar un usuario por ID, usando Partial<Usuario>
export const updateUsuario = async (id: number, usuario: Partial<Usuario>): Promise<void> => {
    // Asegur�ndome de que '/usuario' est� en may�scula para ser consistente
    await apiClient.put(`/Usuario/${id}`, usuario);
};

// Funci�n para eliminar un usuario por ID
export const deleteUsuario = async (id: number): Promise<void> => {
    // Asegur�ndome de que '/usuario' est� en may�scula para ser consistente
    await apiClient.delete(`/Usuario/${id}`);
};
