import Pedido from "../models/pedidos.js";

// Crear pedido con validaciones completas
export const crearPedido = async (req, res) => {
    try {
        console.log("📦 Datos recibidos:", JSON.stringify(req.body, null, 2));
        
        const { productos, email, telefono, direccion, metodo_pago, precio_total } = req.body;
        // Validaciones
        if (!productos || productos.length === 0) {
            return res.status(400).json({ 
                message: "El pedido debe contener al menos un producto" 
            });
        }
        if (!email || !telefono || !direccion || !metodo_pago) {
            return res.status(400).json({ 
                message: "Faltan campos obligatorios" 
            });
        }
        // Preparar array de productos con estructura correcta
        const productosFormateados = productos.map(item => ({
            producto_id: item.producto_id,
            nombre_producto: item.nombre,
            precio_unitario: Number(item.precio),
            cantidad: Number(item.cantidad)
        }));

        // Crear nuevo pedido
        const newPedido = new Pedido({
            productos: productosFormateados,
            precio_total: precio_total,
            email: email,
            telefono: telefono,
            direccion: direccion,
            metodo_pago: metodo_pago,
            fecha_pedido: new Date(),
            estado_pedido: 'pendiente'
        });

        console.log("Objeto pedido creado:", JSON.stringify(newPedido, null, 2));

        await newPedido.save();
        
        console.log("Pedido guardado exitosamente con ID:", newPedido._id);
        
        res.status(201).json({ 
            message: "Pedido creado con éxito",
            pedido: {
                id: newPedido._id,
                total: precio_total,
                estado: newPedido.estado_pedido
            }
        });
        
    } catch (error) {
        console.error("Error al crear el pedido:", error);
        
        // Manejar errores de validación de Mongoose
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: "Error de validación",
                errores: Object.values(error.errors).map(e => e.message)
            });
        }
        
        res.status(500).json({ 
            message: "Error interno del servidor al crear el pedido" 
        });
    }
};