// src/services/PruebaSocketService.ts
import apiClient from '../api/client';

// Función para obtener todas las pruebas de socket
export const getPruebaSockets = async () => {
    const response = await apiClient.get('/pruebaSocket');
    return response.data;
};

// Función para obtener una prueba de socket específica por ID
export const getPruebaSocket = async (id: number) => {
    const response = await apiClient.get(`/pruebaSocket/${id}`);
    return response.data;
};

// Función para crear una nueva prueba de socket
export const createPruebaSocket = async (pruebaSocket: {
    idPaciente: number;
    modificacionGeneral: string;
    quienLaHizo: string;
    fechaPrueba: string;
    practicaMarcha: string;
    fechaMantenimientoPostEntrega: string;
    socketFallo: string;
    fechaFallo: string;
    materialRellenoUsado: string;
    idComponente: number;
    idUsuario: number;
    idSocket: number;
    practicaRecibida: string;
    duracionTerapia: string;
    fechaPractica: string;
}) => {
    const response = await apiClient.post('/pruebaSocket', pruebaSocket);
    return response.data;
};

// Función para actualizar una prueba de socket existente
export const updatePruebaSocket = async (id: number, pruebaSocket: {
    idPaciente: number;
    modificacionGeneral: string;
    quienLaHizo: string;
    fechaPrueba: string;
    practicaMarcha: string;
    fechaMantenimientoPostEntrega: string;
    socketFallo: string;
    fechaFallo: string;
    materialRellenoUsado: string;
    idComponente: number;
    idUsuario: number;
    idSocket: number;
    practicaRecibida: string;
    duracionTerapia: string;
    fechaPractica: string;
}) => {
    const response = await apiClient.put(`/pruebaSocket/${id}`, pruebaSocket);
    return response.data;
};

// Función para eliminar una prueba de socket por ID
export const deletePruebaSocket = async (id: number) => {
    const response = await apiClient.delete(`/pruebaSocket/${id}`);
    return response.data;
};
