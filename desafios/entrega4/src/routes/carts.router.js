import { Router } from "express";
import CartManager from '../services/CartManager.js'
import ProductManager from "../services/ProductManager.js";

const router = Router()
const CartManager1 = new CartManager("carts.json")
const ProductManager2 = new ProductManager("products.json")


router.post('/', async (req,res) => {
    // const { id, quantity} = req.body
    // if ( !id || !quantity) {
    //     return res.status(400).send('Complete all fields')
    // }
    // const {body} = req;
    const newCartId = await CartManager1.createCart();
    res.status(200).send("Cart created succesfully")
})

router.get('/:id', async (req, res) => {
    const pId = parseInt(req.params.id)
    const cart = await CartManager1.getCartById(pId);
    if (cart) {
        res.status(200).json(cart.products)
    }else{
         const error = {error: 'Cart not found'}
         return res.status(404).send(error)   
        }
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cId = parseInt(req.params.cid)
    const pId = parseInt(req.params.pid)
    const cart = await CartManager1.getCartById(cId);
    const productFounded = await ProductManager2.getProductById(pId)
    if (!cart) {
        res.status(404).send('Cart not Found')
        return
    }
    if(!productFounded){
        res.status(404).send('Product not Found')
        return
    }
    try{
        await CartManager1.updateCart(cId,pId)
        res.status(200).send("Cart Updated")
    }catch(error){
        res.status(500).send(`There was a error trying to add a product to your cart ${error}`)
    }
})


export default router