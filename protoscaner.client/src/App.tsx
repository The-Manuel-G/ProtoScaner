import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ContentGrid from './components/ContentGrid';

const App: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar abierto por defecto en pantallas grandes

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="relative">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main content */}
            <div
                className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64 blur-sm lg:blur-none' : 'ml-0'
                    }`} // Apply blur only on mobile and move content when sidebar is open
            >
                <ContentGrid />
            </div>
        </div>
    );
};

export default App;
