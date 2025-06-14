// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { getProfile, logoutUser } from '../services/api';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            setIsAuthenticated(false);
            return;
        }

        try {
            const response = await getProfile();
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Auth check failed:', error);
            // If token is invalid, remove it
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        logoutUser();
        setUser(null);
        setIsAuthenticated(false);
    };

    const updateUser = (userData) => {
        setUser(userData);
    };

    return {
        user,
        loading,
        isAuthenticated,
        logout,
        updateUser,
        checkAuthStatus
    };
};
