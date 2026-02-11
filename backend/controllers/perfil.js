import users from "../models/user.js"
import bcrypt from 'bcrypt'

//obtener perfil del usuario de la base de datos

export const obtenerPerfil = async (req, res ) =>{
    try {
        const {email} = req.body;
        if(!email){
            return res.status(400).json({message:"Email es requerido"});
        }
        //Traer el correo del usuario desde la base de datos
        const usuario = await users.findOne({email:email}).select('-pass');
        if(!usuario){
            return res.status(400).json({message:"Usuario no encontrado"});
        }
        res.status(200).json({
            usuario:{
                id:usuario._id,
                name:usuario.name,
                email:usuario.email,
                telefono:usuario.tel
            }

        });
    } catch (error) {
        res.status(500).json({
            message:"error al obtener el perfil", error: error.message
        });
    }
}

//Actualizar perfil del usuario
 export const actualizarPerfil = async (req, res) =>{
    try {
        const {email, name, telefono} = req.body; 
        if(!email || !name){
            return res.status(400).json({message:"Email y Nombre son requeridos"});
        }
        //Buscar y actualizar el usuario en la base de datos
        const usuario = await users.findOneAndUpdate(
            {email:email},
            {
                email:email,
                name:name,
                tel:telefono
            },
            {new:true}
        ).select('-pass');
        if(!usuario){
            return res.status(400).json({message:"Usuario no encontrado"});
        }
        res.status(200).json({
            usuario:{
                id:usuario._id,
                name:usuario.name,
                email:usuario.email,
                telefono:usuario.tel
            }
        });
    } catch (error) {
        res.status(500).json({
            message:"error al actualizar el perfil", error: error.message
        });
    }
};

//Eliminar perfil del usuario
export const eliminarPerfil = async (req, res) =>{
    try {
        const {email} = req.body;
        // Validar que el email sea proporcionado
        if(!email){
            return res.status(400).json({
                message:"Email es requeridos"
            });
        }
        //Buscar e eliminar a el usuario en la base de datos
        const usuarioEliminado = await users.findOneAndDelete({
            email:email
        });
        if(!usuarioEliminado){
            return res.status(404).json({
                message:"Usuario no encontrado"
            });
    }
        res.status(200).json({
            message:"Usuario eliminado exitosamente",
            users: {
                id:usuarioEliminado._id,
                name:usuarioEliminado.name,
                email:usuarioEliminado.email,
                telefono:usuarioEliminado.tel
            }
        });
    } catch (error) {
        res.status(500).json({
            message:"Error al eliminar el perfil", error: error.message
        });
    }
};