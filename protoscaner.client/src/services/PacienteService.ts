// src/services/PacienteService.ts
import apiClient from '../api/client';

// Función para obtener todos los pacientes
export const getPacientes = async () => {
    const response = await apiClient.get('/paciente');
    return response.data;
};

// Función para obtener un paciente por su ID
export const getPacienteById = async (id: number) => {
    const response = await apiClient.get(`/paciente/${id}`);
    return response.data;
};

// Función para obtener un paciente por su cédula
export const getPacienteByCedula = async (cedula: string) => {
    const response = await apiClient.get(`/paciente/cedula/${cedula}`);
    return response.data;
};

// Función para crear un nuevo paciente
export const createPaciente = async (paciente: {
    nombreCompleto: string;
    cedula: string;
    genero: string;
    fechaNacimiento: string;
    direccion: string;
    telefono: string;
    telefonoCelular: string;
    idProvincia: number;
    sector: string;
    insidencia: string;
    idEstatusPaciente: number;
    idEstatusProtesis: number;
    comentario: string;
    fotoPaciente: string;
}) => {
    const response = await apiClient.post('/paciente', paciente);
    return response.data;
};

// Función para actualizar un paciente existente por ID
export const updatePaciente = async (id: number, paciente: {
    nombreCompleto: string;
    cedula: string;
    genero: string;
    fechaNacimiento: string;
    direccion: string;
    telefono: string;
    telefonoCelular: string;
    idProvincia: number;
    sector: string;
    insidencia: string;
    idEstatusPaciente: number;
    idEstatusProtesis: number;
    comentario: string;
    fotoPaciente: string;
}) => {
    const response = await apiClient.put(`/paciente/${id}`, paciente);
    return response.data;
};

// Función para eliminar un paciente por ID
export const deletePaciente = async (id: number) => {
    const response = await apiClient.delete(`/paciente/${id}`);
    return response.data;
};
