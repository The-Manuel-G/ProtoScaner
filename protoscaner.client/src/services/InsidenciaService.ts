// src/services/InsidenciaService.ts
import apiClient from '../api/client';

// Funci�n para obtener todas las insidencias
export const getInsidencias = async () => {
    const response = await apiClient.get('/Insidencias');
    return response.data;
};

// Funci�n para obtener una insidencia espec�fica por ID
export const getInsidencia = async (id: number) => {
    const response = await apiClient.get(`/Insidencias/${id}`);
    return response.data;
};

// Funci�n para crear una nueva insidencia
export const createInsidencia = async (insidencia: {
    idEntregas: number;
    idPaciente: number;
    idProtesis: number;
    idUsuario: number;
    componentes: string;
    fecha: Date;
    descripcion: string;
}) => {
    const response = await apiClient.post('/Insidencias', insidencia);
    return response.data;
};

// Funci�n para actualizar una insidencia existente
export const updateInsidencia = async (id: number, insidencia: {
    idEntregas: number;
    idPaciente: number;
    idProtesis: number;
    idUsuario: number;
    componentes: string;
    fecha: Date;
    descripcion: string;
}) => {
    const response = await apiClient.put(`/Insidencias/${id}`, insidencia);
    return response.data;
};

// Funci�n para eliminar una insidencia por ID
export const deleteInsidencia = async (id: number) => {
    const response = await apiClient.delete(`/Insidencias/${id}`);
    return response.data;
};
