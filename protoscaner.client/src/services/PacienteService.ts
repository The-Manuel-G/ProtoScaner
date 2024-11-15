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
    if (typeof image === 'string' && image.startsWith('data:image')) {
        return image.split(',')[1]; // Already in base64 format
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
export const createPaciente = async (paciente: Omit<Paciente, 'idPaciente'>, historial?: HistorialPacienteIngreso): Promise<Paciente> => {
    try {
        // Convierte la imagen a base64 si está presente
        const fotoBase64 = paciente.fotoPaciente
            ? await ensureBase64(paciente.fotoPaciente)
            : null;

        // Construye el payload de paciente y asigna la imagen en base64 si existe
        const pacientePayload = {
            ...paciente,
            fotoPaciente: fotoBase64
        };

        // Asegúrate de que las propiedades sean 'Paciente' y 'Historial' como espera el backend
        const response = await apiClient.post('/pacientes', { Paciente: pacientePayload, Historial: historial });

        return response.data;
    } catch (error: any) {
        console.error('Error al crear el paciente:', error.response?.data || error);
        throw error;
    }
};

// Update patient ensuring fotoPaciente is in base64
export const updatePaciente = async (id: number, paciente: Paciente, historial?: HistorialPacienteIngreso): Promise<void> => {
    try {
        const fotoBase64 = paciente.fotoPaciente
            ? await ensureBase64(paciente.fotoPaciente)
            : null;

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
