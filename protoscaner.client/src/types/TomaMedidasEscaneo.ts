// src/types/TomaMedidasEscaneo.ts

export interface TomaMedidasEscaneo {
    IdEscaneo?: number;
    IdPaciente: number;
    IdAmputacion: number;
    IdLiner: number;
    FechaEscaneo: string; // ISO Date string
    Comentario: string;
    ResultadoScaneo: string;
}
