import express from "express";

import router from "./routes/views.router.js";

import path from 'path';

import __dirname from './utils.js';

import { engine }  from "express-handlebars";

import Message from './dao/models/messages.js';

import session from "express-session";
import MongoStore from "connect-mongo";


const publics = path.join(__dirname, './public');

const app = express();

app.use(express.static(publics));

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use("/", router);


app.engine('handlebars', engine());


app.set('views', __dirname + '/views');


app.set('view engine', 'handlebars');


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log("Connection Error: ", err);
    return;
  }
  console.log(`Server listening on port ${PORT}`);
});

import { Server } from "socket.io";
const io = new Server(server);

// chat
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('chat message', (message) => {
    console.log('Message received:', message);

    const newMessage = new Message({ text: message });
    newMessage.save();

    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Configuración de la sesión
const sessionMiddleware = session({
  secret: "clave123",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl:"mongodb+srv://juanstillo:abc123abc123@ecommerce.ywig996.mongodb.net/?retryWrites=true&w=majority",
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});
app.use(sessionMiddleware);
// Configuración de socket.io y conexión de usuario
io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});



export default app;