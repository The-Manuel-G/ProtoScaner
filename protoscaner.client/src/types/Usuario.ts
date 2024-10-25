

// src/types/Usuario.ts en el frontend
export interface Usuario {
    idUsuario: number;
    nombreUsuario: string;
    email: string;
    passwordHash: string;
    idRol?: number;
    fechaCreacion?: string;
    activo?: boolean;
}

// Para la creación de usuario (sin idUsuario)
export type CreateUsuarioDTO = Omit<Usuario, 'idUsuario'>;
