
//open

const open = require("open");

// IMPORTAMOS Y CONFIGURAMOS EXPRESS
const express = require("express");

const app = express();

app.use(express.static(__dirname + '/public'));

// MORGAN
const morgan = require('morgan');
app.use(morgan('dev'));


//IMPORTAMOS Y CONFIGURAMOS HANDLEBARS

const { engine } = require('express-handlebars');


app.engine('handlebars', engine());


app.set('views', __dirname + '/views');


app.set('view engine', 'handlebars');


//LANZAMOS EL SERVIDOR

app.listen(8081, () => {

    console.log(`servidor escuchando en http://localhost:8081/`);
    open("http://localhost:8080");
})

app.get('/', (req, res) => {

    res.render('index')

})

app.get('/hello', (req, res) => {

    let user = {
        name: "Mauricio",
        last_name: "Espinosa",
        age: 26,
        phone: "5541231355",
        email: "correomau@correo.com"
    }

    res.render('saludo', user);

})

let food = [

    { name: "Hamburguer", price: "100" },
    { name: "Pizza", price: "200" },
    { name: "Hot Dog", price: "50" },
    { name: "Tacos", price: "80" },
    { name: "Burrito", price: "90" },
    { name: "Sushi", price: "150" },
    { name: "Tostadas", price: "60" },
    { name: "Enchiladas", price: "70" },
    { name: "Tamales", price: "80" },
    { name: "Chilaquiles", price: "90" },


]

app.get('/food', (req, res) => {

    let user = {
        name: "Bruce",
        last_name: "Wayne",
        role: "Admin"
    }

    res.render('food', {

        user: user,
        isAdmin: user.role === "Admin",//false
        food

    });

})