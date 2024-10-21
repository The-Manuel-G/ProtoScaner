// src/services/EntregaService.ts
import apiClient from '../api/client';

// Funci�n para obtener todas las entregas
export const getEntregas = async () => {
    const response = await apiClient.get('/Entrega');
    return response.data;
};

// Funci�n para obtener una entrega espec�fica por ID
export const getEntrega = async (id: number) => {
    const response = await apiClient.get(`/Entrega/${id}`);
    return response.data;
};

// Funci�n para crear una nueva entrega
export const createEntrega = async (entrega: {
    idPaciente: number;
    idProtesis: number;
    idUsuario: number;
    reduccion: string;
    generalModificacion: string;
    otros: string;
    idPruebaSocket: number;
    insidencia: string;
    materialRelleno: string;
    fechaEntrega: Date;
    practicaMarcha: boolean;
    mantenimientoPostEntrega: boolean;
    idMantenimiento: number;
    firmaDescargoComponenteLista: boolean;
}) => {
    const response = await apiClient.post('/Entrega', entrega);
    return response.data;
};

// Funci�n para actualizar una entrega existente
export const updateEntrega = async (id: number, entrega: {
    idPaciente: number;
    idProtesis: number;
    idUsuario: number;
    reduccion: string;
    generalModificacion: string;
    otros: string;
    idPruebaSocket: number;
    insidencia: string;
    materialRelleno: string;
    fechaEntrega: Date;
    practicaMarcha: boolean;
    mantenimientoPostEntrega: boolean;
    idMantenimiento: number;
    firmaDescargoComponenteLista: boolean;
}) => {
    const response = await apiClient.put(`/Entrega/${id}`, entrega);
    return response.data;
};

// Funci�n para eliminar una entrega por ID
export const deleteEntrega = async (id: number) => {
    const response = await apiClient.delete(`/Entrega/${id}`);
    return response.data;
};
