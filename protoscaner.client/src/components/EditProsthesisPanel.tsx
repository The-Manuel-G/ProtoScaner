import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
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

    const linerTipoOptions = [
        { name: 'Tipo 1', value: 1 },
        { name: 'Tipo 2', value: 2 },
        { name: 'Tipo 3', value: 3 },
    ];

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
        const { name, value } = e;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (!formData.protesista || !formData.material || formData.linerTipo === null || formData.linerTamano === null) {
            alert("Please fill in all required fields.");
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
                <h3>Edit Prosthesis</h3>

                <div className="form-group">
                    <InputText
                        name="protesista"
                        value={formData.protesista}
                        onChange={handleChange}
                        placeholder="Prosthetist"
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

                <div className="form-group">
                    <FloatLabel className="w-full md:w-14rem">
                        <Dropdown
                            inputId="dd-linerTipo"
                            name="linerTipo"
                            value={formData.linerTipo}
                            options={linerTipoOptions}
                            onChange={handleDropdownChange}
                            optionLabel="name"
                            placeholder="Liner Type"
                        />
                        <label htmlFor="dd-linerTipo">Select Liner Type</label>
                    </FloatLabel>
                </div>

                <div className="form-group">
                    <FloatLabel className="w-full md:w-14rem">
                        <Dropdown
                            inputId="dd-linerTamano"
                            name="linerTamano"
                            value={formData.linerTamano}
                            options={linerTamanoOptions}
                            onChange={handleDropdownChange}
                            optionLabel="label"
                            placeholder="Liner Size"
                        />
                        <label htmlFor="dd-linerTamano">Select Liner Size</label>
                    </FloatLabel>
                </div>

                <div className="form-group">
                    <InputText
                        name="idPaciente"
                        value={formData.idPaciente || ''}
                        onChange={handleChange}
                        placeholder="Patient ID"
                    />
                </div>

                <div className="form-group">
                    <Calendar
                        name="fechaEntrega"
                        value={formData.fechaEntrega}
                        onChange={(e: any) => handleChange({ target: { name: 'fechaEntrega', value: e.value } })}
                        placeholder="Delivery Date"
                    />
                </div>

                <div className="form-buttons">
                    <Button label="Save" onClick={handleSubmit} />
                    <Button label="Cancel" onClick={onClose} className="cancel-button" />
                </div>
            </div>
        </div>
    );
};

export default EditProsthesisPanel;
