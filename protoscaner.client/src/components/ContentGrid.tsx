import { FaUserInjured, FaTools, FaProcedures } from 'react-icons/fa';
import { Card } from '@/components/ui/card';
import { Badge } from 'primereact/badge'; // PrimeReact Badge for notification icons
import { Divider } from 'primereact/divider';

export default function ContentGrid() {
    return (
        <div className="p-4 sm:ml-16">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">

                    {/* Pacientes Activos */}
                    <Card className="p-4 rounded-lg dark:bg-gray-800 bg-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div className="text-left">
                                <span className="block text-gray-500 font-medium mb-1">Pacientes Activos</span>
                                <div className="text-3xl font-extrabold text-blue-600">152</div>
                            </div>
                            <div className="p-2 rounded-full bg-blue-100">
                                <FaUserInjured className="text-blue-500 text-3xl" />
                            </div>
                        </div>
                        <Divider className="mt-2" />
                        <div className="flex items-center justify-between mt-2">
                            <Badge value="24 nuevos" severity="success" className="mr-2" /> {/* PrimeReact Badge */}
                            <span className="text-gray-500 text-sm">desde la última visita</span>
                        </div>
                    </Card>

                    {/* Prótesis en Proceso */}
                    <Card className="p-4 rounded-lg dark:bg-gray-800 bg-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div className="text-left">
                                <span className="block text-gray-500 font-medium mb-1">Prótesis en Proceso</span>
                                <div className="text-3xl font-extrabold text-orange-600">45</div>
                            </div>
                            <div className="p-2 rounded-full bg-orange-100">
                                <FaTools className="text-orange-500 text-3xl" />
                            </div>
                        </div>
                        <Divider className="mt-2" />
                        <div className="flex items-center justify-between mt-2">
                            <Badge value="52%" severity="warning" className="mr-2" /> {/* PrimeReact Badge */}
                            <span className="text-gray-500 text-sm">desde la semana pasada</span>
                        </div>
                    </Card>

                    {/* Mantenimientos Pendientes */}
                    <Card className="p-4 rounded-lg dark:bg-gray-800 bg-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div className="text-left">
                                <span className="block text-gray-500 font-medium mb-1">Mantenimientos Pendientes</span>
                                <div className="text-3xl font-extrabold text-red-600">12</div>
                            </div>
                            <div className="p-2 rounded-full bg-red-100">
                                <FaProcedures className="text-red-500 text-3xl" />
                            </div>
                        </div>
                        <Divider className="mt-2" />
                        <div className="flex items-center justify-between mt-2">
                            <Badge value="3 nuevos" severity="success" className="mr-2" /> {/* PrimeReact Badge */}
                            <span className="text-gray-500 text-sm">desde la última semana</span>
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    );
}
