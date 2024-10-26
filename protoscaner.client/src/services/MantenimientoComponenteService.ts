// src/services/MantenimientoComponenteService.ts
import apiClient from '../api/client';

// Funci�n para obtener todos los mantenimientos de componentes
export const getMantenimientosComponentes = async () => {
    const response = await apiClient.get('/MantenimientoComponente');
    return response.data;
};

// Funci�n para obtener un mantenimiento de componente espec�fico por ID
export const getMantenimientoComponente = async (id: number) => {
    const response = await apiClient.get(`/MantenimientoComponente/${id}`);
    return response.data;
};

// Funci�n para crear un nuevo mantenimiento de componente
export const createMantenimientoComponente = async (mantenimientoComponente: {
    protesisId: number;
    componentId: number;
    cantidad: number;
    mantenimientoId: number;
    idPaciente: number;
    insidencia: string;
    medidas: string;
}) => {
    const response = await apiClient.post('/MantenimientoComponente', mantenimientoComponente);
    return response.data;
};

// Funci�n para actualizar un mantenimiento de componente existente
export const updateMantenimientoComponente = async (id: number, mantenimientoComponente: {
    cantidad: number;
    idPaciente: number;
    insidencia: string;
    medidas: string;
}) => {
    const response = await apiClient.put(`/MantenimientoComponente/${id}`, mantenimientoComponente);
    return response.data;
};

// Funci�n para eliminar un mantenimiento de componente por ID
export const deleteMantenimientoComponente = async (id: number) => {
    const response = await apiClient.delete(`/MantenimientoComponente/${id}`);
    return response.data;
};
