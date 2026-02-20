import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Layout/Navbar";

export default function Recuperar() {

  const [email, setEmail] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const navigate = useNavigate();

  const handleEnviarCodigo = async () => {
    if (!email.trim()) {
      alert("Por favor, ingresa tu correo electrónico");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/recuperar/solicitar-codigo",
        { email }
      );

      if (response.status === 200) {
        setCodigoEnviado(true);

        setTimeout(() => {
          navigate("/codigo-recuperar", { state: { email } });
        }, 5000);
      }

    } catch (error) {
      console.error("Error al enviar el código:", error);
      alert("Error al enviar el código. Por favor, intenta nuevamente.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">

          {!codigoEnviado ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  Recuperar contraseña
                </h1>
                <p className="text-gray-600 mt-2">
                  Ingresa tu correo y te enviaremos un código de recuperación
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={handleEnviarCodigo}
                className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all"
              >
                Enviar código
              </button>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                ¡Código enviado!
              </h3>
              <p className="text-gray-600">
                Revisa tu bandeja de entrada. Serás redirigido automáticamente...
              </p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}