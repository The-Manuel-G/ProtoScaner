// src/Pages/Paciente/ContentGrid.tsx

import { FaUserInjured, FaTools, FaProcedures } from 'react-icons/fa';
import { Card } from '@/components/ui/card';
import { Badge } from 'primereact/badge'; // PrimeReact Badge for notification icons
import { Divider } from 'primereact/divider';

export default function ContentGrid() {
    return (
        <div className="p-2 sm:ml-0"> {/* Reducido padding y eliminado margen izquierdo */}
            <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"> {/* Reducido padding y eliminado margen-top */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Reducido gap y eliminado margen-bottom */}

                    {/* Pacientes Activos */}
                    <Card className="p-4 rounded-lg bg-gray-900 text-gray-300 shadow-lg border border-gray-800"> {/* Reducido padding */}
                        <div className="flex items-center justify-between">
                            <div className="text-left">
                                <span className="block text-gray-400 font-medium mb-1">Pacientes Activos</span>
                                <div className="text-2xl font-extrabold text-blue-400">152</div> {/* Reducido tamaño de texto */}
                            </div>
                            <div className="p-1 rounded-full bg-blue-200"> {/* Reducido padding */}
                                <FaUserInjured className="text-blue-500 text-2xl" /> {/* Reducido tamaño de icono */}
                            </div>
                        </div>
                        <Divider className="my-1 opacity-50" /> {/* Reducido margen */}
                        <div className="flex items-center justify-between mt-1"> {/* Reducido margin-top */}
                            <Badge value="24 nuevos" severity="success" className="text-green-400 mr-1" /> {/* Reducido margen-right */}
                            <span className="text-gray-400 text-xs">desde la última visita</span> {/* Reducido tamaño de texto */}
                        </div>
                    </Card>

                    {/* Prótesis en Proceso */}
                    <Card className="p-4 rounded-lg bg-gray-900 text-gray-300 shadow-lg border border-gray-800"> {/* Reducido padding */}
                        <div className="flex items-center justify-between">
                            <div className="text-left">
                                <span className="block text-gray-400 font-medium mb-1">Prótesis en Proceso</span>
                                <div className="text-2xl font-extrabold text-orange-400">45</div> {/* Reducido tamaño de texto */}
                            </div>
                            <div className="p-1 rounded-full bg-orange-200"> {/* Reducido padding */}
                                <FaTools className="text-orange-500 text-2xl" /> {/* Reducido tamaño de icono */}
                            </div>
                        </div>
                        <Divider className="my-1 opacity-50" /> {/* Reducido margen */}
                        <div className="flex items-center justify-between mt-1"> {/* Reducido margin-top */}
                            <Badge value="52%" severity="warning" className="text-green-400 mr-1" /> {/* Reducido margen-right */}
                            <span className="text-gray-400 text-xs">desde la semana pasada</span> {/* Reducido tamaño de texto */}
                        </div>
                    </Card>

                    {/* Mantenimientos Pendientes */}
                    <Card className="p-4 rounded-lg bg-gray-900 text-gray-300 shadow-lg border border-gray-800"> {/* Reducido padding */}
                        <div className="flex items-center justify-between">
                            <div className="text-left">
                                <span className="block text-gray-400 font-medium mb-1">Mantenimientos Pendientes</span>
                                <div className="text-2xl font-extrabold text-red-400">12</div> {/* Reducido tamaño de texto */}
                            </div>
                            <div className="p-1 rounded-full bg-red-200"> {/* Reducido padding */}
                                <FaProcedures className="text-red-500 text-2xl" /> {/* Reducido tamaño de icono */}
                            </div>
                        </div>
                        <Divider className="my-1 opacity-50" /> {/* Reducido margen */}
                        <div className="flex items-center justify-between mt-1"> {/* Reducido margin-top */}
                            <Badge value="3 nuevos" severity="success" className="text-green-400 mr-1" /> {/* Reducido margen-right */}
                            <span className="text-gray-400 text-xs">desde la última semana</span> {/* Reducido tamaño de texto */}
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    );
}
