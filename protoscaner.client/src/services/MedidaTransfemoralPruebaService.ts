// src/services/MedidaTransfemoralPruebaService.ts
import apiClient from '../api/client';

// Función para obtener todas las medidas de transfemoral de prueba
export const getMedidasTransfemoralPrueba = async () => {
    const response = await apiClient.get('/MedidaTransfemoralPrueba');
    return response.data;
};

// Función para obtener una medida de transfemoral de prueba específica por ID
export const getMedidaTransfemoralPrueba = async (id: number) => {
    const response = await apiClient.get(`/MedidaTransfemoralPrueba/${id}`);
    return response.data;
};

// Función para crear una nueva medida de transfemoral de prueba
export const createMedidaTransfemoralPrueba = async (medida: {
    idPaciente: number;
    idPrueba: number;
    idValor: number;
    fotoMunon: string;
    fechaEscaneo: string;
    disenadorSocket: string;
    longitudPie: number;
    alturaTalon: number;
    medida1: number;
    medida2: number;
    idLiner: number;
}) => {
    const response = await apiClient.post('/MedidaTransfemoralPrueba', medida);
    return response.data;
};

// Función para actualizar una medida de transfemoral de prueba existente
export const updateMedidaTransfemoralPrueba = async (id: number, medida: {
    idPaciente: number;
    idPrueba: number;
    idValor: number;
    fotoMunon: string;
    fechaEscaneo: string;
    disenadorSocket: string;
    longitudPie: number;
    alturaTalon: number;
    medida1: number;
    medida2: number;
    idLiner: number;
}) => {
    const response = await apiClient.put(`/MedidaTransfemoralPrueba/${id}`, medida);
    return response.data;
};

// Función para eliminar una medida de transfemoral de prueba por ID
export const deleteMedidaTransfemoralPrueba = async (id: number) => {
    const response = await apiClient.delete(`/MedidaTransfemoralPrueba/${id}`);
    return response.data;
};
