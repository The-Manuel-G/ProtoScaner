// src/types/MedidaTransfemoral.ts
export interface MedidaTransfemoral {
    idMedidaT: number;
    idEscaneo?: number;
    idValor?: number;
    idPaciente?: number;
    fotoMunon?: Uint8Array;
    fechaEscaneo?: string; // o Date si prefieres manejar las fechas directamente
    disenadorSocket?: string;
    longitudPie?: string;
    alturaTalon?: string;
    medida1?: string;
    medida2?: string;
    idLiner?: number;
}
