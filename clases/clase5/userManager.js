const fs = require('fs');
const crypto = require('crypto');

class UserManager{
    constructor(){
        try {
            const usuariosString = fs.readFileSync('Usuarios.json')
            this.usuarios = JSON.parse(usuariosString);

        } catch (error) {
            console.log('No se pudo leer el archivo de usuarios',error);
            this.usuarios = []; 
        }
    }

    crearUsuario(usuario){
        const hash = crypto.createHash('sha256');
        const contraseñaHaseada = hash.update(usuario.Contraseña).digest('hex');

        const nuevoUsuario = {
            Nombre: usuario.Nombre,
            Apellido: usuario.Apellido,
            'Nombre de usuario' : usuario['Nombre de usuario'],
            Contraseña: contraseñaHaseada
           };
        
        this.usuarios.push(nuevoUsuario);
        const usuariosString = JSON.stringify(this.usuarios)

        fs.writeFileSync('Usuarios.json', usuariosString)
    }

    validarUsuario(nombreUsuario,contraseña){

        const usuario = this.usuarios.find((usuario)=>usuario ['Nombre de Usuario'] === nombreUsuario)

        if(!usuario){
            return  ' El usuario no existe'
        }

        const hast = crypto.createHash('sha256');
        const contraseñaHaseada = hast.update(contraseña).digest('hex');
        if(!contraseñaHaseada){
            return  'Contraseña incorrecta'
        }
    }
}

module.exports(UserManager)