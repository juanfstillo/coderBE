import { Router } from 'express';
import ProductManager from '../services/ProductManager.js'
const router = Router()
const ProductManager1 = new ProductManager("products.json")


router.get('/', async (req, res) => {
    const products = await ProductManager1.getProducts();
    res.status(200).json(products)
})

router.get('/:id', async (req, res) => {
    const pId = parseInt(req.params.id)
    const product = await ProductManager1.getProductById(pId);
    if (product) {
        res.status(200).json(product)
    }else{
         const error = {error: 'Producto not found'}
         return res.status(404).send(error)   
        }
})

router.post('/', async (req,res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    if ( !title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).send('Complete all fields')
    }
    const {body} = req;
    const newProductId = await ProductManager1.addProduct(body);
    res.status(200).send("Product added succesfully")
})

router.put('/:id', async (req, res) => {
    const pId = req.params.id
    const {body} = req;
    const productUpdated = await ProductManager1.updateProduct(pId,body);
    if(productUpdated){
        res.status(200).send(`Product with the id ${pId} uploaded`)
     }else { res.status(404).send("There was an error trying to update a product")};
})

router.delete('/:id', async (req, res) => {
    const pId = parseInt(req.params.id)
    const product = await ProductManager1.getProductById(pId);
    if (product) {
        await ProductManager1.deleteProduct(pId);
        res.status(200).send("Product deleted succesfully")    
     }else{
         const error = {error: 'Producto not found'}
         return res.status(404).send(error)   
        }
})


export default router