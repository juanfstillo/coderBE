const express = require('express');
const app = express();

// Arreglo de usuarios
const usuarios = [
  { id: 1, nombre: 'Juan', edad: 20 },
  { id: 2, nombre: 'María', edad: 25 },
  { id: 3, nombre: 'Pedro', edad: 30 },
];

// Ruta raíz que devuelve todos los usuarios
app.get('/', (req, res) => {
  res.send(usuarios);
});

// Ruta que devuelve un usuario específico por su ID
app.get('/:userId', (req, res) => {
  const usuarioId = parseInt(req.params.userId);
  const usuario = usuarios.find(usuario => usuario.id === usuarioId);
  if (!usuario) {
    return res.status(404).send('Usuario no encontrado');
  }
  res.send(usuario);
});

// Iniciar el servidor en el puerto 8080
app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});