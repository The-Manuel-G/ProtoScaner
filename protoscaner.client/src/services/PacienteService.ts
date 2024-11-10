import apiClient from '../api/client';
import { Paciente } from '../types/Paciente';
import { HistorialPacienteIngreso } from '../types/HistorialPacienteIngreso';

// Function to get all patients
export const getPacientes = async (): Promise<Paciente[]> => {
    try {
        const response = await apiClient.get('/pacientes');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los pacientes:', error);
        throw error;
    }
};

// Function to get a patient by ID
export const getPacienteById = async (id: number): Promise<Paciente> => {
    try {
        const response = await apiClient.get(`/pacientes/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el paciente con ID ${id}:`, error);
        throw error;
    }
};

// Function to get a patient by their cedula
export const getPacienteByCedula = async (cedula: string): Promise<Paciente> => {
    try {
        const response = await apiClient.get(`/pacientes/cedula/${cedula}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el paciente con cédula ${cedula}:`, error);
        throw error;
    }
};

// Function to get patients by name
export const getPacientesByNombre = async (nombre: string): Promise<Paciente[]> => {
    try {
        const response = await apiClient.get(`/pacientes/nombre/${nombre}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener los pacientes con nombre ${nombre}:`, error);
        throw error;
    }
};

// Utility function to convert image to base64
const toBase64 = (file: Blob): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString().split(',')[1] || null);
        reader.onerror = error => reject(error);
    });
};


export const createPaciente = async (paciente: Omit<Paciente, 'idPaciente'>, historial?: HistorialPacienteIngreso): Promise<Paciente> => {
    try {
        const fotoBase64 = paciente.fotoPaciente instanceof Blob
            ? await toBase64(paciente.fotoPaciente)
            : paciente.fotoPaciente || null;

        const pacientePayload = {
            ...paciente,
            fotoPaciente: fotoBase64
        };

        const response = await apiClient.post('/pacientes', { paciente: pacientePayload, historial });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Error al crear el paciente:', error.response.data);
        } else {
            console.error('Error de conexión o desconocido al crear el paciente:', error);
        }
        throw error;
    }
};

// Function to update an existing patient by ID
export const updatePaciente = async (id: number, paciente: Paciente, historial?: HistorialPacienteIngreso): Promise<void> => {
    try {
        const fotoBase64 = paciente.fotoPaciente instanceof Blob
            ? await toBase64(paciente.fotoPaciente)
            : paciente.fotoPaciente || null;

        const pacientePayload = {
            ...paciente,
            fotoPaciente: fotoBase64
        };

        await apiClient.put(`/pacientes/${id}`, { paciente: pacientePayload, historial });
    } catch (error) {
        console.error(`Error al actualizar el paciente con ID ${id}:`, error);
        throw error;
    }
};

// Function to delete a patient by ID
export const deletePaciente = async (id: number): Promise<void> => {
    try {
        await apiClient.delete(`/pacientes/${id}`);
    } catch (error) {
        console.error(`Error al eliminar el paciente con ID ${id}:`, error);
        throw error;
    }
};
