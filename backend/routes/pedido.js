import express from "express"
import {crearPedido} from "../controllers/pedido.js";

const router=express.Router();
//ruta crear pedido
router.post('/', crearPedido)

export default router;