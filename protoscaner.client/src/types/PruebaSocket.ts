// src/types/PruebaSocket.ts

export interface PruebaSocket {
    idPrueba: number;
    idPaciente: number;
    ModificacionGeneral: string;
    QuienLaHizo: string;
    FechaPrueba: string;
    PracticaMarcha: string;
    FechaMantenimientoPostEntrega: string;
    SocketFallo: string;
    FechaFallo: string;
    MaterialRellenoUsado: string;
    IdComponente: number;
    IdUsuario: number;
    IdSocket: number;
    PracticaRecibida: string;
    DuracionTerapia: string;
    FechaPractica: string;
}
