import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa'; // Importamos el ícono de campana
import ProtoScannerLogo from '../assets/ProtoScanner3D.png'; // Importamos el logo desde la carpeta assets

interface NavbarProps {
    toggleSidebar: () => void; // Prop para alternar el sidebar
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // Controlamos el menú de notificaciones

    // Ref for the user menu
    const userMenuRef = useRef<HTMLDivElement>(null);
    // Ref for the notification menu
    const notificationRef = useRef<HTMLDivElement>(null);

    // Function to handle clicks outside the menus
    const handleClickOutside = (event: MouseEvent) => {
        // Close user menu if click outside
        if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
            setIsUserMenuOpen(false);
        }
        // Close notification menu if click outside
        if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
            setIsNotificationsOpen(false);
        }
    };

    // Set up event listener on component mount, and clean up on unmount
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="fixed top-0 z-50 w-full bg-gray-800 border-b border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    {/* Sección izquierda del Navbar */}
                    <div className="flex items-center justify-start">
                        {/* Botón hamburguesa solo visible en móviles */}
                        <button
                            className="inline-flex items-center p-2 text-sm text-gray-400 rounded-lg lg:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            onClick={toggleSidebar} // Botón para alternar el sidebar
                        >
                            <span className="sr-only">Abrir sidebar</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                ></path>
                            </svg>
                        </button>
                        {/* Logo */}
                        <a href="#" className="flex ml-2 md:mr-24">
                            <img src={ProtoScannerLogo} className="h-8 mr-3" alt="ProtoScanner Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                                ProtoScanner
                            </span>
                        </a>
                    </div>

                    {/* Sección derecha del Navbar */}
                    <div className="flex items-center">
                        {/* Notificaciones */}
                        <div className="relative mr-4" ref={notificationRef}>
                            <button
                                type="button"
                                className="p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} // Toggle de las notificaciones
                            >
                                <span className="sr-only">Ver notificaciones</span>
                                <FaBell className="w-6 h-6" />
                            </button>
                            {/* Desplegable de notificaciones */}
                            {isNotificationsOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-700 text-gray-300 rounded-lg shadow-lg">
                                    <div className="p-4">
                                        <h4 className="font-semibold text-white">Notificaciones</h4>
                                        <ul className="mt-2 space-y-2">
                                            <li className="text-sm">No tienes nuevas notificaciones</li>
                                            {/* Aquí puedes añadir más notificaciones dinámicamente */}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Menú de usuario */}
                        <div className="relative" ref={userMenuRef}>
                            <button
                                type="button"
                                className="flex text-sm bg-gray-800 rounded-full focus:ring-2 focus:ring-gray-600"
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} // Toggle del menú de usuario
                            >
                                <span className="sr-only">Abrir menú de usuario</span>
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    alt="user photo"
                                />
                            </button>
                            {/* Desplegable del menú de usuario */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 text-base list-none bg-gray-700 divide-y divide-gray-600 rounded-lg shadow-lg">
                                    <div className="px-4 py-3">
                                        <p className="text-sm text-white">Neil Sims</p>
                                        <p className="text-sm font-medium text-gray-300 truncate">
                                            neil.sims@flowbite.com
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                                            >
                                                Dashboard
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                                            >
                                                Ajustes
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                                            >
                                                Historial
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                                            >
                                                Salir
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
