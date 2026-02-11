import express from "express";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.get("/dashboard", verificarToken, soloAdmin, (req, res) => {
    res.json({
        message: "Bienvenido al dashboard de administración",
        admin: {
            nombre:req.usuario.name,
            email:req.usuario.email,
            rol:req.usuario.rol
        }
    });
});

export default router;