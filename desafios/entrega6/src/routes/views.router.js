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



router.get('/chat',(req,res)=>{
    res.render('chat');
})


export default router