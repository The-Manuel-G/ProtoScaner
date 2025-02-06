// src/routes/MyRoutes.tsx

import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard"; // Importación corregida
import EntregaPage from '../Pages/Paciente/Potesis/EntregaPage';
import ReportePage from '../Pages/Paciente/ReportePage';
import { UserDashboard } from '../Pages/Users/UserDashboard';
import { MantenimientoPage } from '../Pages/Paciente/Potesis/Mantenimiento/MantenimientoPage';
import { UserRegistrationForm } from '../Pages/Users/UserRegistrationForm';
import { Protesispage } from '../Pages/Paciente/Potesis/ProtesisPage';
import RegistroPaciente from '../Pages/Paciente/RegistroPaciente';
import Login from '../Pages/Users/Login';
import PacienteProfile from "../Pages/Paciente/PacienteProfile";
import MedidasPaciente from '../Pages/Paciente/MedidasPaciente';
import PruebasSokerPaciente from '../Pages/Paciente/PruebasSokerPaciente';
import EntregaPaciente from '../Pages/Paciente/EntregaPaciente';
import MantenimientoPaciente from '../Pages/Paciente/MantenimientoPaciente';
import TomaMedidasForm from '../Pages/Paciente/TomaMedidasForm';
import EditPaciente from '../Pages/Paciente/EditPaciente';
import EntregaForm from "../Pages/Paciente/EntregaForm";
import CargaMasivaPacientes from '../Pages/Paciente/CargaMasivaPacientes';
import EstatusPaciente from '../Pages/Paciente/EstatusPaciente'; // Importación directa de EstatusPaciente
import MedidaTransfemoralForm from '../components/pacienteForm/MedidaTransfemoralForm';
export function MyRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard sidebarOpen={true} />} />
            <Route path="/protesis" element={<Protesispage />} />
            <Route path="/usuarios" element={<UserDashboard />} />
            <Route path="/reportes" element={<ReportePage />} />
            <Route path="/entregas" element={<EntregaPage />} />
            <Route path="/Formulario-entregas/:id" element={<EntregaForm />} />
            <Route path="/mantenimiento" element={<MantenimientoPage />} />
            <Route path="/Usuario-Registro" element={<UserRegistrationForm />} />
            <Route path="/paciente-Registro" element={<RegistroPaciente />} />
            <Route path="/paciente/:id" element={<PacienteProfile />} />
            <Route path="/MedidasPaciente/:id" element={<MedidasPaciente />} />
            <Route path="/PruebasSoker/:id" element={<PruebasSokerPaciente />} />
            <Route path="/Mantenimiento-id-paciente/:id" element={<MantenimientoPaciente />} />
            <Route path="/EntregaByPaciente/:id" element={<EntregaPaciente />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Formulario-medidas/:id" element={<TomaMedidasForm />} />
            <Route path="/EditPaciente/:id" element={<EditPaciente />} />
            <Route path="/paciente-cargaMasiva" element={<CargaMasivaPacientes />} />
            {/* Ruta actualizada para usar EstatusPaciente directamente */}
            <Route path="/estatus-paciente/:id" element={<EstatusPaciente />} />
            <Route path="/Formulario-Transfemoral/:id" element={<MedidaTransfemoralForm />} />
        </Routes>
    );
}

export default MyRoutes;
