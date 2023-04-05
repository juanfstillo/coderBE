const fs = require('fs');
this.newId = 1;
this.products = [];
class ProductManager {
    constructor(path) {
        this.path = path
    }
    async getProducts() {
        try {
            const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
            return data;   
        } catch(error){
            console.log('Error throw: ',error.code,"Error while trying to access to your products");
        }
    }
}

const productManager = new ProductManager('./productos.txt')
productManager.getProducts();