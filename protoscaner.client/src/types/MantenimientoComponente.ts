// src/types/MantenimientoComponente.ts
export interface MantenimientoComponente {
    protesisId: number;
    componentId: number;
    cantidad?: number;
    mantenimientoId?: number;
    idPaciente?: number;
    insidencia?: boolean;
    medidas?: number;
}
