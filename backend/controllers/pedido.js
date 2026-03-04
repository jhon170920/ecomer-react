import Pedido from "../models/pedidos.js";
import { enviarEmailPedido } from "../utils/email.js";

export const crearPedido = async (req, res) => {
  try {
    const { productos, email, telefono, direccion, metodo_pago, precio_total } = req.body;

    // Validaciones
    if (!productos || productos.length === 0)
      return res.status(400).json({ message: "El pedido debe contener al menos un producto" });
    if (!email || !telefono || !direccion || !metodo_pago)
      return res.status(400).json({ message: "Faltan campos obligatorios" });

    const productosFormateados = productos.map(item => ({
      producto_id: item.producto_id,
      nombre_producto: item.nombre,
      precio_unitario: Number(item.precio),
      cantidad: Number(item.cantidad)
    }));

    const newPedido = new Pedido({
      productos: productosFormateados,
      precio_total,
      email,
      telefono,
      direccion,
      metodo_pago,
      fecha_pedido: new Date(),
      estado_pedido: 'pendiente'
    });

    await newPedido.save();

    // Enviar correo al usuario
    // Crear HTML del correo con estilos con diseño de acuerddo a la tienda
    const emailHTML = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; color: #333;">
    <div style="background: linear-gradient(135deg, #7b2ff7 0%, #4a148c 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 1px;">Pedido recibido</h1>
      <p style="color: rgba(255,255,255,0.9); margin-top: 10px;">¡Gracias por tu compra!</p>
    </div>

    <div style="padding: 30px; line-height: 1.6;">
      <p style="font-size: 16px;">Hola, hemos recibido tu pedido con éxito y ya estamos trabajando en él.</p>
      
      <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #4a148c; border-bottom: 2px solid #7b2ff7; display: inline-block;">Resumen de Compra</h3>
        <ul style="list-style: none; padding: 0;">
          ${productosFormateados.map(p => `
            <li style="padding: 10px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;">
              <span><strong>${p.nombre_producto}</strong> (x${p.cantidad})</span>
              <span style="color: #666;">$${p.precio_unitario}</span>
            </li>
          `).join('')}
        </ul>
        <p style="font-size: 18px; text-align: right; margin-top: 15px;"><strong>Total: <span style="color: #7b2ff7; font-size: 22px;">$${precio_total}</span></strong></p>
      </div>

      <div style="margin-top: 25px;">
        <p><strong>📍 Dirección de envío:</strong> ${direccion}</p>
        <p><strong>💳 Método de pago:</strong> ${metodo_pago}</p>
      </div>

      <div style="text-align: center; margin-top: 30px;">
        <a href="#" style="background-color: #7b2ff7; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">Ver mi pedido</a>
      </div>
    </div>

    <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888;">
      © 2026 Encuentra la mejor - Laptops, celulares y componentes PC.
    </div>
  </div>
`;

    await enviarEmailPedido({
      to: email,
      subject: "Confirmación de tu pedido",
      html: emailHTML
    });

    res.status(201).json({
      message: "Pedido creado con éxito y email enviado",
      pedido: {
        id: newPedido._id,
        total: precio_total,
        estado: newPedido.estado_pedido
      }
    });

  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ message: "Error interno del servidor al crear el pedido" });
  }
};


