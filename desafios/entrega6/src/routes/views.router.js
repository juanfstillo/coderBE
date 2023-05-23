import express from "express";
const router = express.Router();

import ProductManager from "../dao/controllers/products.js";

import CartManager from "../dao/controllers/carts.js";

import { uploader } from "../utils.js";

import { getChatPage, sendMessage } from '../dao/controllers/messages.js';

router.get('/products/list', async (req, res) => {
    try {
        const pm = new ProductManager();
        const products = await pm.getProducts();
        res.status(200).render('index',  {products : products});
    } catch (error) {
        console.error('Error trying to access to product list:', error);
        res.status(500).json({ error: 'Error trying to access to product list' });
    }
});

router.get("/products/create", (req, res) => { res.render('create') });

router.post("/products/create", uploader.single('thumbnails'),(req, res) => { 
    const {title,description,code,price,stock} = req.body
    const filename = req.file.filename;

    if(!title || !description || !code || !price || !stock || !filename) return res.status(400).send({ error: "Incomplete values" });
    
    let product={
        title,
        description,
        code,
        price,
        stock,
        thumbnails:filename
    }

    const pm = new ProductManager();
        pm.createProduct(product);
        res.status(200).send({ success: "Product created" });
     });

router.get('/products/:id', async (req, res) => {
const pId = (req.params.id)
const pm = new ProductManager();
const product = await pm.getProductById(pId);
if (product) {
    res.status(200).json(product)
}else{
     const error = {error: 'Producto not found'}
     return res.status(404).send(error)   
    }
})

router.delete('/products/:id', async (req, res) => {
    const pId = (req.params.id)
    const pm = new ProductManager();
    const product = await pm.deleteProduct(pId);
    if (product) {
        res.status(200).send({ success: "Product deleted" });
    }else{
         const error = {error: 'Producto not found'}
         return res.status(404).send(error)   
        }
})

router.put('/products/:id', async (req, res) => {
    const pId = (req.params.id)
    const {body} = req;
    const pm = new ProductManager();
    const product = await pm.updateProduct(pId,body);
    if (product) {
        res.status(200).send(`Product with the id ${pId} uploaded`)
    }else{
         const error = {error: 'Producto not found'}
         return res.status(404).send(error)   
        }
})

router.post('/cart', async (req,res) => {
    try {
    const cart = new CartManager();
    const newCartId = await cart.createCart();
    res.status(200).send("Cart created succesfully")
    } catch (error) {
    console.error('Errror trying to create a cart:', error);
    res.status(500).json({ error: 'Error trying to create a cart' });
    }
})

router.get('/cart/:id', async (req, res) => {
    const pId = (req.params.id)
    const cart = new CartManager();
    const cartFound = await cart.getCartById(pId);
    if (cartFound) {
        res.status(200).json(cartFound)
    }else{
         const error = {error: 'Cart not found'}
         return res.status(404).send(error)   
        }
    })

router.post('/:cid/products/:pid', async(req, res) => { 
    const cId = (req.params.cid)
    const pId = (req.params.pid)
    const cart = new CartManager();
    try{
        await cart.updateCart(cId,pId)
        res.status(200).send("Cart Updated")
    }catch(error){
        res.status(500).send(`There was a error trying to add a product to your cart ${error}`)
    }
        });


router.get('/chatBU',(req,res)=>{
    res.render('chatBU');
})

// Ruta para cargar la página de chat

router.get('/chat', getChatPage);

// Ruta para enviar un mensaje en el chat
router.post('/send-message', sendMessage);


export default router