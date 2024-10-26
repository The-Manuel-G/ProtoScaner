// src/types/HistorialLogin.ts
export interface HistorialLogin {
    idHistorial: number;
    idUsuario?: number;
    fechaLogin: Uint8Array; // Representa byte[] en TypeScript
    direccion?: string;
    dispositivo?: string;
    exito?: boolean;
}
