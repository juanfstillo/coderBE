//CONFIGURAMOS SERVER EXPRESS
const exp = require('constants');
const express = require('express');
const app = express();
app.listen(8080, () => console.log("Server on port 8080"));
//RECIBIR JSON
app.use(express.json())
// ENVIAR INFORMACION DESDE LA URL
app.use(express.urlencoded({ extended: true }))

let users = [] // Array donde almacenaremos los usuarios

app.post('/api/user', (req, res) => {
  
  let user = req.body;

  if (!user.first_name || !user.last_name) {
    res.status(400).send({ status: "error", message: "Incomplete values" });
    return;
  }

  // si no entró al if, significa que el cliente envio los campos completos

  users.push(user);
  res.status(200).send({ status: "success", message: "User created" });
});

app.get('/api/users', (req, res) => {
  res.status(200).send({ status: "success", users });
});

app.get('/api/user/:id', (req, res) => {
  let id = req.params.id;

  let user = users.find(user => user.id == id);

  if (!user) {
    res.status(404).send({ status: "error", message: "User not found" });
    return;
  }

  res.status(200).send({ status: "success", user });
});

app.put('/api/user/:id', (req, res) => {  
  let id = req.params.id;  
  let user = users.find(user => user.id == id);  
  if (!user) {    
    res.status(404).send({ status: "error", message: "User not found" });    
    return;  
  }  
  let { first_name, last_name } = req.body;  
  if (first_name) user.first_name = first_name;  
  if (last_name) user.last_name = last_name;  
  res.status(200).send({ status: "success", message: "User updated" }); 
});

app.delete('/api/user/:id', (req, res) => {
  let id = req.params.id;  
  let user = users.find(user => user.id == id);  
  if (!user) {    
    res.status(404).send({ status: "error", message: "User not found" });    
    return;  
  }  
  users = users.filter(user => user.id != id);
  res.status(200).send({ status: "success", message: "User deleted" });
});

