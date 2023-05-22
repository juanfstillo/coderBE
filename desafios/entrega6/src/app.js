import express from "express";

import router from "./routes/views.router.js";

import path from 'path';

import __dirname from './utils.js';

import { engine }  from "express-handlebars";


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

// chat
import { Server } from "socket.io";
const io = new Server(server);
const messages= [];

io.on('connection',socket=>{
    console.log("Socket connected");

    socket.on('message',data=>{
        messages.push(data);
        io.emit('messageLogs',messages);
    })
})


export default app;