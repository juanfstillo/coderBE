const UserManager = require('./userManager');
const userManager = new UserManager();

const nuevoUsuario = {
    Nombre : 'Juan',
    Apellido : 'Perez',
    'Nombre de usuario': 'jperez',
    Contraseña: 'miContraseñaSegura'
}

const mensajeValidacion = UserManager.validarUsuario(nombreUsuario, contraseña);