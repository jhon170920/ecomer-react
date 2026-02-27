// productos
import Navbar from "../Layout/Navbar";
import Footerpage from "../Layout/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // importar bien la ruta del contexto
import { useAuth } from "../../context/AuthContext";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const { agregarAlCarrito } = useCart(); // solo esto
  const {usuario} = useAuth(); // obtener el usuario del contexto de autenticación
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await axios.get('http://localhost:8081/api/productos');
        setProductos(res.data);
      } catch (error) {
        console.error("Error al cargar productos", error);
      }
    };
    obtenerProductos();
  }, []);
    const handleComprar = (producto) => {
        if (!usuario){
            alert("Debes iniciar sesión para agregar productos al carrito.");
            navigate('/login', { state: { from: '/productos' } }); // redirige a la página de login si no hay usuario
        return;
        }
        agregarAlCarrito(producto);
    };
  
    return(
    <div className="flex min-h-screen flex-col">
    <Navbar/>
     <div className="flex-1">
        {/* buscador y filtros */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            {/* <!--Barra de busqueda--> */}
            <div className="mb-6">
                <div className="relative">
                    <input type="text"
                    placeholder="Buscar productos..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    id="search-input"/>
                    <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>
            </div>
            {/* <!--Filtros--> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* <!--Filtro Categoria--> */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" id="category-filter">
                        <option value="">Todas las Categorías</option>
                        <option value="laptops">Laptops</option>
                        <option value="celulares">Celulares</option>
                        <option value="componentes">Componentes</option>
                        <option value="accesorios">Accesorios</option>
                    </select>
                </div>
                {/* <!--Filtro precio--> */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" id="price-filter">
                        <option value="">Cualquier precio</option>
                        <option value="0-500000">$0 - $500.000</option>
                        <option value="500000-1500000">$500.000 - $1.500.000</option>
                        <option value="1500000-3000000">$1.500.000 - $3.000.000</option>
                        <option value="3000000+">$3.000.000+</option>
                    </select>
                </div>
                {/* <!--Filtro Ordenamiento--> */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" id="price-filter">
                        <option value="relevance">Relevancia</option>
                        <option value="price-asc">Precio: Menor a Mayor</option>
                        <option value="price-desc">Precio: Mayor a Menor</option>
                        <option value="name">Nombre A-Z</option>
                        <option value="newest">Más Nuevos</option>
                    </select>
                </div>
            </div>
        </div>
      {/* Grid de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productos.map((producto) => (
            <div key={producto.productId} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                
                <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img src={producto.Image} alt={producto.Nombre} className="w-full h-full object-cover hover:scale-105 transition transform duration-300" />
                <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">-15%</div>
                </div>

                <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800">{producto.Nombre}</h3>
                <p className="text-sm text-gray-600 mb-4">{producto.Descripcion}</p>
                
                <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                    ${(producto.Precio || 0).toLocaleString('es-CO')}
                    </span>
                </div>

                <div className="flex text-yellow-600 mb-4">⭐️⭐️⭐️⭐️⭐️</div>

                <div className="flex space-x-2">
                    <button className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition flex-1 text-sm">
                    Ver Detalles
                    </button>
                    <button 
                    onClick={() => handleComprar(producto)}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition flex-1 text-sm"
                    >
                    Comprar
                    </button>
                </div>
                </div>
            </div>
            ))}
        </div>
    </div>
    <Footerpage/>
    </div>

)}
