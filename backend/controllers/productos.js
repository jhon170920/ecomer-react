import productos from "../models/productos.js"

// Crear producto
export const crearProductos = async (req, res) => {
  try {
    const { productId, Nombre, Descripcion, Precio, Image } = req.body; // ✅ Image no Imagen

    const newProduct = new productos({
      productId,
      Nombre,
      Descripcion,
      Precio,
      Image, // ✅ consistente con el frontend
    });

    await newProduct.save();
    res.status(201).json({ message: "Producto guardado con éxito" });
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    res.status(400).json({ message: "Error al ingresar el producto", error: error.message });
  }
};

// Obtener productos
export const obtenerProductos = async (req, res) => {
  try {
    const ListProductos = await productos.find();
    res.json(ListProductos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

// Actualizar producto
export const actualizarProductos = async (req, res) => { // ✅ async
  try {
    const { id } = req.params;
    const product = await productos.findByIdAndUpdate(id, req.body, { new: true }); // ✅ await
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

// Eliminar producto
export const eliminarProductos = async (req, res) => { // ✅ async
  try {
    const { id } = req.params;
    const product = await productos.findByIdAndDelete(id); // ✅ await
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};