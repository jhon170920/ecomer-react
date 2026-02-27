import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  // Sincronizar con localStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existente = prev.find(item => item.id === producto.productId);
      if (existente) {
        return prev.map(item =>
          item.id === producto.productId
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, {
        id: producto.productId,
        nombre: producto.Nombre,
        precio: producto.Precio,
        imagen: producto.Image,
        cantidad: 1
      }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) return eliminarDelCarrito(id);
    setCarrito(prev =>
      prev.map(item => item.id === id ? { ...item, cantidad } : item)
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

      
    
  return (
    <CartContext.Provider value={{
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      actualizarCantidad,
      vaciarCarrito,
      totalItems,
      totalPrecio
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}