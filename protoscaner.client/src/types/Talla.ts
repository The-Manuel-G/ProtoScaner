// src/types/Talla.ts

export interface TallaDTO {
    IdTalla: number;
    TallaNombre: string;
    TipoAmputacionId: number;
    PacienteId?: number;
}

export interface Talla extends TallaDTO {
    // Puedes agregar relaciones si es necesario
}
