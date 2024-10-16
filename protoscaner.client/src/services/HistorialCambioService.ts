// src/services/HistorialCambioService.ts
import apiClient from '../api/client';

// Funci�n para obtener todos los registros de historial de cambios
export const getHistorialCambios = async () => {
    const response = await apiClient.get('/HistorialCambio');
    return response.data;
};

// Funci�n para obtener un registro espec�fico de historial de cambios por ID
export const getHistorialCambio = async (id: number) => {
    const response = await apiClient.get(`/HistorialCambio/${id}`);
    return response.data;
};

// Funci�n para crear un nuevo registro de historial de cambios
export const createHistorialCambio = async (historialCambio: {
    idUsuario: number;
    tablaModificada: string;
    idRegistroModificado: number;
    operacion: string;
    valorAnterior: string;
    valorNuevo: string;
    fechaMidificacion: Date;
}) => {
    const response = await apiClient.post('/HistorialCambio', historialCambio);
    return response.data;
};

// Funci�n para actualizar un registro de historial de cambios existente
export const updateHistorialCambio = async (id: number, historialCambio: {
    idUsuario: number;
    tablaModificada: string;
    idRegistroModificado: number;
    operacion: string;
    valorAnterior: string;
    valorNuevo: string;
    fechaMidificacion: Date;
}) => {
    const response = await apiClient.put(`/HistorialCambio/${id}`, historialCambio);
    return response.data;
};

// Funci�n para eliminar un registro de historial de cambios por ID
export const deleteHistorialCambio = async (id: number) => {
    const response = await apiClient.delete(`/HistorialCambio/${id}`);
    return response.data;
};
