import fs from 'fs';
class CartManager {
    constructor(path) {
        this.products = [];
        this.newId = 1;
        this.path = path;
    }
    async addProductCart(product) {
        if (!product.id || !product.quantity) {
            console.error("Complete all fields.");
            return;
        }
        try{
            this.carts = await fs.promises.readFile(this.path,'utf-8')
            let parseCarts = (JSON.parse(this.carts));
            cart.id = parseCarts.length + 1;
            parseCarts.push(cart);
            console.log(parseCarts)
            await fs.promises.writeFile(this.path, JSON.stringify(parseCarts));
            console.log(`Cart ${cart.id}  was added succesfully`)    
        }catch(error){
            console.log(`There was an error ${error} trying to add a new cart`)
        }
    }
}

export default CartManager