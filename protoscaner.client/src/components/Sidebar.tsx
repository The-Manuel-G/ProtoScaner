import { useContext } from "react";
import logo from "../assets/ProtoScanner3D.png";
import { GiRobotLeg } from "react-icons/gi";
import { FaUserMd, FaHome, FaChartPie, FaCartArrowDown, FaProcedures } from "react-icons/fa";
import { AiOutlineLeft } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../App";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

interface LinkItem {
    label: string;
    icon: JSX.Element;
    to: string;
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
    const ModSidebaropen = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const themeContext = useContext(ThemeContext);

    const CambiarTheme = () => {
        if (themeContext) {
            themeContext.setTheme((prevTheme: string) => (prevTheme === "light" ? "dark" : "light"));
        }
    };

    return (
        <div
            className={`${sidebarOpen ? "w-64 md:w-72 lg:w-80" : "w-16"} 
            bg-gray-800 h-screen flex flex-col justify-between p-2 md:p-4 transition-all duration-500 ease-in-out fixed top-0 left-0 z-50 overflow-hidden`}
        >
            {/* Botón para cerrar/abrir el sidebar */}
            <button
                onClick={ModSidebaropen}
                className="text-white text-2xl hover:text-gray-400 transition-all duration-300 ease-in-out self-center mb-4"
            >
                <AiOutlineLeft className={`transition-transform duration-500 ease-in-out ${sidebarOpen ? "" : "rotate-180"}`} />
            </button>

            {/* Contenido del logo */}
            <div className="flex items-center justify-center space-x-2 mb-8">
                <img
                    src={logo}
                    className={`transition-all duration-300 ease-in-out ${sidebarOpen ? "w-12 h-12" : "w-8 h-8"}`}
                    alt="Logo"
                />
                {sidebarOpen && (
                    <h2 className="text-white text-lg md:text-xl font-bold">
                        ProtoSystem
                    </h2>
                )}
            </div>

            {/* Enlaces principales */}
            <div className="flex-grow mt-4 space-y-4">
                {linksArray.map(({ icon, label, to }) => (
                    <NavLink
                        key={label}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 text-white p-2 rounded-md hover:bg-gray-700 transition-all ${isActive ? "bg-gray-700" : ""}`
                        }
                    >
                        <div className="text-xl md:text-2xl">{icon}</div>
                        {sidebarOpen && (
                            <span className="text-sm md:text-md lg:text-lg block">
                                {label}
                            </span>
                        )}
                    </NavLink>
                ))}
            </div>

            {/* Separador */}
            <div className="my-4 border-t border-gray-600"></div>

            {/* Enlaces secundarios */}
            <div className="space-y-4">
                {secondarylinksArray.map(({ icon, label, to }) => (
                    <NavLink
                        key={label}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 text-white p-2 rounded-md hover:bg-gray-700 transition-all ${isActive ? "bg-gray-700" : ""}`
                        }
                    >
                        <div className="text-xl md:text-2xl">{icon}</div>
                        {sidebarOpen && (
                            <span className="text-sm md:text-md lg:text-lg block">
                                {label}
                            </span>
                        )}
                    </NavLink>
                ))}
            </div>

            {/* Cambiar tema */}
            <div className="mt-4 md:mt-8 flex items-center">
                {sidebarOpen && (
                    <span className="text-white text-sm mr-2">
                        {themeContext?.theme === "light" ? "Light" : "Dark"}
                    </span>
                )}
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        onClick={CambiarTheme}
                    />
                    <div className="w-10 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition-all duration-500 ease-in-out relative">
                        <span
                            className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transform transition-transform duration-500 ease-in-out ${themeContext?.theme === "dark" ? "translate-x-5" : ""}`}
                        />
                    </div>
                </label>
            </div>
        </div>
    );
}

//#region Data links
const linksArray: LinkItem[] = [
    {
        label: "Home",
        icon: <FaHome />,
        to: "/",
    },
    {
        label: "Protesis",
        icon: <GiRobotLeg />,
        to: "/protesis",
    },
    {
        label: "Reportes",
        icon: <FaChartPie />,
        to: "/reportes",
    },
    {
        label: "Entregas",
        icon: <FaCartArrowDown />,
        to: "/entregas",
    },
    {
        label: "Mantenimiento",
        icon: <FaProcedures />,
        to: "/mantenimiento",
    },
];

const secondarylinksArray: LinkItem[] = [
    {
        label: "Ajustes Usuarios",
        icon: <FaUserMd />,
        to: "/usuarios",
    },
    {
        label: "Salir",
        icon: <MdLogout />,
        to: "/login",
    },
];
//#endregion
