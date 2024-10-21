// src/types/ImagenPerfil.ts
export interface ImagenPerfil {
    idImagen: number;
    idUsuario?: number;
    imagen?: Uint8Array; // Usamos Uint8Array para representar el tipo byte[] en TypeScript
    descripcion?: string;
}
