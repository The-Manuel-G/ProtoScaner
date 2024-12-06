import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import '../../../styles/ProtesispageCSS.css';
import AddProsthesisPanel from "../../../components/AddProsthesisPanel";
import EditProsthesisPanel from "../../../components/EditProsthesisPanel";

export function Protesispage(): JSX.Element {
    const [protesis, setProtesis] = useState<any[]>([]);
    const [isPanelVisible, setIsPanelVisible] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [editingProsthesis, setEditingProsthesis] = useState<any | null>(null); // Cambiado a 'any | null'
    const [selectedTable, setSelectedTable] = useState('protesis');
    const toast = useRef<any>(null);

    useEffect(() => {
        fetchData();
    }, [selectedTable]);

    const fetchData = async () => {
        const endpointMap: Record<string, string> = {
            protesis: 'http://localhost:5270/api/protesis',
            inventory: 'http://localhost:5270/api/inventory',
            components: 'http://localhost:5270/api/components'
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

            showToast('success', 'Success', 'Prosthesis deleted successfully.');
            fetchData();
        } catch (error: any) {
            showToast('error', 'Error', error.message || 'Failed to delete prosthesis.');
        }
    };


    const showToast = (severity: string, summary: string, detail: string) => {
        toast.current?.show({ severity, summary, detail, life: 3000 });
    };

    const header = (
        <div className="flex justify-content-between">
            <h4>Manage {selectedTable.charAt(0).toUpperCase() + selectedTable.slice(1)}</h4>
            <Button label="Add Prosthesis" icon="pi pi-plus" onClick={() => { setEditingProsthesis(null); setIsPanelVisible(true); }} />
            <InputText
                type="search"
                placeholder="Search..."
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
                    setEditingProsthesis(rowData);  // Establece el objeto de prótesis que se está editando
                    setIsPanelVisible(true);  // Muestra el panel de edición
                }}
            />
            <Button
                icon="pi pi-trash"
                severity="danger"
                onClick={() => handleDeleteProsthesis(rowData.idProtesis)}
            />
        </div>
    );

    // Mapeo de tipos y tamaños de liner
    const linerTipoOptions = {
        1: 'Tipo 1',
        2: 'Tipo 2',
        // Agrega más tipos si es necesario
    };

    const linerTamanoOptions = {
        1: 'Pequeño',
        2: 'Mediano',
        3: 'Grande',
    };

    // Función para formatear tipo de liner
    const formatLinerTipo = (rowData: any) => {
        return linerTipoOptions[rowData.linerTipo] || 'Desconocido';
    };

    // Función para formatear tamaño de liner
    const formatLinerTamano = (rowData: any) => {
        return linerTamanoOptions[rowData.linerTamano] || 'Desconocido';
    };

    const tableOptions = [
        { label: 'Prosthesis', value: 'protesis' },
        { label: 'Inventory', value: 'inventory' },
        { label: 'Components', value: 'components' }
    ];

  

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <div className="mb-4">
                    <Dropdown
                        value={selectedTable}
                        options={tableOptions}
                        onChange={(e) => setSelectedTable(e.value)}
                        placeholder="Select Table"
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
                   
                    <Column field="linerTipo" header="Liner Type" body={formatLinerTipo} sortable />
                    <Column field="linerTamano" header="Liner Size" body={formatLinerTamano} sortable />
                    <Column field="protesista" header="Prosthetist" sortable />
                    <Column field="fechaEntrega" header="Delivery Date" sortable />
                    <Column field="material" header="Material" sortable />
                    <Column field="paciente.nombreCompleto" header="Patient Name" sortable body={(rowData: any) => rowData.paciente?.nombreCompleto || 'N/A'} />
                    <Column body={actionBodyTemplate} header="Actions" />
                </DataTable>
            </div>

            {isPanelVisible && (
                editingProsthesis ? (
                    <EditProsthesisPanel
                        prosthesis={editingProsthesis}  // Pasa el objeto prosthesis aquí
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
