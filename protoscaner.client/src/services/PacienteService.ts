// src/services/PacienteService.ts

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

// Utility function to ensure image is in base64
const ensureBase64 = async (image: string | Blob): Promise<string | null> => {
    if (typeof image === 'string') {
        // Si la cadena comienza con 'data:image', elimina el prefijo
        if (image.startsWith('data:image')) {
            return image.replace(/^data:image\/[a-z]+;base64,/, '');
        }
        // Asume que ya es una cadena base64 sin prefijo
        return image;
    } else if (image instanceof Blob) {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result?.toString().split(',')[1] || null);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(image);
        });
    }
    return null;
};

// Create patient ensuring fotoPaciente is in base64
export const createPaciente = async (data: { Paciente: Omit<Paciente, 'idPaciente'>, Historial: Omit<HistorialPacienteIngreso, 'idHistorial' | 'idPaciente'> }): Promise<Paciente> => {
    try {
        const { Paciente, Historial } = data;

        // Convierte la imagen a base64 si está presente
        const fotoBase64 = Paciente.fotoPaciente
            ? await ensureBase64(Paciente.fotoPaciente)
            : null;

        // Construye el payload de paciente y asigna la imagen en base64 si existe
        const pacientePayload = {
            ...Paciente,
            fotoPaciente: fotoBase64
        };

        console.log('Creando paciente:', { Paciente: pacientePayload, Historial });

        // Envía la solicitud al backend
        const response = await apiClient.post('/pacientes', { Paciente: pacientePayload, Historial: Historial });

        return response.data;
    } catch (error: any) {
        console.error('Error al crear el paciente:', error.response?.data || error);
        throw error;
    }
};

// Update patient ensuring fotoPaciente is in base64
export const updatePaciente = async (
    id: number,
    paciente: Paciente,
    historial?: HistorialPacienteIngreso
): Promise<void> => {
    try {
        const fotoBase64 = paciente.fotoPaciente
            ? await ensureBase64(paciente.fotoPaciente)
            : null;

        const pacientePayload = {
            ...paciente,
            fotoPaciente: fotoBase64
        };

        console.log(`Actualizando paciente con ID ${id}:`, { Paciente: pacientePayload, Historial: historial }); // Log para depuración

        // Asegurarse de usar las mismas claves que en createPaciente
        await apiClient.put(`/pacientes/${id}`, { Paciente: pacientePayload, Historial: historial });
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



// Funciones para avanzar y retroceder estatus de paciente
export const avanzarEstatusPaciente = async (id: number): Promise<void> => {
    try {
        await apiClient.put(`/pacientes/${id}/avanzarEstatusPaciente`);
    } catch (error) {
        console.error(`Error al avanzar el estatus de paciente con ID ${id}:`, error);
        throw error;
    }
};

export const retrocederEstatusPaciente = async (id: number): Promise<void> => {
    try {
        await apiClient.put(`/pacientes/${id}/retrocederEstatusPaciente`);
    } catch (error) {
        console.error(`Error al retroceder el estatus de paciente con ID ${id}:`, error);
        throw error;
    }
};

// Funciones para avanzar y retroceder estatus de prótesis
export const avanzarEstatusProtesis = async (id: number): Promise<void> => {
    try {
        await apiClient.put(`/pacientes/${id}/avanzarEstatusProtesis`);
    } catch (error) {
        console.error(`Error al avanzar el estatus de prótesis con ID ${id}:`, error);
        throw error;
    }
};

export const retrocederEstatusProtesis = async (id: number): Promise<void> => {
    try {
        await apiClient.put(`/pacientes/${id}/retrocederEstatusProtesis`);
    } catch (error) {
        console.error(`Error al retroceder el estatus de prótesis con ID ${id}:`, error);
        throw error;
    }
};