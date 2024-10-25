// src/types/Insidencia.ts
export interface Insidencia {
    idInsidencias: number;
    idEntregas?: number;
    idPaciente?: number;
    idProtesis?: number;
    idUsuario?: number;
    componentes?: string;
    fecha?: string; // o Date si tu aplicación maneja bien el tipo Date en lugar de string
    descripcion?: string;
}
