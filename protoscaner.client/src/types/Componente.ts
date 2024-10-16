// src/types/Componente.ts
export interface Componente {
    componentId: number;
    componentTipoId?: number;
    codigo?: string;
    description: string;
    // Colecciones no incluidas para mantener el tipo ligero
}
