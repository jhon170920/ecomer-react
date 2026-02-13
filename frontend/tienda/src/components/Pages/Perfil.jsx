import { useState } from 'react';
import axios from 'axios';
import Navbar from '../Layout/Navbar';



export default function Perfil() {
    const [editando, setEditando] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        telefono: '',
        email: '',
    });

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    const handleActualizar = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/usuarios/${usuario}`, formData);
            if (response.status === 200) {
                alert('Perfil actualizado con éxito');
                setEditando(false);
                // Actualizar el usuario en localStorage
                const updatedUser = {...usuario, ...formData};
                localStorage.setItem('usuario', JSON.stringify(updatedUser));
            } else {
                alert('Error al actualizar el perfil');
            }
        } catch (error) {
            alert('Error al actualizar el perfil');
            console.error(error);
        }
    }
        
    return(
        <>
         <Navbar />  {/*Agrega el Navbar para mantener la consistencia de la navegación */}
         
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10">
            {/* Header con Avatar */}
            <div className="flex items-center gap-6 pb-8 border-b border-gray-200">
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-3xl shadow-md">
                    {usuario.name[0].toUpperCase()}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{usuario.name}</h2>
                    <p className="text-gray-500">{usuario.email}</p>
                </div>
            </div>

            {/* Formulario */}
            <div className="mt-8 space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Nombre</label>
                    <input
                        type="text"
                        placeholder={usuario.name}
                        disabled={!editando}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl border transition-all ${editando ? "bg-white border-indigo-500" : "bg-gray-100 border-gray-200"}`}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Teléfono</label>
                    <input
                        type="tel"
                        placeholder={usuario.telefono}
                        disabled={!editando}
                        value={formData.telefono}
                        onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl border transition-all ${editando ? "bg-white border-indigo-500" : "bg-gray-100 border-gray-200"}`}
                    />
                </div>

                {/* Botones de Acción */}
                {!editando ? (
                    <button 
                        onClick={() => setEditando(true)}
                        className="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform shadow-lg"
                    >
                        Editar Perfil
                    </button>
                ) : (
                    <div className="flex gap-4">
                        <button onClick={handleActualizar} className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold">Guardar</button>
                        <button onClick={() => setEditando(false)} className="flex-1 py-3 bg-gray-500 text-white rounded-xl font-bold">Cancelar</button>
                    </div>
                )}
            </div>
        </div>
    </>
    )
};

