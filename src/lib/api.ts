import axios from "axios";
import { useAuthStore } from "@/store/auth.store";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
    const token = useAuthStore
        .getState()
        .accessToken;
    
    const publicRoutes = [
        "/auth/login/",
        "/auth/register/",
        "/auth/forgot-password/",
        "/auth/refresh/",
    ];

    const isPublicRoute = publicRoutes.some((route) =>
        config.url?.includes(route)
    );

    console.log("Access token:", token);
    if (token && !isPublicRoute) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});