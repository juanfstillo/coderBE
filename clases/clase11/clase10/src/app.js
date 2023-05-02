// importando express
const express = require("express");
// destructuración de Server Socket
const  { Server } = require("socket.io");
//importa handlebars
const handlebars = require('express-handlebars');
//importamos el router
const viewsRouter = require ('./routes/views.router.js');
//express
const app = express();
//carpeta de archivos estáticos
app.use(express.static(__dirname+'/public'))
//configuracion del motor de plantillas
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
//router
app.use('/',viewsRouter);
//servidor http
const server = app.listen(8080,()=>console.log("Listening"))
// intanciamos socket . io pasando como parámetro nuestro servidor http
const io = new Server(server);
// crear array vacio
const logs = []
// escuchamos la conexion de un cliente. on es cuando un servidor se conecta
io.on('connection',socket =>{
    console.log("Connected")
    //Message1 se utiliza para la primera fase del ejercicio
    socket.on("message1",data=>{
        io.emit('log',data);
    })

    //Message2 se utiliza para la parte de almacenar y devolver los logs completos.
    socket.on("message2",data=>{
        logs.push({socketid:socket.id,message:data})
        io.emit('log',{logs});
    })
})



