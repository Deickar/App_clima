import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Mapa from "./Mapa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Limpiamos errores previos al enviar el formulario

    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // Expresión regular simple para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    // Para la demostración, si el email es válido, se permite el acceso.
    navigate("/home");
  };

  return (
    <div className="relative md:flex md:h-screen">
      {/* Mapa en el fondo en móvil, a la izquierda en desktop */}
      <div className="absolute inset-0 md:relative md:w-2/3 md:h-full">
        <Mapa />
      </div>

      {/* Formulario superpuesto en móvil, a la derecha en desktop */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 md:w-1/3 md:bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-slate-900/60 backdrop-blur-lg border border-slate-400/20 md:bg-white md:border-0 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-slate-100 md:text-gray-900">
            Iniciar Sesión
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 md:text-gray-700">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-slate-800/50 border border-slate-400/30 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:bg-white md:text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 md:text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-slate-800/50 border border-slate-400/30 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:bg-white md:text-gray-900"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
          <p className="text-sm text-center text-slate-300 md:text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/registro"
              className="font-medium text-indigo-400 hover:text-indigo-300 md:text-indigo-600 md:hover:text-indigo-500"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
