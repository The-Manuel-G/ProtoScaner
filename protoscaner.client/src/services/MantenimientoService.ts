// src/services/MantenimientoService.ts
import apiClient from '../api/client';

// Función para obtener todos los mantenimientos
export const getMantenimientos = async () => {
    const response = await apiClient.get('/Mantenimiento');
    return response.data;
};

// Función para obtener un mantenimiento específico por ID
export const getMantenimiento = async (id: number) => {
    const response = await apiClient.get(`/Mantenimiento/${id}`);
    return response.data;
};

// Función para crear un nuevo mantenimiento
export const createMantenimiento = async (mantenimiento: {
    idPaciente: number;
    idProtesis: number;
    fechaMantenimiento: string;
    imagenFallo1?: string;
    imagenFallo2?: string;
    idSocket: number;
    numSocketsFabricados: number;
    nuevasMedidas: string;
    idComponentes: string;
}) => {
    const response = await apiClient.post('/Mantenimiento', mantenimiento);
    return response.data;
};

// Función para actualizar un mantenimiento existente
export const updateMantenimiento = async (id: number, mantenimiento: {
    idPaciente: number;
    idProtesis: number;
    fechaMantenimiento: string;
    imagenFallo1?: string;
    imagenFallo2?: string;
    idSocket: number;
    numSocketsFabricados: number;
    nuevasMedidas: string;
    idComponentes: string;
}) => {
    const response = await apiClient.put(`/Mantenimiento/${id}`, mantenimiento);
    return response.data;
};

// Función para eliminar un mantenimiento por ID
export const deleteMantenimiento = async (id: number) => {
    const response = await apiClient.delete(`/Mantenimiento/${id}`);
    return response.data;
};
