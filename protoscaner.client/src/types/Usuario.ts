// src/types/Usuario.ts
export interface Usuario {
    idUsuario: number;
    nombreUsuario: string;
    email: string;
    passwordHash: string;
    idRol?: number;
    fechaCreacion?: string; // Usando ISO string para la representaci�n de fecha
    activo?: boolean;
}