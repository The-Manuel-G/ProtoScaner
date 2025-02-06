// src/types/CreateMedidaTransfemoral.ts

export interface CreateCircunferencia {
    IdValor: number;
    NumeroCircunferencia: number;
    ValorMmSinPresion: number;
    ValorMmConPresion: number;
}

export interface CreateMedidaTransfemoral {
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
    Circunferencias: CreateCircunferencia[];
}
