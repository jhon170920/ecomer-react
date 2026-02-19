import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";


const PrivateRoute = ({children, rolRequerido})=>{
    const {usuario}= useAuth();
    //si no hay usuario en contexto, ir al Login
    if (!usuario){
        return <Navigate to="/login" replace />;
    }
    // si el rol no coincide
    if (rolRequerido && usuario.rol !== rolRequerido){
        return usuario.rol === "admin"
        ? <Navigate to="/admin" replace />
        : <Navigate to="/productos" replace />;
    }
    return children;
    }

    export default PrivateRoute;