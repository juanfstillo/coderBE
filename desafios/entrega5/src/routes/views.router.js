import { Router } from 'express';
import ProductManager from '../services/ProductManager.js'
const router = Router()
const ProductManager1 = new ProductManager("products.json")

router.get('/', async (req, res) => {
    const products = await ProductManager1.getProducts();
    res.render('index',{products})
})

router.get('/realtimeproducts',async(req,res)=>{
    const products = await ProductManager1.getProducts();
    res.render('realTimeProducts',{products});

})

router.post('/',async(req,res)=>{
    const {body} = req;
    const newProduct = await ProductManager1.addProduct(body);
    const products = await ProductManager1.getProducts();
    res.render('realTimeProducts',{products});

})

router.delete('/',async(req,res)=>{
    const id = req.body.id;
    const msg = await ProductManager1.deleteProduct(id);
    const products = await ProductManager1.getProducts();
    res.render('realTimeProducts',{products});

})

router.get('/socketExample', async (req, res) => {
    const products = await ProductManager1.getProducts();
    res.render('socketExample',{products})
})

export default router