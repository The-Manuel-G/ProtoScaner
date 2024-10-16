// src/services/TomaMedidasEscaneoService.ts
import apiClient from '../api/client';

// Función para obtener todas las tomas de medidas de escaneo
export const getTomasMedidasEscaneo = async () => {
    const response = await apiClient.get('/TomaMedidasEscaneo');
    return response.data;
};

// Función para obtener una toma de medidas de escaneo específica por ID
export const getTomaMedidasEscaneo = async (id: number) => {
    const response = await apiClient.get(`/TomaMedidasEscaneo/${id}`);
    return response.data;
};

// Función para crear una nueva toma de medidas de escaneo
export const createTomaMedidasEscaneo = async (tomaMedidasEscaneo: {
    idPaciente: number;
    idAmputacion: number;
    idLiner: number;
    fechaEscaneo: string; // o Date si tu cliente lo admite
    comentario: string;
    resultadoScaneo: string;
}) => {
    const response = await apiClient.post('/TomaMedidasEscaneo', tomaMedidasEscaneo);
    return response.data;
};

// Función para actualizar una toma de medidas de escaneo existente
export const updateTomaMedidasEscaneo = async (id: number, tomaMedidasEscaneo: {
    idPaciente: number;
    idAmputacion: number;
    idLiner: number;
    fechaEscaneo: string; // o Date
    comentario: string;
    resultadoScaneo: string;
}) => {
    const response = await apiClient.put(`/TomaMedidasEscaneo/${id}`, tomaMedidasEscaneo);
    return response.data;
};

// Función para eliminar una toma de medidas de escaneo por ID
export const deleteTomaMedidasEscaneo = async (id: number) => {
    const response = await apiClient.delete(`/TomaMedidasEscaneo/${id}`);
    return response.data;
};
