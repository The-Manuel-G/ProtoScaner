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


// src/types/HistorialPacienteIngreso.ts

export interface HistorialPacienteIngresoDTO {
    IdHistorial: number;
    IdPaciente: number;
    TipoAmputacion: number; // 1: Transtibial, 2: Transfemoral
    LadoAmputacion: string;
    FechaAmputacion: string; // ISO Date string
    Causa: string;
    Terapia: string;
    TiempoTerapia: number;
    IdMedida: number;
    Comentario: string;
}
