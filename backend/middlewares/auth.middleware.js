import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const verificarToken = async (req, res, next) =>{
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message:"Token requerido"});
        }
        const token = authHeader.split(" ")[1];
        //Decodifica el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        //Consulta el usuario actualizado en la BD
        const usuario = await User.findById(decoded.id).select("-password");
        if (!usuario){
            return res.status(401).json ({message:"Usuario no encontrado"});
        }
        //Guardamos el usuario completo en req para usarlo en los controladores
        req.usuario = usuario;
        next();
        
    } catch (error) {
        if (error.name === "TokenExpiredError"){
            return res.status(401).json({message:"Token expirado, Inicia sesion nuevamente"});
        }
        if (error.name === "JsonWebTokenError"){
            return res.status(401).json({message:"Token invalido"});
        }
        res.status(500).json({message:"Error en la autenicacion", error:error.message});
        
    }
};

//Admin
export const soloAdmin = async (req, res, next) =>{
    if (req.usuario.rol !== "admin"){
        return res.status(403).json({message:"acceso denegado: se requiere rol admin"});
    }
    next();
};
//Usuario
export const soloUser = async (req, res, next) =>{
    if (req.usuario.rol !== "user"){
        return res.status(403).json({message:"acceso denegado: se requiere rol user"});
    }
    next();
};