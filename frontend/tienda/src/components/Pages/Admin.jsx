import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://localhost:8081/api/productos";

export default function AdminPanel() {
  const { usuario, logout } = useAuth();

  // ==============================
  // STATES
  // ==============================
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("productos");
  const [editando, setEditando] = useState(null);
  const [dragging, setDragging] = useState(false);

  const formInicial = {
    productId: "",
    Nombre: "",
    Descripcion: "",
    Precio: "",
    Image: "",
  };

  const [form, setForm] = useState(formInicial);

  const inputRef = useRef();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${usuario?.token}`,
  };

  // ==============================
  // MENSAJES
  // ==============================
  const mostrarMensaje = (texto) => {
    alert(texto);
  };

  // ==============================
  // FETCH PRODUCTOS
  // ==============================
  const fetchProductos = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProductos(data);
    } catch {
      mostrarMensaje("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // ==============================
  // IMAGE UPLOADER
  // ==============================
  const processFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      mostrarMensaje("Solo se permiten imágenes");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      mostrarMensaje("La imagen no puede superar los 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) =>
      setForm({ ...form, Image: e.target.result });
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e) =>
    processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleRemoveImage = () => {
    setForm({ ...form, Image: "" });
    if (inputRef.current) inputRef.current.value = "";
  };

  // ==============================
  // SUBMIT
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.Image) {
      mostrarMensaje("Debes seleccionar una imagen");
      return;
    }

    try {
      const url = editando
        ? `${API_URL}/${editando._id}`
        : API_URL;

      const method = editando ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({
          ...form,
          Precio: parseFloat(form.Precio),
        }),
      });

      if (!res.ok) throw new Error();

      mostrarMensaje(
        editando
          ? "Producto actualizado"
          : "Producto creado"
      );

      setForm(formInicial);
      setEditando(null);
      setActiveTab("productos");
      fetchProductos();
    } catch {
      mostrarMensaje("Error al guardar producto");
    }
  };

  // ==============================
  // ELIMINAR
  // ==============================
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este producto?"))
      return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers,
      });

      mostrarMensaje("Producto eliminado");
      fetchProductos();
    } catch {
      mostrarMensaje("Error al eliminar");
    }
  };

  // ==============================
  // EDITAR
  // ==============================
  const handleEditar = (prod) => {
    setEditando(prod);
    setForm({
      productId: prod.productId || "",
      Nombre: prod.Nombre || "",
      Descripcion: prod.Descripcion || "",
      Precio: prod.Precio?.toString() || "",
      Image: prod.Image || "",
    });
    setActiveTab("agregar");
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setForm(formInicial);
    setActiveTab("productos");
  };

  // ==============================
  // RENDER
  // ==============================
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-bold">
          Panel Administrativo
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Salir
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setActiveTab("productos");
            cancelarEdicion();
          }}
        >
          Productos ({productos.length})
        </button>

        <button
          onClick={() => {
            setActiveTab("agregar");
            if (!editando) setForm(formInicial);
          }}
        >
          {editando
            ? "Editar Producto"
            : "Agregar Producto"}
        </button>
      </div>

      {/* LISTA */}
      {activeTab === "productos" && (
        <div>
          {loading ? (
            <p>Cargando...</p>
          ) : productos.length === 0 ? (
            <p>No hay productos</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod._id}>
                    <td>{prod.Nombre}</td>
                    <td>
                      $
                      {parseFloat(
                        prod.Precio
                      ).toFixed(2)}
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleEditar(prod)
                        }
                        className="mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() =>
                          handleEliminar(prod._id)
                        }
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* FORMULARIO */}
      {activeTab === "agregar" && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-xl"
        >
          <input
            type="text"
            placeholder="ID Producto"
            value={form.productId}
            required
            onChange={(e) =>
              setForm({
                ...form,
                productId: e.target.value,
              })
            }
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Nombre"
            value={form.Nombre}
            required
            onChange={(e) =>
              setForm({
                ...form,
                Nombre: e.target.value,
              })
            }
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Precio"
            value={form.Precio}
            required
            onChange={(e) =>
              setForm({
                ...form,
                Precio: e.target.value,
              })
            }
            className="w-full border p-2 rounded"
          />

          {/* IMAGE UPLOAD */}
          <div>
            <label className="block mb-2">
              Imagen *
            </label>

            {form.Image ? (
              <div className="relative">
                <img
                  src={form.Image}
                  alt="preview"
                  className="h-40"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                >
                  Quitar
                </button>
              </div>
            ) : (
              <div
                onClick={() =>
                  inputRef.current?.click()
                }
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed p-6 cursor-pointer ${
                  dragging
                    ? "border-purple-500"
                    : "border-gray-300"
                }`}
              >
                Arrastra imagen o haz clic
              </div>
            )}

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          <button className="bg-purple-600 text-white px-4 py-2 rounded">
            {editando
              ? "Guardar Cambios"
              : "Crear Producto"}
          </button>

          {editando && (
            <button
              type="button"
              onClick={cancelarEdicion}
              className="ml-4"
            >
              Cancelar
            </button>
          )}
        </form>
      )}
    </div>
  );
}

