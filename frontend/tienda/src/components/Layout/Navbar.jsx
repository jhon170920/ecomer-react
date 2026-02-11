import { useState, useEffect, useRef } from "react"; // Añadimos useRef para cerrar al hacer clic fuera
import { ShoppingCart, User, Menu, X, LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const [cartCount, setCartCount] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false); // Estado para el dropdown
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }

        // Cerrar menú al hacer clic fuera
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        setUsuario(null);
        setUserMenuOpen(false);
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg mr-3">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            TechStore Pro
                        </h1>
                    </Link>

                    {/* Menú Desktop */}
                    <div className="hidden md:flex space-x-6">
                        <a href="#inicio" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Inicio</a>
                        <a href="#productos" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Productos</a>
                        <a href="#categorias" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Categorías</a>
                        <a href="#contacto" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Contacto</a>
                    </div>

                    {/* Icons Section */}
                    <div className="flex items-center space-x-2">
                        {/* Cart */}
                        <a href="#carrito" className="relative p-2.5 hover:bg-blue-50 rounded-xl transition-all">
                            <ShoppingCart className="w-6 h-6 text-gray-700" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </a>

                        {/* User Profile / Dropdown */}
                        {usuario ? (
                            <div className="relative" ref={dropdownRef}>
                                <button 
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full transition-transform active:scale-95"
                                >
                                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold shadow-md border-2 border-white">
                                        {usuario.name?.charAt(0).toUpperCase()}
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
                                        <div className="px-4 py-3 border-b border-gray-50">
                                            <p className="text-sm text-gray-500">Sesión iniciada como</p>
                                            <p className="text-sm font-semibold text-gray-800 truncate">{usuario.name}</p>
                                        </div>
                                        
                                        <div className="p-1">
                                            <Link 
                                                to="/perfil" 
                                                className="flex items-center space-x-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                <User className="w-4 h-4 text-blue-600" />
                                                <span>Mi Perfil</span>
                                            </Link>
                                            
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Cerrar Sesión</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="p-2.5 hover:bg-blue-50 rounded-xl transition-all">
                                <User className="w-6 h-6 text-gray-700" />
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button onClick={()=> setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2.5 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300">
                            {mobileMenuOpen ?(
                                <X className="w-6 h-6 text-gray-700"/>
                            ):(
                                <Menu className="w-6 h-6 text-gray-700"/>
                            )}
                        </button>
                    </div>
                </div>

               {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 py-4 border-t border-gray-200 animate-in slide-in-from-top duration-300">
                        <div className="flex flex-col space-y-4">
                            <a href="#inicio" className="text-gray-700
                            hove:text-blue-600 font-medium transition-colors duration-200 py-2">
                            Inicio
                            </a>
                            <a href="#productos" className="text-gray-700 hover:text-blue-600
                            font-medium transition-colors duration-200 py-2">
                            Productos
                            </a>
                            <a href="#categorias" className="text-gray-700 hover:text-blue-600
                            font-medium transition-colors duration-200 py-2">
                            Categorías
                            </a>
                            <a href="#contacto" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">
                            Contacto
                            </a>
                        </div>
                    </div>
                    )};
                
            </nav>
        </header>
    );
}

export default Navbar;


