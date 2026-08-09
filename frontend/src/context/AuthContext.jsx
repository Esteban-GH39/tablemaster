import { createContext, useEffect, useState } from "react";

import apiClient from "../api/apiClient";

export const AuthContext = createContext();

const decodeToken = (token) => {
    try {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
};

function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [claims, setClaims] = useState(
        token ? decodeToken(token) : null
    );

    const [user, setUser] = useState(null);

    const loadProfile = async () => {
        try {
            const { data } = await apiClient.get("/auth/me");
            setUser(data.user);
        } catch {
            setUser(null);
        }
    };

    useEffect(() => {
        if (token) {
            loadProfile();
        }
    }, [token]);

    const login = (newToken) => {
        localStorage.setItem(
            "token",
            newToken
        );
        setToken(newToken);
        setClaims(decodeToken(newToken));
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setClaims(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                isAuthenticated: !!token,
                role: claims?.role ?? null,
                userId: claims?.id ?? null,
                user
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}

export default AuthProvider;