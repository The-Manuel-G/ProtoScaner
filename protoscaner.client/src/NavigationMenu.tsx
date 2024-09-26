import './App.css';

import React from 'react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';

const NavigationMenu: React.FC = () => {
    return (
        <nav className="bg-gradient-to-r from-teal-500 to-blue-600 shadow-lg rounded-lg p-4 flex items-center justify-between space-x-4">
            <div className="text-white text-2xl font-semibold">Mi App</div>
            <div className="flex flex-grow justify-center space-x-4">
                <a
                    href="#section1"
                    className="text-white text-lg font-medium hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Apartado 1
                </a>
                <a
                    href="#section2"
                    className="text-white text-lg font-medium hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Apartado 2
                </a>
                <a
                    href="#section3"
                    className="text-white text-lg font-medium hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Apartado 3
                </a>
              
            </div>
            <div className="ml-auto flex items-center space-x-4">
                <a className="text-white text-2xl hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105">
                    <FaHome />
                </a>
                <a className="text-white text-2xl hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105">
                    <FaUser />
                </a>
                <a className="text-white text-2xl hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105">
                    <FaCog />
                </a>
            </div>
        </nav>
    );
};

export default NavigationMenu;
