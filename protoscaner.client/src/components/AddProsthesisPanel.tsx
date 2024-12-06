import React, { useState } from 'react';
import '../styles/AddProsthesisPanel.css'; 

const AddProsthesisPanel = ({ isVisible, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        codigo_paciente: '',
        liner_tipo: '',
        liner_tamano: '',
        protesista: '',
        fecha_entrega: '',
        material: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.liner_tipo) newErrors.liner_tipo = 'Por favor seleccione el tipo de liner';
        if (!formData.liner_tamano) newErrors.liner_tamano = 'Por favor seleccione el tamaño del liner';
        if (!formData.protesista) newErrors.protesista = 'Por favor ingrese el nombre del protesista';
        if (!formData.fecha_entrega) newErrors.fecha_entrega = 'Por favor seleccione la fecha de entrega';
        if (!formData.material) newErrors.material = 'Por favor ingrese el material';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar campos
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Ajustar los datos al formato esperado por la API
        const formattedData = {
            idPaciente: formData.codigo_paciente ? parseInt(formData.codigo_paciente, 10) : null, 
            linerTipo: parseInt(formData.liner_tipo, 10), // Convertir a número
            linerTamano: parseInt(formData.liner_tamano, 10), // Convertir a número
            protesista: formData.protesista,
            fechaEntrega: formData.fecha_entrega, // Fecha en formato string (YYYY-MM-DD)
            material: formData.material,
        };

        console.log("Datos enviados a la API:", formattedData); // Verificar los datos antes de enviarlos
        onSubmit(formattedData); // Enviar los datos al componente padre

        // Restablecer el formulario y cerrar el panel
        setFormData({
            codigo_paciente: '',
            liner_tipo: '',
            liner_tamano: '',
            protesista: '',
            fecha_entrega: '',
            material: '',
        });
        setErrors({});
        onClose(); // Cerrar el panel
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4">
                <div className="flex justify-between items-center bg-blue-800 text-white rounded-t-lg px-6 py-4">
                    <h2 className="text-lg font-semibold">Agregar Prótesis</h2>
                    <button onClick={onClose} className="text-2xl leading-none">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
                    {/* Código del Paciente (opcional) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Código del Paciente (Opcional)</label>
                        <input
                            type="text"
                            name="codigo_paciente"
                            value={formData.codigo_paciente}
                            onChange={handleChange}
                            placeholder="Ingrese el código del paciente"
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Tipo de Liner */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo de Liner</label>
                        <select
                            name="liner_tipo"
                            value={formData.liner_tipo}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.liner_tipo ? 'border-red-500' : 'border-gray-300'
                                } bg-white shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        >
                            <option value="">Seleccione el tipo de liner</option>
                            <option value="1">Tipo 1</option>
                            <option value="2">Tipo 2</option>
                            {/* Opciones adicionales según base de datos */}
                        </select>
                        {errors.liner_tipo && <p className="mt-1 text-sm text-red-500">{errors.liner_tipo}</p>}
                    </div>

                    {/* Tamaño del Liner */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tamaño del Liner</label>
                        <select
                            name="liner_tamano"
                            value={formData.liner_tamano}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.liner_tamano ? 'border-red-500' : 'border-gray-300'
                                } bg-white shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        >
                            <option value="">Seleccione el tamaño del liner</option>
                            <option value="1">Pequeño</option>
                            <option value="2">Mediano</option>
                            <option value="3">Grande</option>
                        </select>
                        {errors.liner_tamano && <p className="mt-1 text-sm text-red-500">{errors.liner_tamano}</p>}
                    </div>

                    {/* Protesista */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Protesista</label>
                        <input
                            type="text"
                            name="protesista"
                            value={formData.protesista}
                            onChange={handleChange}
                            placeholder="Ingrese el nombre del protesista"
                            className={`mt-1 block w-full rounded-md border ${errors.protesista ? 'border-red-500' : 'border-gray-300'
                                } shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {errors.protesista && <p className="mt-1 text-sm text-red-500">{errors.protesista}</p>}
                    </div>

                    {/* Fecha de Entrega */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fecha de Entrega</label>
                        <input
                            type="date"
                            name="fecha_entrega"
                            value={formData.fecha_entrega}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.fecha_entrega ? 'border-red-500' : 'border-gray-300'
                                } shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {errors.fecha_entrega && <p className="mt-1 text-sm text-red-500">{errors.fecha_entrega}</p>}
                    </div>

                    {/* Material */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Material</label>
                        <input
                            type="text"
                            name="material"
                            value={formData.material}
                            onChange={handleChange}
                            placeholder="Ingrese el material"
                            className={`mt-1 block w-full rounded-md border ${errors.material ? 'border-red-500' : 'border-gray-300'
                                } shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {errors.material && <p className="mt-1 text-sm text-red-500">{errors.material}</p>}
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                        >
                            Agregar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProsthesisPanel;
