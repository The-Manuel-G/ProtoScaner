import apiClient from '../api/client';
import { Rol } from '../types/Rol'; // Importamos el tipo Rol

// Funci�n para obtener todos los roles
export const getRoles = async (): Promise<Rol[]> => {
    const response = await apiClient.get<Rol[]>('/rol');
    return response.data;
};

// Funci�n para obtener un rol espec�fico por ID
export const getRol = async (id: number): Promise<Rol> => {
    const response = await apiClient.get<Rol>(`/rol/${id}`);
    return response.data;
};

// Funci�n para crear un nuevo rol
export const createRol = async (rol: Rol): Promise<Rol> => {
    const response = await apiClient.post<Rol>('/rol', rol);
    return response.data;
};

// Funci�n para actualizar un rol existente
export const updateRol = async (id: number, rol: Rol): Promise<Rol> => {
    const response = await apiClient.put<Rol>(`/rol/${id}`, rol);
    return response.data;
};

// Funci�n para eliminar un rol por ID
export const deleteRol = async (id: number): Promise<void> => {
    await apiClient.delete(`/rol/${id}`);
};
