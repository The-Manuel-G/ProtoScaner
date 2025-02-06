// src/types/Paciente.ts

import { HistorialPacienteIngreso } from './HistorialPacienteIngreso';

export interface Paciente {
    idPaciente: number;
    nombreCompleto?: string;
    cedula?: string;
    codigoPaciente?: string; // Nuevo campo agregado
    genero?: number; // Acepta null
    fechaNacimiento?: string;
    direccion?: string;
    telefono?: string;
    telefonoCelular?: string;
    idProvincia?: number | null; // Acepta null
    sector?: string;
    insidencia?: boolean;
    idEstatusPaciente?: number;
    idEstatusProtesis?: number;
    comentario?: string;
    fotoPaciente?: string;
    fechaIngreso?: string; // Nuevo campo agregado

    historialPacienteIngresos?: HistorialPacienteIngreso[];
}

export { HistorialPacienteIngreso };
