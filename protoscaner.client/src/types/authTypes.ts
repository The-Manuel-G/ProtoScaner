// types/authTypes.ts
export interface LoginDTO {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}
