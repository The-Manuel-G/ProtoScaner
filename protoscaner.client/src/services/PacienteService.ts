// src/services/PacienteService.ts
import apiClient from '../api/client';
import { Paciente } from '../types/Paciente';

// Funci�n para obtener todos los pacientes
export const getPacientes = async (): Promise<Paciente[]> => {
    try {
        const response = await apiClient.get('/paciente');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los pacientes:', error);
        throw error;
    }
};

// Funci�n para obtener un paciente por su ID
export const getPacienteById = async (id: number): Promise<Paciente> => {
    try {
        const response = await apiClient.get(`/paciente/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el paciente con ID ${id}:`, error);
        throw error;
    }
};

// Funci�n para obtener un paciente por su c�dula
export const getPacienteByCedula = async (cedula: string): Promise<Paciente> => {
    try {
        const response = await apiClient.get(`/paciente/cedula/${cedula}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el paciente con c�dula ${cedula}:`, error);
        throw error;
    }
};

// Funci�n para obtener pacientes por nombre
export const getPacientesByNombre = async (nombre: string): Promise<Paciente[]> => {
    try {
        const response = await apiClient.get(`/paciente/nombre/${nombre}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener los pacientes con nombre ${nombre}:`, error);
        throw error;
    }
};

// Funci�n para crear un nuevo paciente
export const createPaciente = async (paciente: Paciente): Promise<Paciente> => {
    try {
        const response = await apiClient.post('/paciente', paciente);
        return response.data;
    } catch (error) {
        console.error('Error al crear el paciente:', error);
        throw error;
    }
};

// Funci�n para actualizar un paciente existente por ID
export const updatePaciente = async (id: number, paciente: Paciente): Promise<Paciente> => {
    try {
        const response = await apiClient.put(`/paciente/${id}`, paciente);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el paciente con ID ${id}:`, error);
        throw error;
    }
};

// Funci�n para eliminar un paciente por ID
export const deletePaciente = async (id: number): Promise<void> => {
    try {
        await apiClient.delete(`/paciente/${id}`);
    } catch (error) {
        console.error(`Error al eliminar el paciente con ID ${id}:`, error);
        throw error;
    }
};
