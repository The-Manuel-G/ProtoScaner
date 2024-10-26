import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import 'primereact/resources/themes/saga-blue/theme.css'; // Estilo de PrimeReact
import 'primereact/resources/primereact.min.css'; // Componentes de PrimeReact
import 'primeicons/primeicons.css'; // Iconos de PrimeReact

const Login: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 lg:p-16 w-full max-w-sm">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Iniciar Sesión</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <InputText
                            id="email"
                            type="email"
                            className="w-full p-inputtext-lg"
                            placeholder="tuemail@ejemplo.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <Password
                            id="password"
                            feedback={false} // Desactiva la retroalimentación de seguridad de contraseña
                            className="w-full"
                            placeholder="********"
                            toggleMask // Opción para mostrar/ocultar la contraseña
                        />
                    </div>
                    <Button
                        type="submit"
                        label="Iniciar Sesión"
                        className="w-full p-button-rounded p-button-lg"
                        style={{ backgroundColor: '#1D4ED8', borderColor: '#1D4ED8' }} // Azul personalizado
                    />
                </form>
                <p className="mt-4 text-center text-gray-600">
                    ¿No tienes una cuenta? <a href="#signup" className="text-blue-600 hover:underline">Regístrate aquí</a>
                </p>
            </div>
        </div>
    );
};

export default Login;

