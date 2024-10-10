
import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken);
                console.log(token)
            } catch (error) {
                console.error("Invalid token", error);
                setUser(null);
            }
        }
    }, []);

    const isAdmin = () => {
        console.log(user)
        return user?.role === 'admin';
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};