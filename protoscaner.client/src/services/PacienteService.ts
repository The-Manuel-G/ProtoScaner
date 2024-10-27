// src/services/PacienteService.ts
import apiClient from '../api/client';
import { Paciente } from '../types/Paciente';

// Función para obtener todos los pacientes
export const getPacientes = async (): Promise<Paciente[]> => {
    const response = await apiClient.get('/paciente');
    return response.data;
};

// Función para obtener un paciente por su ID
export const getPacienteById = async (id: number): Promise<Paciente> => {
    const response = await apiClient.get(`/paciente/${id}`);
    return response.data;
};

// Función para obtener un paciente por su cédula
export const getPacienteByCedula = async (cedula: string): Promise<Paciente> => {
    const response = await apiClient.get(`/paciente/cedula/${cedula}`);
    return response.data;
};

// Función para crear un nuevo paciente
export const createPaciente = async (paciente: Paciente): Promise<Paciente> => {
    const response = await apiClient.post('/paciente', paciente);
    return response.data;
};

// Función para actualizar un paciente existente por ID
export const updatePaciente = async (id: number, paciente: Paciente): Promise<Paciente> => {
    const response = await apiClient.put(`/paciente/${id}`, paciente);
    return response.data;
};

// Función para eliminar un paciente por ID
export const deletePaciente = async (id: number): Promise<void> => {
    await apiClient.delete(`/paciente/${id}`);
};
