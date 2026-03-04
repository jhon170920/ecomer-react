// Esta es la pagina de recuperar aqui se ingresa el correo para enviar el codigo de recuperacion, 
// luego se redirige a la pagina de codigo recuperar para ingresar el codigo y la nueva contraseña

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Layout/Navbar";

export default function Recuperar() {
  const [email, setEmail] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para la animación
  const navigate = useNavigate();

  const handleEnviarCodigo = async () => {
    if (!email.trim()) {
      alert("Por favor, ingresa tu correo electrónico");
      return;
    }

    setLoading(true); // Activar carga

    try {
      const response = await axios.post(
        "http://localhost:8081/api/recuperar/solicitar-codigo",
        { email }
      );

      if (response.status === 200) {
        setCodigoEnviado(true);
        // Tiempo suficiente para que el usuario lea el mensaje de éxito
        setTimeout(() => {
          navigate("/codigo-recuperar", { state: { email } });
        }, 3000);
      }
    } catch (error) {
      console.error("Error al enviar el código:", error);
      alert("Error al enviar el código. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false); // Desactivar carga
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 transition-all duration-500">
          {!codigoEnviado ? (
            <div className="animate-in fade-in duration-500">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  Recuperar contraseña
                </h1>
                <p className="text-gray-500 mt-2">
                  Ingresa tu correo y te enviaremos un código de recuperación
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2 ml-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <button
                onClick={handleEnviarCodigo}
                disabled={loading}
                className="w-full py-4 bg-linear-to-r from-purple-600 to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-70 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
                ) : (
                  "Enviar código"
                )}
              </button>
            </div>
          ) : (
            <div className="text-center py-6 animate-in zoom-in duration-500">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Código enviado!
              </h3>
              <p className="text-gray-500">
                Hemos enviado las instrucciones a:<br/>
                <span className="font-semibold text-purple-600">{email}</span>
              </p>
              <div className="mt-8 flex justify-center space-x-1">
                <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}