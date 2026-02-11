import mongoose from "mongoose";

// Schema corregido con estructura adecuada para múltiples productos
const pedidosSchema = new mongoose.Schema({
    // Array de productos con sus detalles
    productos: [{
        producto_id: { type: String, required: true },
        nombre_producto: { type: String, required: true },
        precio_unitario: { type: Number, required: true },
        cantidad: { type: Number, required: true, min: 1 }
    }],
    
    // Precio total del pedido
    precio_total: { type: Number, required: true, min: 0 },
    
    // Información del cliente
    email: { 
        type: String, 
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
    },
    telefono: { 
        type: String,  // Cambiado a String para manejar + y espacios
        required: true,
        trim: true
    },
    
    // Estado del pedido (typo corregido: procesando)
    estado_pedido: {
        type: String,
        enum: ['pendiente', 'procesando', 'entregado', 'cancelado'],
        default: 'pendiente'
    },
    
    // Fecha del pedido (con default)
    fecha_pedido: { 
        type: Date, 
        default: Date.now 
    },
    
    // Información de envío
    direccion: { 
        type: String, 
        required: true,
        trim: true
    },
    
    // Método de pago
    metodo_pago: { 
        type: String, 
        required: true,
        enum: ['efectivo', 'tarjeta', 'transferencia']
    }
}, {
    timestamps: true  // Agrega createdAt y updatedAt automáticamente
});

// Índices para búsquedas rápidas
pedidosSchema.index({ email: 1, fecha_pedido: -1 });
pedidosSchema.index({ estado_pedido: 1 });

const Pedido = mongoose.model("pedidos", pedidosSchema, "pedidos");

export default Pedido;