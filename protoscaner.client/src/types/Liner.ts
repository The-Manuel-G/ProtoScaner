// src/types/Liner.ts

import { Paciente } from "./Paciente";
import { TallaDTO } from "./Talla";
import { TipoLinerDTO } from "./TipoLiner";

export interface LinerDTO {
    IdLiner: number;
    TipoLinerId: number;
    TallaId: number;
    PacienteId?: number;
}

export interface Liner extends LinerDTO {
    TipoLiner: TipoLinerDTO;
    Talla: TallaDTO;
    Paciente: Paciente;
}
