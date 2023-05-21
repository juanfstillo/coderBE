import express from "express";
const router = express.Router();

import ProductManager from "../controllers/products.js";

import { uploader } from "../utils.js";

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

router.get('/chat',(req,res)=>{
    res.render('chat');
})


export default router