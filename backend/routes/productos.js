import express from "express";
import { crearProducto, obtenerProductos } from "../controllers/productos.js";
const router=express.Router();

//ruta crear producto
router.post("/",crearProducto);
//Ruta para obtener productos
router.get("/", obtenerProductos)
export default router;