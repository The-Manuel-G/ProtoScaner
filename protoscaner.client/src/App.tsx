import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { MyRoutes } from "./routers/routes";
import { ThemeContext } from "./components/ThemeContext";

function App() {
    const [theme, setTheme] = useState("light");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <ThemeContext.Provider value={{ setTheme, theme }}>
            <div className={`min-h-screen ${theme === "light" ? "bg-white" : "bg-gray-900"} transition-all duration-300`}>
                <BrowserRouter>
                    {/* Navbar fijo en la parte superior */}
                    <Navbar />

                    <div className="flex">
                        {/* Sidebar dinámico */}
                        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                        {/* Contenido principal que ajusta su tamaño basado en el tamaño del Sidebar */}
                        <div
                            className={`flex-1 p-6 pt-20 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"
                                }`}
                        >
                            <MyRoutes />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
