const USUARIOS_KEY = 'usuarios';

// Obtener usuarios de localStorage
const obtenerUsuarios = () => {
  const usuarios = localStorage.getItem(USUARIOS_KEY);
  return usuarios ? JSON.parse(usuarios) : [];
};

// Guardar usuarios en localStorage
const guardarUsuarios = (usuarios) => {
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
};

/**
 * Registra un nuevo usuario.
 * @param {object} usuario - El objeto de usuario con email, dpi y password.
 * @returns {boolean} - True si el registro fue exitoso, false si el usuario ya existe.
 */
export const registrarUsuario = (usuario) => {
  const usuarios = obtenerUsuarios();
  const usuarioExistente = usuarios.find(u => u.email === usuario.email);

  if (usuarioExistente) {
    return false; // El usuario ya existe
  }

  usuarios.push(usuario);
  guardarUsuarios(usuarios);
  return true;
};

/**
 * Inicia sesión de un usuario.
 * @param {object} credenciales - El objeto de credenciales con email y password.
 * @returns {boolean} - True si el inicio de sesión fue exitoso, false en caso contrario.
 */
export const iniciarSesion = (credenciales) => {
  const usuarios = obtenerUsuarios();
  const usuarioValido = usuarios.find(u => u.email === credenciales.email && u.password === credenciales.password);

  if (usuarioValido) {
    localStorage.setItem('usuarioAutenticado', 'true');
    return true;
  }
  return false;
};

export const cerrarSesion = () => {
  localStorage.removeItem('usuarioAutenticado');
};

export const estaAutenticado = () => {
  return localStorage.getItem('usuarioAutenticado') === 'true';
};
