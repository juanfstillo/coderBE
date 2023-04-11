const express = require('express');
const app = express();

app.get('/bienvenida', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});


// Definir la ruta para el método GET en '/saludo'
app.get('/usuarios', (req, res) => {
const usuario = {
    nombre:'juan',
    apellido:'perez',
    edad:30,
    correo:'juan@juan.com'
}
  res.json(usuario);
});
app.get('/usuario', (req, res) => {
  res.send('¡Hola a todos, pero ahora desde el rout de express!');
});
// Iniciar el servidor en el puerto 8080
app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});