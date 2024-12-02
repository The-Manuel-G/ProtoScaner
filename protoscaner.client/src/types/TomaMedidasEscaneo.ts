// src/types/TomaMedidasEscaneo.ts
export interface TomaMedidasEscaneo {
    idEscaneo: number;
    idPaciente: number;
    idAmputacion: number;
    idLiner: number;
    fechaEscaneo: string;  // Usa Date si tu aplicación cliente lo soporta
    fotosMunon: string;
    comentario?: string;
    resultadoScaneo: string;
    resultadoDoc: Uint8Array;
}
