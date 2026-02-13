import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    const login = async (email, pass) => {
    try {
        const response = await axios.post("htttp://localhost:8081/api/login", {
            email: email,
            password: pass
        });
        const data = response.data; // axios ya parse JSON
        //Guardar usuario y Token en memoria
        setUsuario({
            ...data.usuario,
            token: data.token,
        });
        //Redirigir segun el rol
        if (data.usuario.rol === "admin"){
            navigate("/admin");
        } else {
            navigate("/productos");
        }
    } catch (error) {
        //Errores AXIOS
        if (error.response){
            throw new Error(error.response.data.message || 'Error al iniciar sesion');
        }else if(error.request){
            throw new Error('No se pudo conectar con el servidor');
        }else{
            throw new Error('Error al procesar la solicitud');
        }
    }
    };
    const logout = () =>{
        setUsuario=(null);
        navigate("/login");
    
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};

