// src/types/MedidaTranstibial.ts
export interface MedidaTranstibial {
    idMedida: number;
    idPaciente?: number;
    idEscaneo?: number;
    fechaEscaneo?: string; // o Date si prefieres trabajar con fechas directamente
    protesista?: string;
    idLiner?: number;
    insidencia?: boolean;
    longitudTotalMunon?: number;
    circunferencia3cm?: number;
    circunferencia6cm?: number;
    circunferencia9cm?: number;
    circunferencia12cm?: number;
    circunferencia15cm?: number;
    circunferencia21cm?: number;
    circunferencia24cm?: number;
    circunferencia27cm?: number;
    circunferencia30cm?: number;
    mlSobreRodilla?: number;
    apTension?: number;
    mlSupracondilar?: number;
    mlTendon?: number;
    notas?: string;
    longitudOsea?: string;
    longitudPies?: string;
    alturaTacon?: string;
}
