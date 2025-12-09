import mongoose from "mongoose";
const uri = "mongodb+srv://adsotarde:jhon1234@ecomer.z3sdkuj.mongodb.net/Tienda?retryWrites=true&w=majority";

mongoose.connect(uri)
.then(()=>console.log("✅conectado en la base de datos 💚"))
.catch(err => console.log("❌ Error al concetar en la base de datos 💔"));