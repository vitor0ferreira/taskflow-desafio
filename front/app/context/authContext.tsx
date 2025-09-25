'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    id: number;
    user: string;
    iat: number;
    exp: number;
}

interface AuthContextType {
    token: string | null;
    userId: number | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    // Effect para carregar o token do localStorage no inicio
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decoded = jwtDecode<DecodedToken>(storedToken);
                if (decoded.exp * 1000 > Date.now()) {
                    setToken(storedToken);
                    setUserId(decoded.id);
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error("Failed to decode token:", error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const login = (newToken: string) => {
        try {
            const decoded = jwtDecode<DecodedToken>(newToken);
            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUserId(decoded.id);
        } catch (error) {
            console.error("Failed to decode token on login:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUserId(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}


//Custom Hook
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth sem AuthContext');
    }
    return context;
}