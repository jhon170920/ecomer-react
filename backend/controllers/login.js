import bcrypt from "bcrypt";
import User from "../models/user.js"; // <-- tu modelo de usuario

export const loginUsuario = async (req, res) => {
  try {
    const { email, pass } = req.body;

    // Validar campos obligatorios
    if (!email || !pass) {
      return res.status(400).json({ message: "Correo y contraseña obligatorios" });
    }

    // Buscar el usuario por email
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Comparar contraseña ingresada con la guardada (encriptada)
    const passwordValida = await bcrypt.compare(pass, usuario.pass);
    if (!passwordValida) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Inicio de sesión exitoso
    res.status(200).json({ message: "Inicio de sesión correcto",
      usuario:{
        id:usuario._id,
        Name:usuario.name,
        Email:usuario.email,
        
        telefono:usuario.tel
      }
     });

  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};
