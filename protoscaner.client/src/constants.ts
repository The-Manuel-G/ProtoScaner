// src/constants.ts

export const generos = [
    { label: 'Masculino', value: 1 },
    { label: 'Femenino', value: 2 }
];
export const tiposAmputacion = [
    { label: 'Transtibial', value: 1 },
    { label: 'Transfemoral', value: 2 }
];

export const ladosAmputacion = [
    { label: 'Izquierdo', value: 1 },
    { label: 'Derecho', value: 2 }
];
export const provincias = [
    { label: 'Azua', value: 1 },
    { label: 'Bahoruco', value: 2 },
    { label: 'Barahona', value: 3 },
    { label: 'Dajab\u00F3n', value: 4 },
    { label: 'Distrito Nacional', value: 5 },
    { label: 'Duarte', value: 6 },
    { label: 'El Seibo', value: 7 },
    { label: 'El\u00EDas Pi\u00F1a', value: 8 },
    { label: 'Espaillat', value: 9 },
    { label: 'Hato Mayor', value: 10 },
    { label: 'Hermanas Mirabal', value: 11 },
    { label: 'Independencia', value: 12 },
    { label: 'La Altagracia', value: 13 },
    { label: 'La Romana', value: 14 },
    { label: 'La Vega', value: 15 },
    { label: 'Mar\u00EDa Trinidad S\u00E1nchez', value: 16 },
    { label: 'Monse\u00F1or Nouel', value: 17 },
    { label: 'Monte Cristi', value: 18 },
    { label: 'Monte Plata', value: 19 },
    { label: 'Pedernales', value: 20 },
    { label: 'Peravia', value: 21 },
    { label: 'Puerto Plata', value: 22 },
    { label: 'Saman\u00E1', value: 23 },
    { label: 'San Crist\u00F3bal', value: 24 },
    { label: 'San Jos\u00E9 de Ocoa', value: 25 },
    { label: 'San Juan', value: 26 },
    { label: 'San Pedro de Macor\u00EDs', value: 27 },
    { label: 'S\u00E1nchez Ram\u00EDrez', value: 28 },
    { label: 'Santiago', value: 29 },
    { label: 'Santiago Rodr\u00EDguez', value: 30 },
    { label: 'Santo Domingo', value: 31 },
    { label: 'Valverde', value: 32 }
];



export const causasAmputacion = [
    { label: 'Cong\u00E9nita', value: 1 },
    { label: 'Enfermedad', value: 2 },
    { label: 'Accidente', value: 3 },
    { label: 'Diabetes', value: 4 },
    { label: 'Infecci\u00F3n', value: 5 },
    { label: 'Traumatismo', value: 6 },
    { label: 'C\u00E1ncer', value: 7 },
    { label: 'Vascular', value: 8 },
    { label: 'Quemaduras', value: 9 },
    { label: 'Lesiones deportivas', value: 10 },
    { label: 'Mala circulaci\u00F3n', value: 11 },
    { label: 'Frostbite (congelaci\u00F3n)', value: 12 },
    { label: 'Neuropat\u00EDa perif\u00E9rica', value: 13 },
    { label: 'S\u00EDndrome de compartimento', value: 14 },
    { label: 'Trombosis venosa profunda', value: 15 },
    { label: 'Complicaciones quir\u00FArgicas', value: 16 },
    { label: 'Infecciones \u00F3seas', value: 17 },
    { label: 'Tumores benignos', value: 18 },
    { label: 'Trastornos neuromusculares', value: 19 },
    { label: 'Exposici\u00F3n a sustancias t\u00F3xicas', value: 20 },
    { label: 'Malformaciones cong\u00E9nitas', value: 21 },
    { label: 'Factores gen\u00E9ticos', value: 22 },
    { label: 'Otro', value: 23 }
];

export const estatusPaciente = [
    { label: 'Medidas y Escaneo', value: 1 },
    {label: 'Pendiente de Prueba', value: 2 },
    { label: 'Prueba', value: 3 },
    { label: 'Pendiente Definitivo Cita', value: 4 },
    { label: 'Pendiente Definitivo', value: 5 },
    { label: 'Completado', value: 6 }
];

export const estatusProtesis = [
    { label: 'Pendiente Dise\u00F1o 1', value: 1 },
    { label: 'Impreso 1', value: 2 },
    { label: 'Pendiente Dise\u00F1o 2', value: 3 },
    { label: 'Impreso 2', value: 4 },
    { label: 'Entregado', value: 5 },
   
];


export const componenteTipos = [
    { label: 'Rodillera', value: 1 },
    { label: 'Liner transtibial CON PIN', value: 2 },
    { label: 'Liner transtibial SIN PIN', value: 3 },
    { label: 'Liner transfemoral CON PIN', value: 4 },
    { label: 'Liner transfemoral SIN PIN', value: 5 },
    { label: 'Placa base', value: 6 },
    { label: 'Base de lanzadera', value: 7 },
    { label: 'Adaptador', value: 8 },
    { label: 'Pie Prostético', value: 9 },
    { label: 'Knee', value: 10 },
    { label: 'Clamp', value: 11 },
    { label: 'Reciber', value: 12 },
    { label: 'Base inclinada', value: 13 },
    { label: 'Adapter', value: 14 }
];




export const tipoLiners = [
    { label: 'Cushion', value: 1 },
    { label: 'Pin', value: 2 }
];

export const TALLAS = {
    TRANSTIBIAL: [
        { id: 1, name: "Small" },
        { id: 2, name: "Medium" },
        { id: 3, name: "Medium Plus" },
        { id: 4, name: "Large" },
        { id: 5, name: "X Large" },
    ],
    TRANSFEMORAL: [
        { id: 6, name: "28" },
        { id: 7, name: "32" },
        { id: 8, name: "38" },
        { id: 9, name: "44" },
    ],
} as const;

export type Talla = typeof TALLAS[keyof typeof TALLAS][number];