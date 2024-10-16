// src/types/PruebaSocket.ts
export interface PruebaSocket {
    idPrueba: number;
    idPaciente?: number;
    modificacionGeneral?: string;
    quienLaHizo?: string;
    fechaPrueba?: string;  // Usamos `string` para representar fechas en ISO o Date si el cliente lo admite
    practicaMarcha?: boolean;
    fechaMantenimientoPostEntrega?: string;
    socketFallo?: boolean;
    fechaFallo?: string;
    materialRellenoUsado?: string;
    idComponente?: number;
    idUsuario?: number;
    idSocket?: number;
    practicaRecibida?: boolean;
    duracionTerapia?: string;
    fechaPractica?: string;
}
