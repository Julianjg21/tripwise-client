// src/api/useApi.js

import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { refreshAccessToken } from './Auth/refreshToken.mjs';

export function useApi() {
    const { accessToken, setAccessToken, logout } = useAuth();

    const api = axios.create({
        baseURL: 'http://localhost:8080/api',
        withCredentials: true,
    });

    api.interceptors.request.use(
        (config) => {
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const newAccessToken = await refreshAccessToken();
                    setAccessToken(newAccessToken);
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    logout();
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );

    return api;
}
