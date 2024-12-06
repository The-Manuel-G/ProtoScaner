import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import '../../../styles/ProtesispageCSS.css';
import AddProsthesisPanel from "../../../components/AddProsthesisPanel";
import EditProsthesisPanel from "../../../components/EditProsthesisPanel";
import '../../../styles/ConfirmDialog.css';
export function Protesispage(): JSX.Element {
    const [protesis, setProtesis] = useState<any[]>([]);
    const [isPanelVisible, setIsPanelVisible] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [editingProsthesis, setEditingProsthesis] = useState<any | null>(null);
    const [selectedTable, setSelectedTable] = useState('protesis');
    const toast = useRef<any>(null);

    useEffect(() => {
        fetchData();
    }, [selectedTable]);

    const fetchData = async () => {
        const endpointMap: Record<string, string> = {
            protesis: 'http://localhost:5270/api/protesis',
        };

        try {
            const response = await fetch(endpointMap[selectedTable]);
            if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

            const data = await response.json();
            setProtesis(data);
        } catch (error: any) {
            showToast('error', 'Error', error.message || 'Unable to fetch data.');
        }
    };

    const handleSaveProsthesis = async (prosthesis: any) => {
        const method = prosthesis.idProtesis ? 'PUT' : 'POST';
        const url = prosthesis.idProtesis
            ? `http://localhost:5270/api/protesis/${prosthesis.idProtesis}`
            : 'http://localhost:5270/api/protesis';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(prosthesis),
            });

            if (response.ok) {
                showToast('success', 'Success', `Prosthesis ${method === 'PUT' ? 'updated' : 'added'} successfully.`);
                fetchData();
                setIsPanelVisible(false);
            } else {
                throw new Error('Failed to save data.');
            }
        } catch (error: any) {
            showToast('error', 'Error', error.message || 'Failed to save prosthesis.');
        }
    };

    const handleDeleteProsthesis = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5270/api/protesis/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete prosthesis.');

            showToast('success', 'Success', 'La protesis se ha eliminado correctamente.');
            fetchData();
        } catch (error: any) {
            showToast('error', 'Error', error.message || 'Failed to delete prosthesis.');
        }
    };

    const confirmDelete = (id: number) => {
        confirmDialog({
            message: ' Estas seguro de que deseas eliminar esta protesis?',
            header: 'Confirmar eliminacion',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            acceptClassName: 'p-button-danger me-2 custom-accept-button',
            rejectClassName: 'p-button-secondary me-2 custom-reject-button',
            className: 'custom-confirm-dialog',
            accept: () => handleDeleteProsthesis(id),
        });
    };

    const showToast = (severity: string, summary: string, detail: string) => {
        toast.current?.show({ severity, summary, detail, life: 3000 });
    };

    const header = (
        <div className="flex justify-content-between">
            <h4>Manage {selectedTable.charAt(0).toUpperCase() + selectedTable.slice(1)}</h4>
            <InputText
                type="search"
                placeholder="Buscar..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="ml-2"
            />
        </div>
    );

    const actionBodyTemplate = (rowData: any) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
                icon="pi pi-pencil"
                onClick={() => {
                    setEditingProsthesis(rowData);
                    setIsPanelVisible(true);
                }}
            />
            <Button
                icon="pi pi-trash"
                severity="danger"
                onClick={() => confirmDelete(rowData.idProtesis)}
            />
        </div>
    );

    // Mapeo de tipos y tamaños de liner
    const linerTipoOptions = {
        1: 'Cushion',
        2: 'Pin',
    };

    const linerTamanoOptions = {
        1: 'Small',
        2: 'Medium',
        3: 'Medium Plus',
        4: 'Large',
        5: 'X Large',
        6: '28',
        7: '32',
        8: '38',
        9: '44',

    };

    const formatLinerTipo = (rowData: any) => {
        return linerTipoOptions[rowData.linerTipo] || 'Desconocido';
    };

    const formatLinerTamano = (rowData: any) => {
        return linerTamanoOptions[rowData.linerTamano] || 'Desconocido';
    };

    return (
        <div>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="card">
                <div className="card flex flex-wrap justify-content-center gap-3">
                    <Button
                        label="Agregar Protesis"
                        icon="pi pi-plus"
                        rounded
                        onClick={() => {
                            setEditingProsthesis(null);
                            setIsPanelVisible(true);
                        }}
                        style={{
                            backgroundColor: '#6AE6A0',
                            border: '3px black',
                            width: '200px',
                            height: '40px',
                            color: '#000000',
                            fontWeight: 'bold',
                        }}
                    />
                </div>
                <DataTable
                    value={protesis}
                    paginator
                    rows={10}
                    globalFilter={globalFilter}
                    header={header}
                    dataKey="idProtesis"
                    emptyMessage="No records found."
                    responsiveLayout="scroll"
                >
                    <Column field="linerTipo" header="Tipo de Liner" body={formatLinerTipo} sortable />
                    <Column field="linerTamano" header="Medida de Liner" body={formatLinerTamano} sortable />
                    <Column field="protesista" header="Protesista" sortable />
                    <Column field="fechaEntrega" header="Fecha de Entrega" sortable />
                    <Column field="material" header="Material" sortable />
                    <Column
                        field="paciente.nombreCompleto"
                        header="Nombre del Paciente"
                        body={(rowData: any) => rowData.paciente?.nombreCompleto || 'N/A'}
                        sortable
                    />
                    <Column body={actionBodyTemplate} header="Acciones" />
                </DataTable>
            </div>

            {isPanelVisible && (
                editingProsthesis ? (
                    <EditProsthesisPanel
                        prosthesis={editingProsthesis}
                        onClose={() => setIsPanelVisible(false)}
                        onSubmit={handleSaveProsthesis}
                    />
                ) : (
                    <AddProsthesisPanel
                        isVisible={isPanelVisible}
                        onClose={() => setIsPanelVisible(false)}
                        onSubmit={handleSaveProsthesis}
                    />
                )
            )}
        </div>
    );
}

export default Protesispage;
