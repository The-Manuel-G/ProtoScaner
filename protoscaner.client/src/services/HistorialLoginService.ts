// src/services/HistorialLoginService.ts
import apiClient from '../api/client';

// Funci�n para obtener todos los registros de historial de logins
export const getHistorialLogins = async () => {
    const response = await apiClient.get('/HistorialLogin');
    return response.data;
};

// Funci�n para obtener un registro espec�fico de historial de login por ID
export const getHistorialLogin = async (id: number) => {
    const response = await apiClient.get(`/HistorialLogin/${id}`);
    return response.data;
};

// Funci�n para crear un nuevo registro de historial de login
export const createHistorialLogin = async (historialLogin: {
    idUsuario: number;
    fechaLogin: Date;
    direccion: string;
    dispositivo: string;
    exito: boolean;
}) => {
    const response = await apiClient.post('/HistorialLogin', historialLogin);
    return response.data;
};

// Funci�n para actualizar un registro de historial de login existente
export const updateHistorialLogin = async (id: number, historialLogin: {
    idUsuario: number;
    fechaLogin: Date;
    direccion: string;
    dispositivo: string;
    exito: boolean;
}) => {
    const response = await apiClient.put(`/HistorialLogin/${id}`, historialLogin);
    return response.data;
};

// Funci�n para eliminar un registro de historial de login por ID
export const deleteHistorialLogin = async (id: number) => {
    const response = await apiClient.delete(`/HistorialLogin/${id}`);
    return response.data;
};
