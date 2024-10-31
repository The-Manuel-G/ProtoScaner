import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";

import EntregaPage from '../pages/Paciente/Potesis/EntregaPage';
import { Reportepage } from '../pages/Paciente/Reportepage';
import { UserDashboard } from '../pages/Users/UserDashboard';
import { MantenimientoPage } from '../pages/Paciente/Potesis/Mantenimiento/MantenimientoPage';
import { UserRegistrationForm } from '../pages/Users/UserRegistrationForm';
import { Protesispage } from '../pages/Paciente/Potesis/ProtesisPage';
import RegistroPaciente from '../pages/Paciente/RegistroPaciente'; // Si es una exportación por defecto
import Login from '../Pages/Users/Login';

export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/protesis" element={<Protesispage />} />
      <Route path="/usuarios" element={<UserDashboard />} />
      <Route path="/reportes" element={<Reportepage />} />
      <Route path="/entregas" element={<EntregaPage />} />
      <Route path="/mantenimiento" element={<MantenimientoPage />} />
      <Route path="/Usuario-Registro" element={<UserRegistrationForm />} />
      <Route path="/paciente-Registro" element={<RegistroPaciente />} />
       <Route path="/login" element={<Login />} />

    </Routes>
  );
} Login
