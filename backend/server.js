import express from 'express';
import cors from 'cors';
import "./db/db.js";
import ProductRoutes from "./routes/productos.js";
import userRoutes from './routes/user.js';
import { loginUsuario } from './controllers/login.js';

const app = express();
//habilitar todas la rutas
app.use(cors());
app.use(express.json());

// primer ruta

app.get('/',(req,res)=> {
    res.send('bienvenido al curso node y express')
});
//api producto
app.use("/api/productos",ProductRoutes);
app.use("/api/user", userRoutes);
app.use("/api/login", loginUsuario);

app.listen(8081,()=>console.log('servidor corriendo en http://localhost:8081'));