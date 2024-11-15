// src/types/Paciente.ts
import { HistorialPacienteIngreso } from './HistorialPacienteIngreso';
export interface Paciente {
    idPaciente: number;
    nombreCompleto?: string;
    cedula?: string;
    genero?: number | null; // Cambiado a aceptar null
    fechaNacimiento?: string ;
    direccion?: string;
    telefono?: string;
    telefonoCelular?: string;
    idProvincia?: number | null; // Cambiado a aceptar null
    sector?: string;
    insidencia?: boolean;
    idEstatusPaciente?: number;
    idEstatusProtesis?: number;
    comentario?: string;
    fotoPaciente?: string;

    historialPacienteIngresos?: HistorialPacienteIngreso[];
}
