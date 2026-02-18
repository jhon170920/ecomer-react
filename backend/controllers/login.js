import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js"; // <-- tu modelo de usuario

export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos obligatorios
    if (!email || !password) {
      return res.status(400).json({ message: "Correo y contraseña obligatorios" });
    }

    // Buscar el usuario por email
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Comparar contraseña ingresada con la guardada (encriptada)
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
     // Generar un token JWT
     const token = jwt.sign(
      {
        id: usuario._id,
        rol: usuario.rol, 

      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Responder con el token y los datos del usuario

    // Inicio de sesión exitoso
    res.status(200).json({ message: "Inicio de sesión correcto",
      token,
      usuario:{
        id:usuario._id,
        name:usuario.name,
        email:usuario.email,
        telefono:usuario.tel,
        rol: usuario.rol,
      }
     });

  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};
