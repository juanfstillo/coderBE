import { Router } from "express";
import CartManager from '../services/CartManager.js'
const router = Router()
const CartManager1 = new CartManager("carts.json")

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
    if (cart) {
        res.status(200).json(cart)
    }else{
         const error = {error: 'Cart not found'}
         return res.status(404).send(error)   
        }
})


export default router