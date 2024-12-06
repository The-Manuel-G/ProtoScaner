// src/services/ReporteService.ts

import apiClient from '../api/client';
import {
    EstatusPaciente,
    GeneroDistribucion,
    PacientesPorProvincia,
    GenerosPorProvincia,
    PacientesPorEstatusProtesis,
    HistorialIngresos,
    CausaFiltrada,
    TiposAmputacion,
    DistribucionCausas,
    DistribucionEdad,
    MantenimientosActivos,
    TotalPacientes,
    GeneroTipoProtesis,
    PacientesEstatus,
} from '../types/Reporte';

// Servicio para obtener estatus de pacientes
export const getEstatusPacientes = () =>
    apiClient.get<EstatusPaciente[]>('/reportes/estatus-pacientes');

// Servicio para obtener distribución de género
export const getDistribucionGenero = () =>
    apiClient.get<GeneroDistribucion[]>('/reportes/distribucion-genero');

// Servicio para pacientes por provincia
export const getPacientesPorProvincia = () =>
    apiClient.get<PacientesPorProvincia[]>('/reportes/pacientes-por-provincia');

// Servicio para géneros por provincia
export const getGenerosPorProvincia = () =>
    apiClient.get<GenerosPorProvincia[]>('/reportes/generos-por-provincia');

// Servicio para prótesis por estatus
export const getPacientesPorEstatusProtesis = () =>
    apiClient.get<PacientesPorEstatusProtesis[]>('/reportes/estatus-protesis-por-pacientes');

// Servicio para historial de ingresos
export const getHistorialIngresos = (anio?: number, provincia?: number) =>
    apiClient.get<HistorialIngresos[]>('/reportes/historial-ingresos', { params: { anio, provincia } });

// Servicio para causas filtradas
export const getCausasFiltradas = (
    generoId?: number,
    tipoAmputacionId?: number,
    ladoAmputacionId?: number
) =>
    apiClient.get<CausaFiltrada[]>('/reportes/causas-filtradas', {
        params: { generoId, tipoAmputacionId, ladoAmputacionId },
    });

// Servicio para tipos de amputación
export const getTiposAmputacion = (generoId?: number, ladoAmputacionId?: number) =>
    apiClient.get<TiposAmputacion[]>('/reportes/tipos-amputacion', {
        params: { generoId, ladoAmputacionId },
    });

// Servicio para distribución de edad
export const getDistribucionEdad = (
    genero?: number,
    provincia?: number,
    estatusPaciente?: number
) =>
    apiClient.get<DistribucionEdad[]>('/reportes/edad-pacientes', {
        params: { genero, provincia, estatusPaciente },
    });

// Servicio para mantenimientos activos
export const getMantenimientosActivos = () =>
    apiClient.get<MantenimientosActivos>('/reportes/mantenimientos-activos');



// Servicio para total de pacientes
export const getTotalPacientes = () =>
    apiClient.get<TotalPacientes>('/reportes/total-pacientes');

// Servicio para distribución de causas
export const getDistribucionCausas = (
    tipoAmputacion?: number,
    ladoAmputacion?: number,
    genero?: number
) =>
    apiClient.get<DistribucionCausas[]>('/reportes/causas-amputacion', {
        params: { tipoAmputacion, ladoAmputacion, genero },
    });

// Servicio para género y tipo de prótesis
export const getGeneroTipoProtesis = () =>
    apiClient.get<GeneroTipoProtesis[]>('/reportes/genero-tipo-protesis');

// Servicio para contar pacientes por estatus
export const getPacientesEstatus = () =>
    apiClient.get<PacientesEstatus[]>('/reportes/estatus-paciente-contador');
