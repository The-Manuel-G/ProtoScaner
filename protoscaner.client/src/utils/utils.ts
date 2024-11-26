// src/utils/utils.ts

export const getLabel = (array: { label: string; value: number }[], value: number): string => {
    return array.find(item => item.value === value)?.label || 'Desconocido';
};
