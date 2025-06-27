// src/api/useApi.js

import axios from "axios";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { refreshAccessToken } from "./auth/refreshToken.mjs";

// Function to refresh the access token and intercept API requests
export function useApi() {
  const { accessToken, setAccessToken, logout } = useAuth();

  // Create an Axios instance with the base URL and credentials
  const api = axios.create({
    baseURL: "http://localhost:8080/api", // Base URL for the API
    withCredentials: true, // Include credentials in requests
  });

  // Interceptors to handle the access token and refresh logic
  api.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  // Interceptor to handle 401 Unauthorized responses
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      // If the request fails with a 401 status, attempt to refresh the access token
      const originalRequest = error.config;

      // Check if the error is a 401 Unauthorized and if the request has not been retried yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await refreshAccessToken(); // Call the function to refresh the access token
          setAccessToken(newAccessToken); // Update the access token in the context
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; // Set the new access token in the request headers
          return api(originalRequest); // Retry the original request with the new access token
        } catch (refreshError) {
          logout(); // If refreshing the token fails, log out the user
          return Promise.reject(refreshError); // Reject the promise with the refresh error
        }
      }
      // If the error is not a 401 Unauthorized or if the request has already been retried, reject the promise with the original error
      return Promise.reject(error);
    }
  );

  return api;
}
