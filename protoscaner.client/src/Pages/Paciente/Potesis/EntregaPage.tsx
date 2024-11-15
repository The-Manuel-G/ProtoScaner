import React from 'react';

import { Button } from 'primereact/button';


// Componente EntregaComponent definido como una función sin React.FC
export function EntregaPage(): JSX.Element {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Entrega de Prótesis</h1>
            <p className="mt-4">
                Gestión de las entregas de prótesis. Aquí puedes revisar el estado de las entregas y registrar nuevas entregas.
            </p>

            <div className="card flex justify-content-center">
                <Button label="Check" icon="pi pi-check" />
            </div>
        </div>
    );
}

export default EntregaPage;
