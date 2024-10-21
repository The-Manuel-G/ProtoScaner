// src/services/TranstibialPruebaService.ts
import apiClient from '../api/client';

export const getTranstibialPruebas = async () => {
    const response = await apiClient.get('/TranstibialPrueba');
    return response.data;
};

export const getTranstibialPrueba = async (id: number) => {
    const response = await apiClient.get(`/TranstibialPrueba/${id}`);
    return response.data;
};

export const createTranstibialPrueba = async (prueba: {
    idPaciente: number;
    fechaEscaneo: string; // o Date si tu cliente lo admite
    protesista: string;
    // Otros campos necesarios
}) => {
    const response = await apiClient.post('/TranstibialPrueba', prueba);
    return response.data;
};

export const updateTranstibialPrueba = async (id: number, prueba: {
    idPaciente: number;
    fechaEscaneo: string;
    protesista: string;
    // Otros campos necesarios
}) => {
    const response = await apiClient.put(`/TranstibialPrueba/${id}`, prueba);
    return response.data;
};

export const deleteTranstibialPrueba = async (id: number) => {
    const response = await apiClient.delete(`/TranstibialPrueba/${id}`);
    return response.data;
};
