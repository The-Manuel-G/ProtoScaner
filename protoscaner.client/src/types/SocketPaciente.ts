// src/types/SocketPaciente.ts
export interface SocketPaciente {
    idSocket: number;
    idPaciente?: number;
    descripcion?: string;
    fechaCreacion?: string; // Usamos string para la fecha para facilitar el manejo; considera `Date` si es compatible con tu lógica.
    tamaño?: string;
}
