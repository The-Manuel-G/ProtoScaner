// src/types/Paciente.ts
export interface Paciente {
    idPaciente: number;
    nombreCompleto?: string;
    cedula?: string;
    genero?: number | null; // Cambiado a aceptar null
    fechaNacimiento?: Date | string;
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
}
