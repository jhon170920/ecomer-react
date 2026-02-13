import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://localhost:8081/api/productos";
function ImageUploader({value, onChange}) {
    const inputRef = useRef();
}
const processFile = (file) =>{
    if (!file) return;
    // solo acepta archivos de imagen
    if (!file.type.startsWith("image/")){
        return;
    }
    //Maximo de 5 MB
    if (file.size > 5 * 1024 * 1024){
        alert("La imagen no puede superar los 5 MB.")
        return;
    }
    //Convertir a base64
    const reader = new FileReader();
    reader.onload = (e) => onchange(e.target.result);
    reader.readAsDataURL(file);
};
//cuando el usuario selecciona un archivo con el explorador
const handleFileInput = (e) => processFile(e.target.files[0]);

// cuando el usuario suelta un archivo sobre la zona
const handleDrop = (e) =>{
    e.preventDefault();         //Evita que el navegador abra el archivo
    SetDragging(false);
    processFile(e.dataTransfer.files[0]);
};
//cuando el archivo entra en la zona de drop
const handleDragOver = (e) =>{
    e.preventDefault();  // Necesaario para que onDrop Funcione
    setDragging(true);
};
// cuando el archivo sale de la zona sin soltarlo
const handleDragLeave = () => setDragging(false);

//Quitar la imagen seleccionada
const handleRemove = () =>{
    onChange("");
    if (inputRef.current) inputRef.current.value  =""; //limpia el input
};
return(
    <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">
        Imagen del Producto *
        </label>
        {/* si ya hay imagen: mostrar preview con botones de camnbiar/quitar */}
        {value ? (
            <div className=" relative w-full h-44 rounded-xl overflow-hidden">
                <div className="relative w-full h-44 rounded-xl overflow-hidden border-2 border-purple-200 bg-gray-50 group">
                    <img src={value} alt="preview" className="w-full "></img>

                </div>
            </div>


        )}
    </div>
)

