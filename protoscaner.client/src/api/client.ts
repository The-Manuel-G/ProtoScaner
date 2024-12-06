import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Usa la variable de entorno para la base URL
    headers: {
        'Content-Type': 'application/json', // Asegura el tipo de contenido JSON en las solicitudes
    },
});

// Interceptores para manejar errores globales
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.log("No autorizado."); // Mensaje simple sin redirección al login
                // Aquí puedes redirigir al usuario al login cuando implementes la autenticación
            } else if (error.response.status === 403) {
                console.warn("Acceso prohibido: permisos insuficientes.");
            }
        } else if (error.request) {
            console.error("No se recibió respuesta del servidor.");
        } else {
            console.error("Error en la configuración de la solicitud:", error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
