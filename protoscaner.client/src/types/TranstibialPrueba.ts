// src/types/TranstibialPrueba.ts
export interface TranstibialPrueba {
    idEscaneo: number;
    idPaciente?: number;
    fechaEscaneo?: string; // Cambia a Date si el cliente lo admite
    protesista?: string;
    idLiner?: number;
    idPrueba?: number;
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
