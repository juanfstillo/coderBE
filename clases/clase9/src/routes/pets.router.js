import { Router } from 'express';
//import { uploader } from '../utils.js';


const router  = Router();
const pets = [];

router.get('/',(req,res)=>{
    res.send({pets})
})

// JSON PETS

router.post('/',(req,res)=>{
    const pet = req.body;
    pets.push(pet);
    console.log(pets);
    res.send({status:"success"})
})
export default router;