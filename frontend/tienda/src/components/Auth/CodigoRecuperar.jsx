import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import axios from "axios";

export default function CodigoRecuperar() {
    const location = useLocation();
    const email = location.state?.email ?? ""; // Obtener email del estado o usar cadena vacía
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  if (!location.state?.email) {
    navigate("/recuperar");
  }
}, []);

  const restablecerPassword = async () => {

    if (!codigo.trim() || !password.trim() || !passwordConfirm.trim()) {
      alert("Por favor, completa todos los campos");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== passwordConfirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/recuperar/cambiar-password",
        { codigo, nuevaPassword: password, email }
      );

      if (response.status === 200) {
        setSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }

    } catch (error) {
      console.error(error);
      alert("Error al restablecer la contraseña");
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">

          {!success ? (
            <>
              <h1 className="text-2xl font-bold text-center mb-6">
                Crear nueva contraseña
              </h1>

              <input
                type="text"
                placeholder="Código (5 dígitos)"
                maxLength={5}
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="w-full mb-4 px-4 py-3 border rounded-xl"
              />

              <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 px-4 py-3 border rounded-xl"
              />

              <input
                type="password"
                placeholder="Confirmar contraseña"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full mb-6 px-4 py-3 border rounded-xl"
              />

              <button
                onClick={restablecerPassword}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl"
              >
                Restablecer contraseña
              </button>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">
                ¡Contraseña actualizada!
              </h3>
              <p>Serás redirigido al inicio de sesión...</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}