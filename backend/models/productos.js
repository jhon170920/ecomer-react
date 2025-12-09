import mongoose from "mongoose"
const productshema = new mongoose.Schema({
    productId: {type:String, required:true, unique:true},
    Nombre:{type:String, required:true},
    Descripcion:{type:String, required:true},
    Precio:{type:Number, required:true},
    Imagen:{type:String, required:true},
});
//forzamos la conexion a que guarde la informacion en la base de datos
const product=mongoose.model("productos", productshema, "productos")

export default product;
