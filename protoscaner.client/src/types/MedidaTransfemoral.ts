// src/types/MedidaTransfemoral.ts

export interface MedidaTransfemoral {
    IdMedidaT: number;
    IdEscaneo: number;
    IdValor: number;
    IdPaciente: number;
    FotoMunon: string; // Base64
    FechaEscaneo: string; // ISO Date string
    DisenadorSocket: string;
    LongitudPie: number;
    AlturaTalon: number;
    Medida1: number;
    Medida2: number;
    IdLiner: number;
    Circunferencias: Array<{
        IdMedida: number;
        IdValor: number;
        NumeroCircunferencia: number;
        ValorMmSinPresion: number;
        ValorMmConPresion: number;
    }>;
}
