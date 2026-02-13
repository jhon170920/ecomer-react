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
return (
    <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">
        Imagen del Producto *
        </label>
        {/* Si ya hay imagen: mostrar preview con botones de cambiar/quitar */}
    {value ? (
        <div className="relative w-full h-44 rounded-xl overflow-hidden border-2 border-purple-200 bg-gray-50 group">
             <img src={value} alt="preview" className="w-full h-full object-contain" />
            {/* Overlay oscuro que aparece al pasar el mouse */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
            <button type="button" onClick={() => inputRef.current?.click()}
            className="px-4 py-2 bg-white text-gray-800 rounded-lg text-xs font-semibold">
            Cambiar imagen
            </button>
            <button type="button" onClick={handleRemove} className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold">
            Quitar imagen
             </button>
        </div>
    </div>
    ) : (
    /* Si no hay imagen: mostrar zona de drag & drop */
        <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full h-44 rounded-xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center gap-3 transition-all duration-200
        ${dragging
        ? "border-purple-500 bg-purple-50 scale-[1.01]"
        : "border-gray-200 bg-gray-50 hover:border-purple-400 hover:bg-purple-50"
        }`}
        >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center
        ${dragging ? "bg-purple-100" : "bg-gray-100"}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke={dragging ? "#7c3aed" : "#9ca3af"} strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
            </svg>
        </div>
        <div className="text-center">
            <p className={`text-sm font-semibold
            ${dragging ? "text-purple-600" : "text-gray-500"}`}>
            {dragging ? "¡Suelta la imagen aquí!" : "Arrastra una imagen o haz clic"}
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — máximo 5MB</p>
        </div>
    </div>
    )}
    {/* Input de archivo oculto — se activa por clic o por referencia */}
        <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        />
    </div>
    );
                   

                
     

        

 


