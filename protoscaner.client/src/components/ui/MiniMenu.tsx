// src/components/ui/MiniMenu.tsx

import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaUser, FaRulerCombined, FaVial, FaAmbulance, FaBars, FaRegCalendarCheck } from 'react-icons/fa';
import { FaScrewdriverWrench, FaXmark } from 'react-icons/fa6';

interface MenuItem {
    label: string;
    icon: JSX.Element;
    route: string;
}

const MiniMenu: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false); // Inicializar cerrado

    const menuItems: MenuItem[] = id ? [
        { label: 'Perfil', icon: <FaUser />, route: `/paciente/${id}` },
        { label: 'Medidas', icon: <FaRulerCombined />, route: `/MedidasPaciente/${id}` },
        { label: 'Pruebas', icon: <FaVial />, route: `/PruebasSoker/${id}` },
        { label: 'Entregas', icon: <FaAmbulance />, route: `/EntregaByPaciente/${id}` },
        { label: 'Cronologia', icon: <FaRegCalendarCheck />, route: `/estatus-paciente/${id}` }, // Ruta actualizada
        { label: 'Mantenimientos', icon: <FaScrewdriverWrench />, route: `/Mantenimiento-id-paciente/${id}` },
    ] : [];

    return (
        <>
            {menuOpen ? (
                <div className="fixed top-8 right-8 w-56 bg-white shadow-2xl rounded-xl p-4 border border-gray-200 transition-shadow duration-300 hover:shadow-xl z-50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">
                            {'Accesos Rapidos'}
                        </h3>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaXmark />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {menuItems.length > 0 && menuItems.map((item) => {
                            const isActive = location.pathname === item.route;
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => navigate(item.route)}
                                    className={`flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors duration-300 ${isActive
                                            ? 'bg-blue-100 text-blue-600 shadow-md'
                                            : 'bg-white text-gray-800 hover:bg-blue-50 hover:text-blue-600'
                                        }`}
                                >
                                    <div
                                        className={`text-xl ${isActive ? 'text-blue-500' : 'text-blue-400'
                                            }`}
                                    >
                                        {item.icon}
                                    </div>
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setMenuOpen(true)}
                    className="fixed top-8 right-8 bg-white p-3 rounded-full shadow-lg hover:shadow-xl z-50"
                >
                    <FaBars className="text-xl text-gray-700" />
                </button>
            )}
        </>
    );
};

export default MiniMenu;
