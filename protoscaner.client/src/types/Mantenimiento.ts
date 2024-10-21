// src/types/Mantenimiento.ts
export interface Mantenimiento {
    idMantenimiento: number;
    idPaciente?: number;
    idProtesis?: number;
    fechaMantenimiento?: string; // Puedes usar 'Date' si el cliente lo admite
    imagenFallo1?: Uint8Array; // En TypeScript, byte[] generalmente se representa como Uint8Array
    imagenFallo2?: Uint8Array;
    idSocket?: number;
    numSocketsFabricados?: number;
    nuevasMedidas?: number;
    idComponentes?: number;
}
