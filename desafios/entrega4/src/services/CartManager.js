import fs from 'fs';
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
            const newId = parseCarts.length + 1; // Incrementamos el contador de ids y lo asignamos al nuevo carrito
            const newCart = { id: newId, products }; // Creamos un nuevo carrito con el id generado y los productos recibidos como parámetro
            parseCarts.push(newCart); // Agregamos el nuevo carrito al array de carritos
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



  }
  

export default CartManager