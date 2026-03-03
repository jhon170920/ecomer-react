import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, MapPin, FileText, Shield, Package, Clock, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import Navbar from "../Layout/Navbar";
import Footerpage from "../Layout/Footer";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function Carrito() {
  const { carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, totalPrecio } = useCart();
  const navigate = useNavigate();
  const {usuario} = useAuth();


  const [form, setForm] = useState({
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    metodoPago: "efectivo",
    telefono: "", 
  });
  
  const [error, setError] = useState("");


  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const finalizarCompra = async() => {
    //validar sesion
    if (!usuario){
      navigate("/login");
      return;
    }
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    if (!form.direccion || !form.ciudad || !form.codigoPostal) {
      alert("Por favor completa la información de envío.");
      return;
    }
    // Aquí iría la llamada al backend
    setError("");

    try {
      const body ={
        email: usuario.email,
        telefono: form.telefono,
        direccion: `${form.direccion}, ${form.ciudad}, ${form.codigoPostal}`.trim(),
        metodo_pago: form.metodoPago,
        precio_total: totalPrecio,
        productos: carrito.map((item) =>({
          producto_id: item.id,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.cantidad,
        })),
      };
      // llamar al backend con axios
      const response = await axios.post("http://localhost:8081/api/pedido", body, {
        headers:{
          authorization: `Bearer ${usuario.token}`,
          "Content-Type": "application/json",
        },
      });
      //Exito vaciar carrito
      console.log("Pedido realizado:", response.data);
      alert("¡Compra realizada con éxito! 🎉");
      vaciarCarrito();
      navigate("/");
    } catch (error) {
      console.error("Error al finalizar compra:", error);
      setError("Hubo un error al procesar tu compra. Por favor intenta nuevamente.");
    }
  };

  const carritoVacio = carrito.length === 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-900 font-medium">Carrito de Compras</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Título */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-100 p-3 rounded-lg">
              <ShoppingCart className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tu Carrito</h1>
              <p className="text-gray-600">Revisa tus productos antes de finalizar la compra</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── Columna Izquierda: Productos ── */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">

                {/* Carrito vacío */}
                {carritoVacio ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShoppingCart className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h3>
                    <p className="text-gray-600 mb-6">¡Agrega productos para comenzar tu compra!</p>
                    <Link
                      to="/productos"
                      className="inline-block px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Ver Productos
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Cabecera */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-500">
                        {carrito.length} {carrito.length === 1 ? "producto" : "productos"}
                      </span>
                      <button
                        onClick={vaciarCarrito}
                        className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Vaciar carrito
                      </button>
                    </div>

                    {/* Items */}
                    {carrito.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
                      >
                        {/* Imagen */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          {item.imagen ? (
                            <img
                              src={item.imagen}
                              alt={item.nombre}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{item.nombre}</h3>
                          <p className="text-blue-600 font-bold mt-1">
                            ${(item.precio || 0).toLocaleString("es-CO")}
                          </p>
                        </div>

                        {/* Cantidad */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900">
                            {item.cantidad}
                          </span>
                          <button
                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Subtotal item */}
                        <div className="text-right w-28 shrink-0">
                          <p className="font-bold text-gray-900">
                            ${((item.precio || 0) * item.cantidad).toLocaleString("es-CO")}
                          </p>
                          <button
                            onClick={() => eliminarDelCarrito(item.id)}
                            className="mt-1 text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Columna Derecha: Resumen ── */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                {/* Título resumen */}
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Resumen del Pedido</h2>
                </div>

                {/* Totales */}
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-semibold">
                    ${totalPrecio.toLocaleString("es-CO")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Envío</span>
                  <span className="text-green-600 font-semibold">Gratis</span>
                </div>
                <div className="flex justify-between items-center py-4 mb-6">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${totalPrecio.toLocaleString("es-CO")}
                  </span>
                </div>

                {/* Información de envío */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Información de Envío</h3>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm text-gray-600 mb-1">Dirección completa</label>
                    <input
                      type="text"
                      id="direccion"
                      value={form.direccion}
                      onChange={handleChange}
                      placeholder="Ej: Calle 123 #45-67"
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm text-gray-600 mb-1">Teléfono</label>
                    <input
                      type="text"
                      id="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="Ej: 3001234567"
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Ciudad</label>
                      <input
                        type="text"
                        id="ciudad"
                        value={form.ciudad}
                        onChange={handleChange}
                        placeholder="Bogotá"
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Código Postal</label>
                      <input
                        type="text"
                        id="codigoPostal"
                        value={form.codigoPostal}
                        onChange={handleChange}
                        placeholder="110111"
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Método de pago */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Método de Pago
                  </label>
                  <select
                    id="metodoPago"
                    value={form.metodoPago}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="efectivo">💵 Efectivo contra entrega</option>
                    <option value="tarjeta">💳 Tarjeta de crédito</option>
                    <option value="transferencia">🏦 Transferencia bancaria</option>
                  </select>
                </div>

                {/* Botón finalizar */}
                <button
                  onClick={finalizarCompra}
                  disabled={carritoVacio}
                  className="w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Finalizar Compra
                </button>

                {/* Garantías */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-5 h-5 text-green-600 shrink-0" />
                    <span>Compra segura y protegida</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Package className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Envío gratis en compras +$100.000</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>Devoluciones gratis en 30 días</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footerpage />
    </>
  );
}