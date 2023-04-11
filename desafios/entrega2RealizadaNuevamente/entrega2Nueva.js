const fs = require('fs');
const { parse } = require('path');
class ProductManager {
    constructor(path) {
        this.products = [];
        this.newId = 1;
        this.path = path;
    }
    async getProducts(){
        try{
            this.products = await fs.promises.readFile(this.path,'utf-8');
            const parseProducts = (JSON.parse(this.products));
            console.log(parseProducts);
            return parseProducts
        }catch(error){
                console.log(`There was an error trying te access to your products ${error}`)
        }
    }

    async addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Complete all fields.");
            return;
        }
        try{
            this.products = await fs.promises.readFile(this.path,'utf-8')
            let parseProducts = (JSON.parse(this.products));
            product.id = parseProducts.length + 1;
            parseProducts.push(product);
            console.log(parseProducts)
            await fs.promises.writeFile(this.path, JSON.stringify(parseProducts));
            console.log(`Product ${product.title} with the code ${product.code} was added succesfully`)    
        }catch(error){
            console.log(`There was an error ${error} trying to add a new product`)
        }
    }

    async getProductById(id) {
        try {
            const products = await fs.promises.readFile(this.path,'utf-8')
            const parseProducts = JSON.parse(products)
            const productMatched = parseProducts.find(p => p.id === id);
            if (!productMatched) {
            console.error(`Product with the id ${id} not found, try again-`);
            return;
            }
            console.log(`Product with the name ${productMatched.title} founded.`);
            return productMatched;
        } catch (error) {
            console.log(`There was an error ${error} trying to get a product`)
        }
    }

    async deleteProduct(id){
        try {
            const products = await fs.promises.readFile(this.path,'utf-8')
            const parseProducts = JSON.parse(products)
            const productMatched = parseProducts.find(p => p.id === id);
            if(productMatched){
                const index = parseProducts.indexOf(productMatched);
                parseProducts.splice(index,1);
                await fs.promises.writeFile(this.path, JSON.stringify(parseProducts));
                console.log(`Product with the ${id} was deleted`);
            } else {
                console.log(`ID ${id} does not exist in the file`);
                return null;
            }
        } catch (error) {
            console.log(`There was an error ${error} trying to delete a product`)
        }
    }

    async updateProduct(id,property,value){
        try {
            const products = await fs.promises.readFile(this.path,'utf-8')
            let parseProducts = JSON.parse(products)
            const productMatched = parseProducts.find(p => p.id === id);
            if(productMatched){
                const index = parseProducts.indexOf(productMatched);
                parseProducts[index][property] = value
                await fs.promises.writeFile(this.path, JSON.stringify(parseProducts));
                return
            }else{
                console.log(`Product not found with the id ${id}`);
            }   
        } catch (error) {
            console.log(`There was an error ${error} trying to update a product`)
        }
    }
}


const product = {
    title: 'producto prueba',
    description:'Este es un producto prueba',
    price:200,
    thumbnail:'Sin imagen',
    code:'abc1233',
    stock:25
}

// Use cases
const ProductManager1 = new ProductManager("./products.json");
//ProductManager1.getProducts();
//ProductManager1.getProductById(3);
//ProductManager1.addProduct(product);
//ProductManager1.deleteProduct(1);
//ProductManager1.updateProduct(3,'title','producto modificado otra vez');



