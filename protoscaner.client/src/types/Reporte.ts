export interface EstatusPaciente {
    estatus: string;
    cantidad: number;
}

export interface GeneroDistribucion {
    genero: string;
    cantidad: number;
}

export interface PacientesPorProvincia {
    provincia: string;
    cantidad: number;
}

export interface GenerosPorProvincia {
    hombres: any;
    mujeres: any;
    provincia: string;
    generos: { [genero: string]: number }; // Diccionario de género y cantidad
}

export interface PacientesPorEstatusProtesis {
    [x: string]: any;
    estatusId: number | null;
    cantidad: number;
}

export interface HistorialIngresos {
    fecha: string; // Fecha en formato ISO
    cantidad: number;
}

export interface CausaFiltrada {
    causa: string;
    genero: string;
    tipoAmputacion: string;
    ladoAmputacion: string;
    cantidad: number;
}

export interface TiposAmputacion {
    tipoAmputacion: string;
    ladoAmputacion: string;
    genero: string;
    cantidad: number;
}

export interface DistribucionCausas {
    causa: string;
    cantidad: number;
}

export interface DistribucionEdad {
    rangoEdad: string;
    cantidad: number;
}

export interface MantenimientosActivos {
    totalMantenimientosActivos: number;
}

export interface TotalPacientes {
 
    totalPacientes: number;
}

export interface GeneroTipoProtesis {
    genero: string;
    tiposProtesis: { [tipoProtesis: string]: number }; // Diccionario de tipos de prótesis y cantidad
}

export interface PacientesEstatus {
    estatus: string;
    cantidad: number;
}


// src/types/Reporte.ts

export interface MantenimientosActivosResponse {
    TotalMantenimientosActivos: number;
}
