//open
import open from 'open'

//utils
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
export default __dirname;

//express
import express from 'express'
const app = express()
app.use(express.static(__dirname + '/public'));

//socket
import {Server} from 'socket.io'

//morgan
import morgan from 'morgan'
app.use(morgan('dev'))

//router
import viewRouter from './routes/views.router.js'


//handeblars
import { engine } from 'express-handlebars'
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//api
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//pm
import ProductManager from "./services/ProductManager.js"
const ProductManager1 = new ProductManager("products.json")


const httpServer = app.listen(8080, () => {

    console.log(`servidor escuchando en http://localhost:8080/`);
    // open("http://localhost:8080");
})
const io = new Server(httpServer);

app.use((req,res,next)=>{
    if(req.body && req.body._method){
        req.method = req.body._method;
        delete req.body._method;
    }
    next();
});
app.use('/',viewRouter);
app.use("/realtimeproducts",viewRouter);
app.use("/socketexample",viewRouter);


io.on('connection', async (socket) => {
    console.log('Socket.io: A client has connected.');
    const products= await ProductManager1.getProducts()
  
    // Emitir un evento con los datos que se mostrarán en el listado
    socket.emit('listData', products);
  });

