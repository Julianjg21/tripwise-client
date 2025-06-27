import React, { createContext, useContext, useState } from 'react';
import {Navigate} from 'react-router-dom';

const AuthContext = createContext();// Create a context for authentication


export function AuthProvider({ children }) {
    // State to hold the access token
    const [accessToken, setAccessToken] = useState(null);

    const logout = () => {
        setAccessToken(null); // Clear the access token
        <Navigate to="/auth/login" />; // Redirect to the login page
    };

    // Provide the access token and logout function to the context
    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use the AuthContext
export function useAuth() {
    return useContext(AuthContext);
}
