// src/types/Protesi.ts
export interface Protesi {
    idProtesis: number;
    linerTipo?: number;
    linerTamano?: number;
    protesista?: string;
    fechaEntrega?: Date; // Cambiado a Date para mejor manejo de fechas
    material?: string;
}
