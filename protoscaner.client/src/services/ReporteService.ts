// src/services/ReporteService.ts
import apiClient from '../api/client';

// Funci�n para obtener todos los reportes
export const getReportes = async () => {
    const response = await apiClient.get('/reporte');
    return response.data;
};

// Funci�n para obtener un reporte espec�fico por ID
export const getReporte = async (id: number) => {
    const response = await apiClient.get(`/reporte/${id}`);
    return response.data;
};

// Funci�n para crear un nuevo reporte
export const createReporte = async (reporte: {
    codigoPaciente: number;
    numSocketsFabricados: number;
}) => {
    const response = await apiClient.post('/reporte', reporte);
    return response.data;
};

// Funci�n para actualizar un reporte existente
export const updateReporte = async (id: number, reporte: {
    codigoPaciente: number;
    numSocketsFabricados: number;
}) => {
    const response = await apiClient.put(`/reporte/${id}`, reporte);
    return response.data;
};

// Funci�n para eliminar un reporte por ID
export const deleteReporte = async (id: number) => {
    const response = await apiClient.delete(`/reporte/${id}`);
    return response.data;
};
