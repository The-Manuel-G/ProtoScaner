import React, { useState, createContext } from "react";
import { MyRoutes } from "./routers/routes";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";

// Define el tipo del contexto
interface ThemeContextType {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

// Inicializa el contexto con un valor predeterminado para TypeScript
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function App() {
    const [theme, setTheme] = useState("light");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div
                className={`${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"} min-h-screen transition-colors duration-300`}
            >
                <BrowserRouter>
                    <div className="flex h-screen">
                        {/* Sidebar */}
                        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                        {/* Contenido principal */}
                        <div
                            id="main-content"
                            className={`flex-1 p-6 ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300 ${sidebarOpen ? "blur-sm md:blur-none" : ""}`}
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
