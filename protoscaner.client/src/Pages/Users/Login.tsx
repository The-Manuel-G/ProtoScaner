import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="bg-white rounded-xl shadow-2xl p-12 md:p-16 lg:p-20 w-full max-w-md">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Iniciar Sesi&oacute;n</h2>
                <form>
                    <div className="mb-8">
                        <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">Correo Electr&oacute;nico</label>
                        <InputText
                            id="email"
                            type="email"
                            className="w-full p-4 text-lg rounded-md border border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            placeholder="tuemail@ejemplo.com"
                        />
                    </div>
                    <div className="mb-10">
                        <label htmlFor="password" className="block text-lg font-semibold text-gray-700 mb-2">Contrase&ntilde;a</label>
                        <Password
                            id="password"
                            feedback={false}
                            toggleMask
                            className="w-full p-4 text-lg rounded-md border border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            placeholder="********"
                        />
                    </div>
                    <Button
                        type="submit"
                        label="Iniciar Sesi&oacute;n"
                        className="w-full p-button-rounded p-button-lg text-xl font-bold"
                        style={{ backgroundColor: '#2563EB', borderColor: '#2563EB' }}
                    />
                </form>
                <p className="mt-8 text-center text-gray-700 text-lg">
                    ¿No tienes una cuenta?{' '}
                    <a href="#signup" className="text-blue-600 font-semibold hover:underline">
                        Reg&iacute;strate aqu&iacute;
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
