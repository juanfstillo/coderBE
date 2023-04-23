import { Router } from "express";
import CartManager from '../services/CartManager.js'
import ProductManager from "../services/ProductManager.js";
import fs from 'fs';

const router = Router()
const CartManager1 = new CartManager("carts.json")
const ProductManager2 = new ProductManager("products.json")


router.post('/', async (req,res) => {
    const { id, quantity} = req.body
    if ( !id || !quantity) {
        return res.status(400).send('Complete all fields pepe')
    }
    const {body} = req;
    const newCartId = await CartManager1.createCart(body);
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
    await CartManager1.updateCart(cId,pId)
    // const existingProductCart = cart.products.find(p =>p.productId === pId)
    // if(existingProductCart){
    //     existingProductCart.quantity++
    // }else{
    //     cart.products.push({productId:pId,quantity:1})
    // };
    // //await fs.promises.writeFile("carts.json", JSON.stringify(cart));
    // console.log(cart);
    res.status(200).send("Cart Updated")
})


export default router