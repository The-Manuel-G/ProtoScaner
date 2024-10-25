import React from 'react';
import { FaUserInjured, FaTools, FaProcedures } from 'react-icons/fa';

const ContentGrid: React.FC = () => {
    return (
        <div className="p-4 sm:ml-16">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                    {/* Pacientes Activos */}
                    <div className="grid-item flex flex-col items-center justify-between h-40 bg-white shadow-lg rounded-lg dark:bg-gray-800 p-4">
                        <div className="flex items-center justify-between w-full">
                            <div className="text-left">
                                <span className="block text-gray-500 font-medium mb-1">Pacientes Activos</span>
                                <div className="text-3xl font-extrabold text-blue-600">152</div>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-full">
                                <FaUserInjured className="text-blue-500 text-3xl" />
                            </div>
                        </div>
                        <span className="text-green-500 font-medium mt-2">24 nuevos</span>
                        <span className="text-gray-500 text-sm">desde la última visita</span>
                    </div>

                    {/* Prótesis en Proceso */}
                    <div className="grid-item flex flex-col items-center justify-between h-40 bg-white shadow-lg rounded-lg dark:bg-gray-800 p-4">
                        <div className="flex items-center justify-between w-full">
                            <div className="text-left">
                                <span className="block text-gray-500 font-medium mb-1">Prótesis en Proceso</span>
                                <div className="text-3xl font-extrabold text-orange-600">45</div>
                            </div>
                            <div className="bg-orange-100 p-2 rounded-full">
                                <FaTools className="text-orange-500 text-3xl" />
                            </div>
                        </div>
                        <span className="text-green-500 font-medium mt-2">%52+</span>
                        <span className="text-gray-500 text-sm">desde la semana pasada</span>
                    </div>

                    {/* Mantenimientos Pendientes */}
                    <div className="grid-item flex flex-col items-center justify-between h-40 bg-white shadow-lg rounded-lg dark:bg-gray-800 p-4">
                        <div className="flex items-center justify-between w-full">
                            <div className="text-left">
                                <span className="block text-gray-500 font-medium mb-1">Mantenimientos Pendientes</span>
                                <div className="text-3xl font-extrabold text-red-600">12</div>
                            </div>
                            <div className="bg-red-100 p-2 rounded-full">
                                <FaProcedures className="text-red-500 text-3xl" />
                            </div>
                        </div>
                        <span className="text-green-500 font-medium mt-2">3 nuevos</span>
                        <span className="text-gray-500 text-sm">desde la última semana</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentGrid;

