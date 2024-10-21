// src/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, // Usa la URL de la API definida en .env
});

// Opcional: Interceptores para manejar autenticación o errores globales
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Manejo de errores global aquí (por ejemplo, redirigir al login si es un 401)
    if (error.response && error.response.status === 401) {
        // Aquí podrías hacer algo como redirigir al login
    }
    return Promise.reject(error);
});

export default apiClient;
