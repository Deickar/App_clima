import React, { useState } from 'react';
import { registrarUsuario } from '../auth';
import { useNavigate, Link } from 'react-router-dom';
import Mapa from './Mapa';

const Registro = () => {
  const [email, setEmail] = useState('');
  const [dpi, setDpi] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !dpi || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }
    // Validar formato de DPI
    const dpiRegex = /^\d{4}\s\d{5}\s\d{4}$/;
    if (!dpiRegex.test(dpi)) {
      setError('El formato del DPI no es válido. Debe ser xxxx xxxxx xxxx.');
      return;
    }

    const exito = registrarUsuario({ email, dpi, password });
    if (exito) {
      navigate('/login');
    } else {
      setError('El correo electrónico ya está registrado.');
    }
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
          <h1 className="text-2xl font-bold text-center text-slate-100 md:text-gray-900">Registro</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 md:text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-slate-800/50 border border-slate-400/30 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:bg-white md:text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 md:text-gray-700">DPI (xxxx xxxxx xxxx)</label>
              <input
                type="text"
                value={dpi}
                onChange={(e) => setDpi(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-slate-800/50 border border-slate-400/30 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:bg-white md:text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 md:text-gray-700">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-slate-800/50 border border-slate-400/30 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:bg-white md:text-gray-900"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div>
              <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Registrarse
              </button>
            </div>
          </form>
          <p className="text-sm text-center text-slate-300 md:text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 md:text-indigo-600 md:hover:text-indigo-500">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
