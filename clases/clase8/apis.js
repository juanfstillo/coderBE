//CONFIGURAMOS SERVER EXPRESS
const exp = require('constants');
const express = require('express');
const app = express();
app.listen(8080, () => console.log("Server on port 8080"));
//RECIBIR JSON
app.use(express.json())
// ENVIAR INFORMACION DESDE LA URL
app.use(express.urlencoded({ extended: true }))


let frase = {texto:"Esto es una frase2"} // Array donde almacenaremos los usuarios

app.get('/api/frase', (req, res) => {
    res.status(200).send(frase);
});

app.get('/api/palabras/:pos', (req, res) => {
    const pos = parseInt(req.params.pos)
    let arr = frase.texto.split(' ')
    arr = arr[pos-1]
    let obj = {buscada:arr}
    res.status(200).send(res.send(obj));
});


app.post('/api/palabras', (req, res) => {
  
  let palabras = req.body;
  console.log(palabras)

  if (!palabras.palabra) {
    res.status(400).send({ status: "error", message: "Incomplete values" });
    return;
  }
  frase.texto = frase.texto.concat(" ").concat(palabras.palabra);
  let arr = frase.texto.split(' ');

  let obj={
    agregada: palabras.palabra,
    posString: frase.texto.indexOf(palabras.palabra),
    posArray: (arr.indexOf(palabras.palabra)+1)

  }
  console.log(frase.texto)

  // si no entró al if, significa que el cliente envio los campos completos

  res.status(200).send(obj);
});

app.put('/api/palabras/:pos', (req, res) => {  
    let pos = parseInt(req.params.pos)
    let arr = frase.texto.split(' ')
    arr = arr[pos-1]
    let palabra = req.body;
    if (!arr) {    
      res.status(404).send({ status: "error", message: "Position not found" });    
      return;  
    }  
    obj={
      actualizada:palabra.palabra,
      anterior:""
    }
    res.status(200).send(obj); 
  });

app.delete('/api/palabras/:pos', (req, res) => {
    let pos = parseInt(req.params.pos)
    let arr = frase.texto.split(' ')
    return
    let nuevoArr = arr.splice(pos-1,1); 
    let nuevoTexto = nuevoArr.join(" ");
    let frase = { texto: nuevoTexto}
    if (!arr) {    
      res.status(404).send({ status: "error", message: "Position not found" });    
      return;  
    }   
    res.status(200).send({ status: "success", message: "Correct" });
  });