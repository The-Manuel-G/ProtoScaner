// src/types/Entrega.ts
export interface Entrega {
    idEntregas: number;
    idPaciente?: number;
    idProtesis?: number;
    idUsuario?: number;
    reduccion?: number;
    generalModificacion?: string;
    otros?: string;
    idPruebaSocket?: number;
    insidencia?: boolean;
    materialRelleno?: string;
    fechaEntrega?: Date; // Cambiado a Date para TypeScript
    practicaMarcha?: Date;
    mantenimientoPostEntrega?: Date;
    idMantenimiento?: number;
    firmaDescargoComponenteLista?: boolean;
}
