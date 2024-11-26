import React from 'react';
import { FaClipboardCheck, FaTools } from 'react-icons/fa';

const ContentGrid = (): JSX.Element => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tarjeta: Descargos firmados */}
            <div className="p-4 rounded-2xl shadow-lg bg-gray-900 hover:bg-green-200 transition duration-300">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-green-500">Descargos firmados</h3>
                        <p className="text-sm text-green-600">Total de descargos firmados</p>
                    </div>
                    <FaClipboardCheck className="text-green-600 text-4xl" />
                </div>
                <div className="mt-4">
                    <p className="text-3xl font-bold text-green-600">45</p>
                </div>
            </div>

            {/* Tarjeta: Entregas para mantenimiento */}
            <div className="p-4 rounded-2xl shadow-lg bg-gray-900 hover:bg-yellow-200 transition duration-300">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-yellow-500">Entregas para mantenimiento</h3>
                        <p className="text-sm text-yellow-600">Prótesis en espera de mantenimiento</p>
                    </div>
                    <FaTools className="text-yellow-600 text-4xl" />
                </div>
                <div className="mt-4">
                    <p className="text-3xl font-bold text-yellow-600">12</p>
                </div>
            </div>
        </div>
    );
};

export default ContentGrid;

