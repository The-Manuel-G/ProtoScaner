// src/types/Paciente.ts
export interface Paciente {
    idPaciente: number;
    nombreCompleto?: string;
    cedula?: string;
    genero?: number;
    fechaNacimiento?: Date; // o Date si prefieres trabajar con fechas directamente
    direccion?: string;
    telefono?: string;
    telefonoCelular?: string;
    idProvincia?: number;
    sector?: string;
    insidencia?: boolean;
    idEstatusPaciente?: number;
    idEstatusProtesis?: number;
    comentario?: string;
    fotoPaciente?: Uint8Array; // para manejar imágenes en formato binario
}
