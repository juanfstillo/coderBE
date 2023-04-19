const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }))

// filtramos por género masculino (M) y femenino (F)


const usuarios = [
    { id: 1, nombre: 'Juan', genero: "M" },
    { id: 2, nombre: 'María', genero: "F" },
    { id: 3, nombre: 'Pedro', genero: "M" },
    { id: 2, nombre: 'Dalia', genero: "F" },
];

app.get('/', (req, res) => {

    let genero = req.query.genero;

    let pr
    // si no se ingresó género, o el género no es M ni F, no vale el filtro

    if (!genero || (genero != "M" && genero != "F")) return res.send({usuarios})

    // filtramos por género

    let usuariosFiltrados = usuarios.filter(usuario => usuario.genero === genero);
    res.send({usuarios : usuariosFiltrados})
});


app.listen(8080,()=>console.log("Preparado para hacer filtros"))