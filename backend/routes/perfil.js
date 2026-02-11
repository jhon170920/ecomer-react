import express from "express";
import { obtenerPerfil, actualizarPerfil, eliminarPerfil } from "../controllers/perfil.js";

const router=express.Router();
//ruta para obtener el perfil del usuario
router.post('/obtener', obtenerPerfil);
//ruta para actualizar el perfil del usuario
router.put('/actualizar', actualizarPerfil);
router.delete('/eliminar', eliminarPerfil);


export default router;