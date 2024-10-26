// src/services/MedidaTransfemoralService.ts
import apiClient from '../api/client';

// Funci�n para obtener todas las medidas de transfemoral
export const getMedidasTransfemoral = async () => {
    const response = await apiClient.get('/MedidaTransfemoral');
    return response.data;
};

// Funci�n para obtener una medida de transfemoral espec�fica por ID
export const getMedidaTransfemoral = async (id: number) => {
    const response = await apiClient.get(`/MedidaTransfemoral/${id}`);
    return response.data;
};

// Funci�n para crear una nueva medida de transfemoral
export const createMedidaTransfemoral = async (medida: {
    idEscaneo: number;
    idValor: number;
    idPaciente: number;
    fotoMunon: string;
    fechaEscaneo: string;
    disenadorSocket: string;
    longitudPie: number;
    alturaTalon: number;
    medida1: number;
    medida2: number;
    idLiner: number;
}) => {
    const response = await apiClient.post('/MedidaTransfemoral', medida);
    return response.data;
};

// Funci�n para actualizar una medida de transfemoral existente
export const updateMedidaTransfemoral = async (id: number, medida: {
    idEscaneo: number;
    idValor: number;
    idPaciente: number;
    fotoMunon: string;
    fechaEscaneo: string;
    disenadorSocket: string;
    longitudPie: number;
    alturaTalon: number;
    medida1: number;
    medida2: number;
    idLiner: number;
}) => {
    const response = await apiClient.put(`/MedidaTransfemoral/${id}`, medida);
    return response.data;
};

// Funci�n para eliminar una medida de transfemoral por ID
export const deleteMedidaTransfemoral = async (id: number) => {
    const response = await apiClient.delete(`/MedidaTransfemoral/${id}`);
    return response.data;
};
