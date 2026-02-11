import express from 'express';
import cors from 'cors';
import "./db/db.js";
import ProductRoutes from "./routes/productos.js";
import userRoutes from './routes/user.js';
import { loginUsuario } from './controllers/login.js';
import PerfilRouter from './routes/perfil.js';
import RecuperarPassword from './routes/recuperar.js'
import pedidoRoutes from './routes/pedido.js';

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
app.use("/api/perfil", PerfilRouter);
app.use("/api/Recuperar", RecuperarPassword);
app.use("/api/pedido", pedidoRoutes);


app.listen(8081,()=>console.log('servidor corriendo en http://localhost:8081'));