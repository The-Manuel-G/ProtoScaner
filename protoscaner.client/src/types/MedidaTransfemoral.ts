// src/types/MedidaTransfemoral.ts

export interface MedidaTransfemoral {
    idMedidaT: number;
    idEscaneo?: number;
    idValor?: number;
    idPaciente?: number;
    fotoMunon?: string;
    fechaEscaneo?: string;
    disenadorSocket?: string;
    longitudPie?: string;
    alturaTalon?: string;
    medida1?: string;
    medida2?: string;
    idLiner?: number;
    circunferencias?: Array<{
        idMedida: number;
        idValor: number;
        numeroCircunferencia: number;
        valorMm: number;
    }>; // Added circunferencias field
}
