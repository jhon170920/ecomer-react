import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // ✅ Inicializa desde localStorage para persistir al recargar
    const [usuario, setUsuario] = useState(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        const token = localStorage.getItem("token");
        if (usuarioGuardado && token) {
            return { ...JSON.parse(usuarioGuardado), token };
        }
        return null;
    });

    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:8081/api/login", {
                email: email,
                password: password
            });
            const data = response.data;

            // ✅ Guardar en localStorage para que persista
            localStorage.setItem("token", data.token);
            localStorage.setItem("usuario", JSON.stringify(data.usuario));

            setUsuario({
                ...data.usuario,
                token: data.token,
            });

            // Redirigir según el rol
            if (data.usuario.rol === "admin") {
                navigate("/admin");
            } else {
                navigate("/productos");
            }
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Error al iniciar sesion');
            } else if (error.request) {
                throw new Error('No se pudo conectar con el servidor');
            } else {
                throw new Error('Error al procesar la solicitud');
            }
        }
    };

    const logout = () => {
        // ✅ Limpiar localStorage al cerrar sesión
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setUsuario(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};
