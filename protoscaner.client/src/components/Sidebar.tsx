import React, { useState } from 'react';
import { FaCog, FaUserInjured, FaTruck, FaTachometerAlt, FaUsers, FaFileAlt, FaTimes, FaBars } from 'react-icons/fa'; // Añadimos FaFileAlt para el ícono de reportes
import { useNavigate } from 'react-router-dom'; // Actualizamos useHistory a useNavigate

interface SidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
    const [activeItem, setActiveItem] = useState<string>('Dashboard');
    const [isMinimized, setIsMinimized] = useState<boolean>(false);
    const navigate = useNavigate(); // Reemplazamos useHistory por useNavigate

    // Función para manejar la navegación
    const handleNavigation = (route: string, item: string) => {
        setActiveItem(item); // Actualizamos el item activo
        navigate(route); // Navegamos a la ruta correspondiente con useNavigate
    };

    const toggleMinimized = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <aside
            className={`fixed top-0 left-0 z-40 h-screen pt-16 transition-transform transform bg-gray-100 border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 
                ${isMinimized ? 'w-16' : 'w-64'} ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
            aria-label="Sidebar"
        >
            <div className="flex justify-between px-4">
                {/* Toggle button for large screens */}
                <button
                    onClick={toggleMinimized}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hidden lg:block"
                >
                    {isMinimized ? <FaBars className="w-6 h-6" /> : <FaTimes className="w-6 h-6" />}
                </button>

                {/* Close button for small screens */}
                <button
                    onClick={toggleSidebar}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 lg:hidden"
                >
                    <FaTimes className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar Menu */}
            <div className="h-full px-3 pb-4 mt-5 overflow-y-auto">
                <ul className="space-y-4 font-medium">
                    <li>
                        <a
                            href="#"
                            onClick={() => handleNavigation('/dashboard', 'Dashboard')}
                            className={`flex items-center p-2 rounded-lg transition-colors duration-300 
                                ${activeItem === 'Dashboard' ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                        >
                            <FaTachometerAlt className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            <span className={`ml-3 ${isMinimized ? 'hidden' : 'inline'}`}>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={() => handleNavigation('/pacientes', 'Pacientes')}
                            className={`flex items-center p-2 rounded-lg transition-colors duration-300 
                                ${activeItem === 'Pacientes' ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                        >
                            <FaUserInjured className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            <span className={`ml-3 ${isMinimized ? 'hidden' : 'inline'}`}>Pacientes</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={() => handleNavigation('/gestion-usuarios', 'GestionUsuarios')}
                            className={`flex items-center p-2 rounded-lg transition-colors duration-300 
                                ${activeItem === 'GestionUsuarios' ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                        >
                            <FaUsers className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            <span className={`ml-3 ${isMinimized ? 'hidden' : 'inline'}`}>Gestión de Usuarios</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={() => handleNavigation('/mantenimiento', 'Mantenimiento')}
                            className={`flex items-center p-2 rounded-lg transition-colors duration-300 
                                ${activeItem === 'Mantenimiento' ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                        >
                            <FaCog className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            <span className={`ml-3 ${isMinimized ? 'hidden' : 'inline'}`}>Mantenimiento</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={() => handleNavigation('/entrega', 'Entrega')}
                            className={`flex items-center p-2 rounded-lg transition-colors duration-300 
                                ${activeItem === 'Entrega' ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                        >
                            <FaTruck className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            <span className={`ml-3 ${isMinimized ? 'hidden' : 'inline'}`}>Entrega</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={() => handleNavigation('/reportes', 'Reportes')}
                            className={`flex items-center p-2 rounded-lg transition-colors duration-300 
                                ${activeItem === 'Reportes' ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                        >
                            <FaFileAlt className="w-6 h-6 text-gray-500 dark:text-gray-400" /> {/* Ícono para Reportes */}
                            <span className={`ml-3 ${isMinimized ? 'hidden' : 'inline'}`}>Reportes</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
