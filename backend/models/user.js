import mongoose from "mongoose";

const usershema = new mongoose.Schema({
    email: {type:String, required:true},
    name:{type:String, required:true},
    pass:{type:String, required:true},
    tel:{type:Number, required:true, minlenght: 12},
});
//forzamos la conexion a que guarde la informacion en la base de datos
const user=mongoose.model("usuarios", usershema, "usuarios")

export default user;