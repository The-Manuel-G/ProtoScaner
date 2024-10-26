// src/types/HistorialCambio.ts
export interface HistorialCambio {
    idHistorial: number;
    idUsuario?: number;
    tablaModificada?: string;
    idRegistroModificado?: number;
    operacion?: string;
    valorAnterior?: string;
    valorNuevo?: string;
    fechaModificacion: Uint8Array; // Utilizamos Uint8Array para representar byte[]
}
