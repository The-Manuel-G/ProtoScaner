// src/Pages/Paciente/columns.tsx

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Paciente } from '../../types/Paciente'; // Aseg�rate de que las rutas sean correctas
import { Button } from '@/components/ui/button';
import {
    generos,
    tiposAmputacion,
    ladosAmputacion,
    causasAmputacion,
    provincias,
    estatusPaciente,
    estatusProtesis,
} from '../../constants';

interface PacienteData {
    Paciente: Paciente;
}

interface GetColumnsProps {
    handleEditPaciente: (index: number) => void;
    handleDiscardPaciente: (index: number) => void;
}

export function getColumns({
    handleEditPaciente,
    handleDiscardPaciente,
}: GetColumnsProps): ColumnDef<PacienteData>[] {
    return [
        {
            accessorKey: 'Paciente.nombreCompleto',
            header: 'Nombre Completo',
            cell: (info) => info.getValue<string>() || 'No especificado',
        },
        {
            accessorKey: 'Paciente.cedula',
            header: 'C�dula',
            cell: (info) => info.getValue<string>() || 'No especificado',
        },
        {
            accessorKey: 'Paciente.codigoPaciente',
            header: 'C�digo Paciente',
            cell: (info) => info.getValue<string>() || 'No especificado',
        },
        {
            accessorKey: 'Paciente.genero',
            header: 'G�nero',
            cell: (info) => {
                const value = info.getValue<number>();
                const genero = generos.find((g) => g.value === value);
                return genero ? genero.label : 'No especificado';
            },
        },
        {
            accessorKey: 'Paciente.fechaNacimiento',
            header: 'Fecha de Nacimiento',
            cell: (info) => {
                const fecha = info.getValue<string>();
                return fecha ? new Date(fecha).toLocaleDateString('es-ES') : 'No especificado';
            },
        },
        {
            accessorKey: 'Paciente.direccion',
            header: 'Direcci�n',
            cell: (info) => info.getValue<string>() || 'No especificado',
        },
        {
            accessorKey: 'Paciente.telefono',
            header: 'Tel�fono',
            cell: (info) => info.getValue<string>() || 'No especificado',
        },
        {
            accessorKey: 'Paciente.telefonoCelular',
            header: 'Tel�fono Celular',
            cell: (info) => info.getValue<string>() || 'No especificado',
        },
        {
            accessorKey: 'Paciente.idProvincia',
            header: 'Provincia',
            cell: (info) => {
                const value = info.getValue<number>();
                const provincia = provincias.find((p) => p.value === value);
                return provincia ? provincia.label : 'No especificado';
            },
        },
        {
            accessorKey: 'Paciente.sector',
            header: 'Sector',
            cell: (info) => info.getValue<string>() || 'No especificado',
        },
        {
            accessorKey: 'Paciente.insidencia',
            header: 'Insidencia',
            cell: (info) => (info.getValue<boolean>() ? 'S�' : 'No'),
        },
        {
            accessorKey: 'Paciente.idEstatusPaciente',
            header: 'Estatus Paciente',
            cell: (info) => {
                const value = info.getValue<number>();
                const estatus = estatusPaciente.find((e) => e.value === value);
                return estatus ? estatus.label : 'No especificado';
            },
        },
        {
            accessorKey: 'Paciente.idEstatusProtesis',
            header: 'Estatus Pr�tese',
            cell: (info) => {
                const value = info.getValue<number>();
                const estatus = estatusProtesis.find((e) => e.value === value);
                return estatus ? estatus.label : 'No especificado';
            },
        },
        {
            accessorKey: 'Paciente.comentario',
            header: 'Comentario',
            cell: (info) => info.getValue<string>() || 'No especificado',
        },
        {
            accessorKey: 'Paciente.fechaIngreso',
            header: 'Fecha de Ingreso',
            cell: (info) => {
                const fecha = info.getValue<string>();
                return fecha ? new Date(fecha).toLocaleDateString('es-ES') : 'No especificado';
            },
        },
        // Tipo de Amputaci�n
        {
            accessorKey: 'Paciente.historialPacienteIngresos[0].tipoAmputacion',
            header: 'Tipo de Amputaci�n',
            cell: (info) => {
                const value = info.getValue<number>();
                const tipo = tiposAmputacion.find((t) => t.value === value);
                return tipo ? tipo.label : 'No especificado';
            },
        },
        // Lado de Amputaci�n
        {
            accessorKey: 'Paciente.historialPacienteIngresos[0].ladoAmputacion',
            header: 'Lado de Amputaci�n',
            cell: (info) => {
                const value = info.getValue<number>();
                const lado = ladosAmputacion.find((l) => l.value === value);
                return lado ? lado.label : 'No especificado';
            },
        },
        // Acciones
        {
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => {
                const index = row.index;
                return (
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditPaciente(index)}
                            className="flex items-center"
                            title="Editar"
                        >
                            <FontAwesomeIcon icon={faEdit} className="mr-2" />
                            Editar
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDiscardPaciente(index)}
                            className="flex items-center"
                            title="Descartar"
                        >
                            <FontAwesomeIcon icon={faTrash} className="mr-2" />
                            Descartar
                        </Button>
                    </div>
                );
            },
        },
    ];
}
