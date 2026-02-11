import productos from "../models/productos.js"

//crear producto

export const crearProductos = async(req,res)=>{
    try {
        const { productId, Nombre, Descripcion, Precio, Imagen } = req.body;
    
        const newProduct = new productos({
          productId,
          Nombre,
          Descripcion,
          Precio,
          Imagen,
        });
    
        await newProduct.save();
        res.status(201).json({ message: "Producto guardado con éxito" });
      } catch (error) {
        console.error("Error al guardar el producto:", error);
        res.status(400).json({ message: "Error al ingresar el producto" });
      }
    };
    
    export const obtenerProductos = async (req, res) => {
      try{
        const ListProductos = await productos.find();
      res.json(ListProductos)
      }catch (error){
        res.status(500).json({message:"Error al obtener los productos"});
      }
    
};
//actualizar producto
export const actualizarProductos = (req, res) => {
   try {
     const { id } = req.params
    const product = productos.findByIdAndUpdate(id, req.body, { new: true});
    if (!product){
        return res.status(404).json({message:"Producto no encontrado"});
    }
    res.json(product);
   } catch (error) {
    res.status(500).json({message:"Error al actualizar el producto"});
   }
};
// eliminar producto
export const eliminarProductos = (req, res) => {
    try {
        const { id } = req.params;
      const product = productos.findByIdAndDelete(id);
      if (!product){
          return res.status(404).json({message:"Producto no encontrado"});
      }
      res.json({message:"Producto eliminado con exito"});
    } catch (error) {
      res.status(500).json({message:"Error al eliminar el producto"});
    }
}
    

export default productos;
