// Esta es la pagina de ingresar el codigo de recuperacion y la nueva contraseña
// Se accede a esta pagina desde la pagina de recuperar, se redirige con el email en el state para saber a que correo enviar el codigo

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import axios from "axios";

export default function CodigoRecuperar() {
  const location = useLocation();
  const email = location.state?.email ?? "";
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.email) {
      navigate("/recuperar");
    }
  }, [location.state, navigate]);

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

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8081/api/recuperar/cambiar-password",
        { codigo, nuevaPassword: password, email }
      );

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      }
    } catch (error) {
      console.error(error);
      alert("Error al restablecer la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        {/* Animación de entrada al cargar el componente */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gray-100 animate-in fade-in zoom-in duration-500">
          {!success ? (
            <>
              <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">
                Crear nueva contraseña
              </h1>
              <p className="text-center text-gray-500 mb-8 text-sm">
                Ingresa el código enviado a tu correo
              </p>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Código (5 dígitos)"
                  maxLength={5}
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all hover:border-purple-300"
                />

                <input
                  type="password"
                  placeholder="Nueva contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all hover:border-purple-300"
                />

                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all hover:border-purple-300"
                />

                <button
                  onClick={restablecerPassword}
                  disabled={loading}
                  className="w-full py-3 bg-linear-to-r from-purple-600 to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-70 disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verificando...
                    </>
                  ) : (
                    "Actualizar Contraseña"
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Vista de éxito con animaciones adicionales */
            <div className="text-center py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl animate-bounce">
                ✓
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                ¡Todo listo!
              </h3>
              <p className="text-gray-500 px-4">
                Tu contraseña ha sido actualizada correctamente.
              </p>
              <div className="mt-8 flex justify-center">
                <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 animate-progress origin-left"></div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4">Redirigiendo al login...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}