const UserManager = require('./UserManager');

const userManager = new UserManager();

const nombreUsuario = 'jperez';
const contraseña = 'miContraseñaSegura';

const mensajeValidacion = userManager.validarUsuario(nombreUsuario, contraseña);