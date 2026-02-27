import React from "react";
import Navbar from "../Layout/Navbar";
import Footerpage from "../Layout/Footer";


export default function Contacto() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Gracias por contactarnos. Nos pondremos en contacto contigo pronto.");
        console.log("Formulario enviado");
    };
    return(
        <div className="flex min-h-screen flex-col">
        <Navbar/>
    <main className="flex-1 w-full h-full mx-auto mt-6 m-8">
      <h1 className="text-4xl text-center mt-2">Contáctenos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mx-auto max-w-6xl px-4">
        
        {/* LEFT: Formulario */}
        <div className="sm:w-full mx-auto md:col-span-1 lg:col-span-1">
          <section
            id="contactenos-section"
            className="bg-white border border-gray-300 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-bold mb-4">Envíanos un mensaje</h3>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-1 border border-gray-200 p-4 rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <label htmlFor="nombre">
                  <p>Nombre completo</p>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Tu nombre completo"
                    required
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  />
                </label>

                <label htmlFor="email">
                  <p>Correo electrónico</p>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Tu@email.com"
                    required
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  />
                </label>

                <label htmlFor="telefono">
                  <p>Teléfono</p>
                  <input
                    type="tel"
                    name="telefono"
                    id="telefono"
                    placeholder="+57 300 000 0000"
                    required
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  />
                </label>

                <label htmlFor="consulta">
                  <p>Tipo de consulta</p>
                  <select
                    name="consulta"
                    id="consulta"
                    required
                    defaultValue=""
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    <option value="soporte">Soporte técnico</option>
                    <option value="ventas">Información de ventas</option>
                    <option value="otros">Otros</option>
                  </select>
                </label>
              </div>

              <div className="flex flex-col mt-4">
                <label htmlFor="mensaje">
                  <p>Mensaje</p>
                  <textarea
                    name="mensaje"
                    id="mensaje"
                    placeholder="Escribe tu mensaje aquí..."
                    required
                    rows="6"
                    className="border border-gray-300 p-2 rounded-lg resize-y w-full"
                  ></textarea>
                </label>

                <div className="mt-3">
                  <label className="flex items-center text-sm gap-2">
                    <input type="checkbox" className="mr-2" required />
                    <span>
                      He leído y acepto la{" "}
                      <a href="#" className="text-blue-600 underline">
                        política de privacidad
                      </a>{" "}
                      y el tratamiento de mis datos personales
                    </span>
                  </label>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Enviar mensaje
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>

        {/* RIGHT: Información */}
        <aside className="container md:col-span-1 space-y-6">
          
          <section className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold mb-2">Información de contacto</h4>

            <p className="text-sm text-gray-600">
              <strong>Oficina Principal</strong>
              <br />
              Carrera 11 #93-07 Oficina 501
              <br />
              Bogotá D.C., Colombia
              <br />
              Zona Rosa - Chapinero
            </p>

            <br />

            <p className="text-sm text-gray-600">
              <strong>Teléfonos</strong>
              <br />
              Línea fija: +57 (1) 234-5387
              <br />
              Celular: +57 300 137 4556
            </p>

            <br />

            <p className="text-sm text-gray-600">
              <strong>Horarios</strong>
              <br />
              Lunes a Viernes: 8:00 AM - 6:00 PM
              <br />
              Sábados: 9:00 AM - 3:00 PM
              <br />
              Domingos y Festivos: Cerrado
            </p>
          </section>

          <section className="bg-blue-200 p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold mb-2">¿Por qué elegirnos?</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✔ Atención personalizada</li>
              <li>✔ Soporte técnico post-venta incluido</li>
              <li>✔ Garantía extendida</li>
              <li>✔ Envíos gratis en compras superiores a $500.000</li>
            </ul>
          </section>

        </aside>
      </div>
    </main>
    <Footerpage/>
       </div>
    );
}