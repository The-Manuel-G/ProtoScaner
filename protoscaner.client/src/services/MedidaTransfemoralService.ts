// src/services/MedidaTransfemoralService.ts
import apiClient from '../api/client';

// Función para obtener todas las medidas de transfemoral
export const getMedidasTransfemoral = async () => {
    const response = await apiClient.get('/MedidaTransfemoral');
    return response.data;
};

// Función para obtener una medida de transfemoral específica por ID
export const getMedidaTransfemoralById = async (id: number) => {
    const response = await apiClient.get(`/MedidaTransfemoral/${id}`);
    return response.data;
};

// Función para crear una nueva medida de transfemoral
export const createMedidaTransfemoral = async (medida: {
    idEscaneo: number;
    idValor: number;
    idPaciente: number;
    fotoMunon: string; // Debe ser base64 si es una imagen
    fechaEscaneo: string; // Fecha en formato ISO (e.g., "2024-11-13T00:00:00")
    disenadorSocket: string;
    longitudPie: number;
    alturaTalon: number;
    medida1: number;
    medida2: number;
    idLiner: number;
    circunferencias: Array<{
        idMedida: number;
        idValor: number;
        numeroCircunferencia: number;
        valorMm: number;
    }>;
}) => {
    const response = await apiClient.post('/MedidaTransfemoral', medida);
    return response.data;
};

// Función para actualizar una medida de transfemoral existente
export const updateMedidaTransfemoral = async (
    id: number,
    medida: {
        idEscaneo: number;
        idValor: number;
        idPaciente: number;
        fotoMunon: string; // Base64
        fechaEscaneo: string;
        disenadorSocket: string;
        longitudPie: number;
        alturaTalon: number;
        medida1: number;
        medida2: number;
        idLiner: number;
        circunferencias: Array<{
            idMedida: number;
            idValor: number;
            numeroCircunferencia: number;
            valorMm: number;
        }>;
    }
) => {
    const response = await apiClient.put(`/MedidaTransfemoral/${id}`, medida);
    return response.data;
};

// Función para eliminar una medida de transfemoral por ID
export const deleteMedidaTransfemoral = async (id: number) => {
    const response = await apiClient.delete(`/MedidaTransfemoral/${id}`);
    return response.data;
};
