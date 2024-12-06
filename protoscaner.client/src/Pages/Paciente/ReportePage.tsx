// src/pages/ReportePage.tsx

import React from 'react';
// Importación por defecto
import DistribucionGeneroChart from '../../components/Reportes/DistribucionGeneroChart'; // Importación por defecto
import PacientesPorProvinciaComponent from '../../components/Reportes/PacientesPorProvinciaComponent'; // Importación por defecto
import GenerosPorProvinciaComponent from '../../components/Reportes/GenerosPorProvinciaComponent'; // Importación por defecto
import EstatusProtesisComponent from '../../components/Reportes/EstatusProtesisComponent'; // Importación por defecto
import DistribucionEdadChart from '../../components/Reportes/DistribucionEdadChart'; // Importación por defecto
import MantenimientosActivosChart from '../../components/Reportes/MantenimientosActivosChart'; // Importación por defecto
// Importación por defecto
import DistribucionCausasPolarAreaChart from '../../components/Reportes/DistribucionCausasChart';
import EstatusPacienteComponent from '../../components/Reportes/EstatusPacienteComponent';
import TiposAmputacionComponent from '../../components/Reportes/TiposAmputacionComponent';
import ReusableCard from '../../components/ResumenReporte';
import Carousel, {
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
// Importación correcta

const ReportePage: React.FC = () => {
    const [activeMenu, setActiveMenu] = React.useState(0);

    const menuItems = [
        {
            name: "Paciente",
            subMenu: [
                { name: "Estatus Pacientes", component: <EstatusPacienteComponent /> },
                { name: "Distribución de Género", component: <DistribucionGeneroChart /> },
                { name: "Pacientes por Provincia", component: <PacientesPorProvinciaComponent /> },
                { name: "Géneros por Provincia", component: <GenerosPorProvinciaComponent /> },
                { name: "Tipo de amputacion ", component: <TiposAmputacionComponent /> },
            ],
        },
        {
            name: "Prótesis",
            subMenu: [
               
                { name: "Estatus de Prótesis", component: <EstatusProtesisComponent /> },
            ],
        },
        {
            name: "Estadísticas",
            subMenu: [
                { name: "Distribución de Edad", component: <DistribucionEdadChart /> },
                { name: "Mantenimientos Activos", component: <MantenimientosActivosChart /> },
                { name: "Total Pacientes", component: <ReusableCard /> },
                { name: "Distribucion por causa ", component: <DistribucionCausasPolarAreaChart /> },

                
            ],
        },
    ];

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50">
            {/* Header */}
            <header className="w-full bg-blue-600 text-white py-4 px-6 shadow-md">
                <h1 className="text-2xl font-semibold text-center">ProtoScanner Dashboard</h1>
            </header>

            {/* Menu */}
            <nav className="bg-white shadow-md rounded-md mt-6 w-11/12 max-w-5xl">
                <ul className="flex justify-around py-4">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <button
                                onClick={() => setActiveMenu(index)}
                                className={`text-gray-800 font-medium hover:text-blue-500 ${activeMenu === index ? "text-blue-500" : ""
                                    }`}
                            >
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Carousel Section */}
            <main className="flex-grow p-6 w-11/12 max-w-5xl bg-white shadow-md rounded-md mt-6">
                <Carousel className="relative">
                    <CarouselContent>
                        {menuItems[activeMenu].subMenu.map((subItem, subIndex) => (
                            <CarouselItem key={subIndex}>
                                <div className="p-4">
                                    <div className="bg-gray-100 shadow rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                            {subItem.name}
                                        </h3>
                                        <div>{subItem.component}</div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </main>

            {/* Footer */}
            <footer className="mt-auto w-full bg-gray-200 py-4 text-center text-sm text-gray-600">
                © 2024 ProtoScanner. Todos los derechos reservados.
            </footer>
        </div>
    );
};

export default ReportePage;
