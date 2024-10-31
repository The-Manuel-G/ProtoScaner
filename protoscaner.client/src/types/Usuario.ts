
// src/types/Usuario.ts

// src/types/Usuario.ts

// src/types/Usuario.ts
export interface ImagenPerfilDTO {
    idImagen?: number; // Hacer opcional, porque el backend lo autogenerar�
    idUsuario?: number;
    imagen?: string; 
    descripcion?: string;
}



export interface Usuario {
    idUsuario: number;
    nombreUsuario: string;
    email: string;
    passwordHash: string;
    idRol?: number;
    fechaCreacion?: string;
    activo?: boolean;
    imagenPerfil?: ImagenPerfilDTO; // Imagen de perfil opcional
}

// Para la creaci�n de usuario (sin idUsuario)
export type CreateUsuarioDTO = Omit<Usuario, 'idUsuario'>;
