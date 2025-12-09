import express from "express";
import { registrarUser } from "../controllers/user.js";

const router =express.Router();
//Ruta para registrar
router.post("/register", registrarUser);
export default router

