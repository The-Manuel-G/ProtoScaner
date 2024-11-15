import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaUser, FaRulerCombined, FaVial, FaAmbulance } from 'react-icons/fa';
import { FaScrewdriverWrench } from 'react-icons/fa6';

interface MenuItem {
    label: string;
    icon: JSX.Element;
    route: string;
}

const MiniMenu: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const location = useLocation();

    const menuItems: MenuItem[] = [
        { label: 'Perfil', icon: <FaUser />, route: `/paciente/${id}` },
        { label: 'Medidas', icon: <FaRulerCombined />, route: `/MedidasPaciente/${id}` },
        { label: 'Pruebas', icon: <FaVial />, route: `/PruebasSoker/${id}` },
        { label: 'Entregas', icon: <FaAmbulance />, route: `/EntregaByPaciente/${id}` },
        { label: 'Mantenimientos', icon: <FaScrewdriverWrench />, route: `/Mantenimiento-id-paciente/${id}` },
    ];

    return (
        <div className="fixed top-8 right-8 w-56 bg-white shadow-2xl rounded-xl p-4 border border-gray-200 transition-shadow duration-300 hover:shadow-xl">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Accesos Rapidos</h3>
            <div className="space-y-3">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.route;
                    return (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.route)}
                            className={`flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors duration-300
                                ${isActive ? 'bg-blue-100 text-blue-600 shadow-md' : 'bg-white text-gray-800 hover:bg-blue-50 hover:text-blue-600'}
                            `}
                        >
                            <div className={`text-xl ${isActive ? 'text-blue-500' : 'text-blue-400'}`}>
                                {item.icon}
                            </div>
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default MiniMenu;

