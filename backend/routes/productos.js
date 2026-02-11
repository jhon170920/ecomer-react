import express from "express";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js";
import { crearProductos, obtenerProductos, actualizarProductos, eliminarProductos} from "../controllers/productos.js";

const router=express.Router();
//ver productos (useer y admin)
router.get("/", verificarToken, obtenerProductos);
//ruta crear producto
router.post("/", verificarToken, soloAdmin, crearProductos);
// ruta actualizar producto
router.put("/:id", verificarToken, soloAdmin, actualizarProductos);
//ruta eliminar producto
router.delete("/:id", verificarToken, soloAdmin, eliminarProductos);

export default router;