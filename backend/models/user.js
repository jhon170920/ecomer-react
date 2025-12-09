import mongoose from "mongoose";

const usershema = new mongoose.Schema({
    email: {type:String, require:true},
    name:{type:String, require:true},
    pass:{type:String, require:true},
    tel:{type:Number, require:true, minlenght:12},
});
//forzamos la conexion a que guarde la informacion en la base de datos
const user=mongoose.model("usuarios", usershema, "usuarios")

export default user;