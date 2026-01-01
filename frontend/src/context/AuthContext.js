import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(authService.getUser());
    const [token, setToken] = useState(authService.getToken());

    useEffect(() => {
        setUser(authService.getUser());
        setToken(authService.getToken());
    }, []);

    const login = async (credentials) => {
        const data = await authService.login(credentials);
        setUser(data.user);
        setToken(data.token);
        return data;
    };

    const register = async (payload) => {
        const data = await authService.register(payload);
        setUser(data.user);
        setToken(data.token);
        return data;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;