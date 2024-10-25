// src/types/TomaMedidasEscaneo.ts
export interface TomaMedidasEscaneo {
    idEscaneo: number;
    idPaciente?: number;
    idAmputacion?: number;
    idLiner?: number;
    fechaEscaneo?: string;  // Usa Date si tu aplicación cliente lo soporta
    fotosMunon?: Uint8Array;
    comentario?: string;
    resultadoScaneo?: string;
    resultadoDoc?: Uint8Array;
}
