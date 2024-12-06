// src/services/HistorialPacienteIngresoService.ts

import apiClient from '../api/client';
import { HistorialPacienteIngresoDTO } from '../types/HistorialPacienteIngreso';

// Función para obtener el historial por idPaciente
export const getHistorialPacienteIngresoByPacienteId = async (idPaciente: number): Promise<HistorialPacienteIngresoDTO> => {
    const response = await apiClient.get(`/historialpacienteingreso/paciente/${idPaciente}`);
    return response.data;
};
