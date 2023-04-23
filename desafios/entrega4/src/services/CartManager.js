import fs from 'fs';
import ProductManager from "../services/ProductManager.js";

class CartManager {
    constructor(path) {
      this.carts = []; 
      this.cartId = 10;
      this.path = path; 
    }
  
    async createCart(products = []) {
        try{ 
            this.carts = await fs.promises.readFile(this.path,'utf-8')
            let parseCarts = (JSON.parse(this.carts));
            const newId = parseCarts.length + 1; 
            const newCart = { id: newId, products }; 
            parseCarts.push(newCart); 
            console.log(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(parseCarts));
        } catch(error){
            console.log(`There was an error ${error} trying to create a new cart`)
        }
    }

    async getCartById(id) {
        try {
            const carts = await fs.promises.readFile(this.path,'utf-8')
            const parseCarts = JSON.parse(carts)
            const cartMatched = parseCarts.find(c => c.id === id);
            if (!cartMatched) {
            console.error(`Cart with the id ${id} not found, try again-`);
            return;
            }
            console.log(`Cart with the name ${cartMatched.id} founded.`);
            return cartMatched;
        } catch (error) {
            console.log(`There was an error ${error} trying to get a product`)
        }
    }

    async updateCart(cId,pId){
        const carts = await fs.promises.readFile(this.path,'utf-8')
        const parseCarts = JSON.parse(carts)
        const cartMatched = parseCarts.find(c => c.id === cId);
        const index = parseCarts.indexOf(cartMatched);
        const existingProductCart = cartMatched.products.find(p =>p.productId === pId)
        if(existingProductCart){
            const indexProduct = cartMatched.products.indexOf(existingProductCart)
            parseCarts[index]['products'][indexProduct]['quantity'] +=1
            await fs.promises.writeFile(this.path, JSON.stringify(parseCarts));
            return
        }else{
            parseCarts[index]['products'].push({productId:pId,quantity:1})
            await fs.promises.writeFile(this.path, JSON.stringify(parseCarts));
            return
        }
    }

  }
  

export default CartManager