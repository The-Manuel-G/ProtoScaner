// src/types/TipoLiner.ts

export interface TipoLinerDTO {
    IdTipoLiner: number;
    Descripcion: string;
}

export interface TipoLiner extends TipoLinerDTO {
    // Puedes agregar relaciones si es necesario
}
