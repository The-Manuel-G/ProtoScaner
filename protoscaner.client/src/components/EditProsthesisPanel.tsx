import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import '../styles/EditProsthesisPanel.css';

const EditProsthesisPanel = ({ onClose, onSubmit, prosthesis }: any) => {
    const [formData, setFormData] = useState<any>({
        idProtesis: '',
        idPaciente: '',
        linerTipo: null,
        linerTamano: null,
        protesista: '',
        material: '',
        fechaEntrega: null,
    });


    const linerTamanoOptions = [
        { name: 'Pequeño', value: 1 },
        { name: 'Mediano', value: 2 },
        { name: 'Grande', value: 3 },
    ];

    useEffect(() => {
        if (prosthesis) {
            setFormData({
                idProtesis: prosthesis.idProtesis || '',
                idPaciente: prosthesis.idPaciente || '',
                linerTipo: prosthesis.linerTipo || null,
                linerTamano: prosthesis.linerTamano || null,
                protesista: prosthesis.protesista || '',
                material: prosthesis.material || '',
                fechaEntrega: prosthesis.fechaEntrega ? new Date(prosthesis.fechaEntrega) : null,
            });
        }
    }, [prosthesis]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDropdownChange = (e: any) => {
        const { name, value } = e.target ? e.target : e; // Ajuste para compatibilidad con Dropdown.
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (!formData.protesista || !formData.material || formData.linerTipo === null || formData.linerTamano === null) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        const formattedData = {
            idProtesis: formData.idProtesis || null,
            idPaciente: formData.idPaciente ? parseInt(formData.idPaciente, 10) : null,
            linerTipo: formData.linerTipo,
            linerTamano: formData.linerTamano,
            protesista: formData.protesista,
            fechaEntrega: formData.fechaEntrega ? formData.fechaEntrega.toISOString().split('T')[0] : null,
            material: formData.material,
        };

        console.log("Datos enviados a la API:", formattedData);
        onSubmit(formattedData);
        onClose();
    };

    return (
        <div className="edit-panel">
            <div className="edit-panel-content">
                <h3>Editar Protesis</h3>

                <div className="form-group">
                    <InputText
                        name="protesista"
                        value={formData.protesista}
                        onChange={handleChange}
                        placeholder="Protesista"
                    />
                </div>

                <div className="form-group">
                    <InputText
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        placeholder="Material"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo de Liner</label>
                    <select
                        name="linerTipo"
                        value={formData.linerTipo}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border ${!formData.linerTipo ? 'border-red-500' : 'border-gray-300'
                            } bg-white shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    >
                        <option value="">Seleccione el tipo de liner</option>
                        <option value="1">Cushion</option>
                        <option value="2">Pin</option>
                        {/* Agrega más opciones dinámicamente según tus datos */}
                    </select>
                    {!formData.linerTipo && <p className="mt-1 text-sm text-red-500">Este campo es obligatorio</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Tama&ntilde;o del Liner</label>
                    <select
                        name="linerTamano"
                        value={formData.linerTamano}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border ${!formData.linerTamano ? 'border-red-500' : 'border-gray-300'
                            } bg-white shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    >
                        <option value="">Seleccione el tama&ntilde;o del liner</option>
                        <option value="1">Small</option>
                        <option value="2">Medium</option>
                        <option value="3">Medium Plus</option>
                        <option value="4">Large</option>
                        <option value="5">X Large+</option>
                        <option value="6">28</option>
                        <option value="7">32</option>
                        <option value="8">38</option>
                        <option value="9">44</option>


                    </select>

                    {!formData.linerTamano && <p className="mt-1 text-sm text-red-500">Este campo es obligatorio</p>}
                </div>


                <div className="form-group">
                    <InputText
                        name="idPaciente"
                        value={formData.idPaciente || ''}
                        onChange={handleChange}
                        placeholder="ID del Paciente"
                    />
                </div>

                <div className="form-group">
                    <Calendar
                        name="fechaEntrega"
                        value={formData.fechaEntrega}
                        onChange={(e: any) => handleChange({ target: { name: 'fechaEntrega', value: e.value } })}
                        placeholder="Fecha de Entrega"
                    />
                </div>

                <div className="form-buttons">
                    <Button label="Guardar" onClick={handleSubmit} />
                    <Button label="Cancelar" onClick={onClose} className="cancel-button" />
                </div>
            </div>
        </div>
    );
};

export default EditProsthesisPanel;