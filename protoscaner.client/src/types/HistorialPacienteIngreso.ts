// src/types/HistorialPacienteIngreso.ts
export interface HistorialPacienteIngreso {
    idHistorial: number;
    idPaciente?: number;
    tipoAmputacion?: number;
    ladoAmputacion?: number;
    fechaAmputacion?: string; // Date en TypeScript, pero con el tipo string para JSON compatible
    causa?: number;
    terapia?: boolean;
    tiempoTerapia?: string;
    idMedida?: number;
    comentario?: string;
}
