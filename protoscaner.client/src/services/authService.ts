// src/services/authService.ts

import apiClient from '../api/client';
import { LoginDTO, LoginResponse } from '../types/authTypes';

export async function login(loginData: LoginDTO): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', loginData);
    const token = response.data.token;

    // Guarda el token en localStorage
    localStorage.setItem('token', token);

    return response.data;
}

export function logout() {
    // Eliminar el token de localStorage para cerrar sesión
    localStorage.removeItem('token');
}
