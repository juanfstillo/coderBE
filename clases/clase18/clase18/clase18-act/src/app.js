import  express  from "express"
import mongoose from "mongoose"
import { engine } from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express()

// mongoose.connect('mongodb+srv://CoderUser:123@codercluster.w5adegs.mongodb.net/coderDatabase?retryWrites=true&w=majority')

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views')

app.use(cookieParser());
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret:'secretCoder',
    resave:true,
    saveUninitialized:true
}))

app.use('/',viewsRouter);

app.listen(3000, () => console.log("Esta corriendo en el puerto 3000"));
