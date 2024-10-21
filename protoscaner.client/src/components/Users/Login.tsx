import React from 'react';

const Login: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 lg:p-16 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesi�n</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electr�nico</label>
                        <input
                            type="email"
                            id="email"
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
                            placeholder="tuemail@ejemplo.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contrase�a</label>
                        <input
                            type="password"
                            id="password"
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
                            placeholder="********"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Iniciar Sesi�n
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    �No tienes una cuenta? <a href="#signup" className="text-blue-600 hover:underline">Reg�strate aqu�</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
