import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;
const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.text());

expressApp.listen(PORT,()=>
console.log(`Esuchando el puerto ${PORT}`))