import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './Pages/Dashboard';
import UserDashboard from './Pages/Users/UserDashboard';
import PacientesComponent from './Pages/Paciente/PacientesPage';
import MantenimientoComponent from './Pages/Paciente/Potesis/Mantenimiento/MantenimientoComponent';
import EntregaComponent from './Pages/Paciente/Potesis/EntregaPage';
import ReporteComponent from './Pages/Paciente/ReportePage';
import UserRegistrationForm from './Pages/Users/UserRegistrationForm'

// Importar estilos de PrimeReact
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';



const App: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Router>
            <div className="relative">
                <Navbar toggleSidebar={toggleSidebar} />
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                {/* Main content area */}
                <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} pt-20`}>


                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/pacientes" element={<PacientesComponent />} />
                        <Route path="/gestion-usuarios" element={<UserDashboard />} />
                        <Route path="/mantenimiento" element={<MantenimientoComponent />} />
                        <Route path="/entrega" element={<EntregaComponent />} />
                        <Route path="/reportes" element={<ReporteComponent />} />
                        <Route path="/Usuario-Registro" element={<UserRegistrationForm />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
