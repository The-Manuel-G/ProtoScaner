// src/Pages/Paciente/columns.tsx

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Paciente } from '../../types/Paciente'; // Asegúrate de que las rutas sean correctas
import { Button } from '@/components/ui/button';

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
            cell: info => info.getValue<string>(),
        },
        {
            accessorKey: 'Paciente.cedula',
            header: 'Cédula',
            cell: info => info.getValue<string>(),
        },
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
