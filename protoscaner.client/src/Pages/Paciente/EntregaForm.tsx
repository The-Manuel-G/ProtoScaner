import React, { useState } from 'react';
import { createEntrega } from '../../services/EntregaService';
import { toast } from 'react-toastify';
import { ThemeContext } from '../../App';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { Calendar } from 'primereact/calendar';

const RegistroEntrega: React.FC = () => {
    const [formData, setFormData] = useState({
        idPaciente: '',
        idProtesis: '',
        idUsuario: '',
        reduccion: '',
        generalModificacion: '',
        otros: '',
        idPruebaSocket: '',
        insidencia: '',
        materialRelleno: '',
        fechaEntrega: '',
        practicaMarcha: false,
        mantenimientoPostEntrega: false,
        idMantenimiento: '',
        firmaDescargoComponenteLista: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createEntrega({
                ...formData,
                idPaciente: Number(formData.idPaciente),
                idProtesis: Number(formData.idProtesis),
                idUsuario: Number(formData.idUsuario),
                idPruebaSocket: Number(formData.idPruebaSocket),
                idMantenimiento: Number(formData.idMantenimiento),
                fechaEntrega: new Date(formData.fechaEntrega),
            });
            toast.success('Entrega creada exitosamente');
            setFormData({
                idPaciente: '',
                idProtesis: '',
                idUsuario: '',
                reduccion: '',
                generalModificacion: '',
                otros: '',
                idPruebaSocket: '',
                insidencia: '',
                materialRelleno: '',
                fechaEntrega: '',
                practicaMarcha: false,
                mantenimientoPostEntrega: false,
                idMantenimiento: '',
                firmaDescargoComponenteLista: false,
            });
        } catch (error) {
            console.error('Error al crear la entrega:', error);
            toast.error('Hubo un error al crear la entrega.');
        }
    };

    function setErrors(arg0: { fechaEntrega: boolean; prototype: Error; captureStackTrace(targetObject: object, constructorOpt?: Function): void; prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined; stackTraceLimit: number; }) {
        throw new Error('Function not implemented.');
    }

    return (
        <div lang="es" className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
            <div className={`w-full max-w-6xl ${ThemeContext?.theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} shadow-lg rounded-lg p-8`}>
                <h2 className="text-4xl font-semibold mb-6">Registro de entregas</h2>
                <form onSubmit={handleSubmit} className="form-container">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        <div className="flex flex-col">
                            <label className="block text-lg font-medium mb-2">Paciente (ID) *</label>
                            <input
                                type="number"
                                name="idPaciente"
                                value={formData.idPaciente}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-lg font-medium mb-2">Prótesis (ID) *</label>
                            <input
                                type="number"
                                name="idProtesis"
                                value={formData.idProtesis}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-lg font-medium mb-2">Usuario (ID) *</label>
                            <input
                                type="number"
                                name="idUsuario"
                                value={formData.idUsuario}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-lg font-medium mb-2">Reducción</label>
                            <textarea
                                name="reduccion"
                                value={formData.reduccion}
                                onChange={handleChange}
                                className="w-full p-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-lg font-medium mb-2">General Modificación</label>
                            <textarea
                                name="generalModificacion"
                                value={formData.generalModificacion}
                                onChange={handleChange}
                                className="w-full p-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-lg font-medium mb-2">Otros</label>
                            <textarea
                                name="otros"
                                value={formData.otros}
                                onChange={handleChange}
                                className="w-full p-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-lg font-medium mb-2">Prueba Socket (ID)</label>
                            <input
                                type="number"
                                name="idPruebaSocket"
                                value={formData.idPruebaSocket}
                                onChange={handleChange}
                                className="w-full p-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-lg font-medium mb-2">Material Relleno</label>
                            <input
                                type="text"
                                name="materialRelleno"
                                value={formData.materialRelleno}
                                onChange={handleChange}
                                className="w-full p-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-lg font-medium mb-2">Incidencia</label>
                            <input
                                type="text"
                                name="insidencia"
                                value={formData.insidencia}
                                onChange={handleChange}
                                className="w-full p-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-lg font-medium mb-2">Fecha de Entrega *</label>
                            <Calendar
                                name="fechaEntrega"
                                value={formData.fechaEntrega ? new Date(formData.fechaEntrega) : null}
                                onChange={(e) => {
                                    const fecha = e.value ? new Date(e.value).toISOString().split('T')[0] : '';
                                    setFormData({ ...formData, fechaEntrega: fecha });
                                    if (Error.fechaEntrega) {
                                        setErrors({ ...Error, fechaEntrega: false });
                                    }
                                }}
                                dateFormat="dd/mm/yy"
                                placeholder="Seleccione una fecha"
                                required
                                className={`w-full p-3 text-lg rounded-md border ${Error.fecha ? 'p-invalid border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-lg font-medium mb-2">Práctica de Marcha</label>
                            <input
                                type="checkbox"
                                name="practicaMarcha"
                                checked={formData.practicaMarcha}
                                onChange={handleChange}
                                className="rounded-md"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-lg font-medium mb-2">Mantenimiento Post Entrega</label>
                            <input
                                type="checkbox"
                                name="mantenimientoPostEntrega"
                                checked={formData.mantenimientoPostEntrega}
                                onChange={handleChange}
                                className="rounded-md"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-lg font-medium mb-2">Firma Descargo</label>
                            <input
                                type="checkbox"
                                name="firmaDescargoComponenteLista"
                                checked={formData.firmaDescargoComponenteLista}
                                onChange={handleChange}
                                className="rounded-md"
                            />
                        </div>


                        <button type="submit">Registrar Entrega</button>

                        <style>{`
                            .form-container {
                                max-width: 800px;
                                margin: 0 auto;
                                padding: 20px;
                                background: #f9f9f9;
                                border-radius: 8px;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                            }
                            h2, h3 {
                                text-align: center;
                            }
                            .section {
                                margin-bottom: 20px;
                            }
                            .field-group {
                                display: grid;
                                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                                gap: 16px;
                            }
                            .field {
                                display: flex;
                                flex-direction: column;
                            }
                            label {
                                font-weight: bold;
                                margin-bottom: 8px;
                            }
                            input, textarea {
                                padding: 8px;
                                border: 1px solid #ccc;
                                border-radius: 4px;
                                width: 100%;
                            }
                            textarea {
                                resize: vertical;
                            }
                            button {
                                display: block;
                                margin: 0 auto;
                                padding: 10px 20px;
                                background: #007bff;
                                color: white;
                                border: none;
                                border-radius: 4px;
                                cursor: pointer;
                            }
                            button:hover {
                                background: #0056b3;
                            }
                        `}</style>
                    </motion.div>
                </form>
            </div>
        </div>
    );
};

export default RegistroEntrega;
