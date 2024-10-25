// src/services/MedidaTranstibialService.ts
import apiClient from '../api/client';

// Funci�n para obtener todas las medidas transtibiales
export const getMedidasTranstibial = async () => {
    const response = await apiClient.get('/MedidaTranstibial');
    return response.data;
};

// Funci�n para obtener una medida transtibial espec�fica por ID
export const getMedidaTranstibial = async (id: number) => {
    const response = await apiClient.get(`/MedidaTranstibial/${id}`);
    return response.data;
};

// Funci�n para crear una nueva medida transtibial
export const createMedidaTranstibial = async (medida: {
    idPaciente: number;
    idEscaneo: number;
    fechaEscaneo: string;
    protesista: string;
    idLiner: number;
    insidencia: string;
    longitudTotalMunon: number;
    circunferencia3cm: number;
    circunferencia6cm: number;
    circunferencia9cm: number;
    circunferencia12cm: number;
    circunferencia15cm: number;
    circunferencia21cm: number;
    circunferencia24cm: number;
    circunferencia27cm: number;
    circunferencia30cm: number;
    mlSobreRodilla: number;
    apTension: number;
    mlSupracondilar: number;
    mlTendon: number;
    notas: string;
    longitudOsea: number;
    longitudPies: number;
    alturaTacon: number;
}) => {
    const response = await apiClient.post('/MedidaTranstibial', medida);
    return response.data;
};

// Funci�n para actualizar una medida transtibial existente
export const updateMedidaTranstibial = async (id: number, medida: {
    idPaciente: number;
    idEscaneo: number;
    fechaEscaneo: string;
    protesista: string;
    idLiner: number;
    insidencia: string;
    longitudTotalMunon: number;
    circunferencia3cm: number;
    circunferencia6cm: number;
    circunferencia9cm: number;
    circunferencia12cm: number;
    circunferencia15cm: number;
    circunferencia21cm: number;
    circunferencia24cm: number;
    circunferencia27cm: number;
    circunferencia30cm: number;
    mlSobreRodilla: number;
    apTension: number;
    mlSupracondilar: number;
    mlTendon: number;
    notas: string;
    longitudOsea: number;
    longitudPies: number;
    alturaTacon: number;
}) => {
    const response = await apiClient.put(`/MedidaTranstibial/${id}`, medida);
    return response.data;
};

// Funci�n para eliminar una medida transtibial por ID
export const deleteMedidaTranstibial = async (id: number) => {
    const response = await apiClient.delete(`/MedidaTranstibial/${id}`);
    return response.data;
};
