import user from "../models/user.js";
import bcrypt from "bcrypt";
//crear usuario
export const registrarUser=async(req,res)=>{
    try {
        const{email, name, pass, tel}=req.body;
        //validar informacion
        if (!email||!name||!pass||!tel){
            return res.status(400).json({message: "llene los campos"})
         }         
        //valida el usuario si ya exite
        const existeUsuario = await user.findOne({email});
        if(existeUsuario){
            return res.status(400).json({message:"Usuario ya esta registrado"});
        }
        //Encriptar contraseña
        const saltRounds = 10;
        const hasherPassword = await bcrypt.hash(pass, saltRounds);
        //Crear usuario en la base de datos
        const newusuario = new user({email, name, pass:hasherPassword, tel});
        await newusuario.save();
        res.status(201).json({message: "Usuario registrado con exito"});
    }catch (error) {
        res.status(500).json({message: "Error al registrar el usuario", error:error.message});
    };
};