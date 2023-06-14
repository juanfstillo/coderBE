import fs from 'fs';

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
            return parseProducts
        }catch(error){
                console.log(`There was an error trying te access to your products ${error}`)
        }
    }

    async addProduct(product) {
        if (!product.title ||  !product.price ) {
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
        id = Number(id)
        try {
            const products = await fs.promises.readFile(this.path,'utf-8')
            const parseProducts = JSON.parse(products)
            const productMatched = parseProducts.find(p => p.id === id);
            console.log(productMatched)
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

    async updateProduct(id, newData) {
        try {
          id = Number(id);
          const products = await fs.promises.readFile(this.path,'utf-8')
            const parseProducts = JSON.parse(products)
            const productMatched = parseProducts.find(p => p.id === id);
          if (productMatched) {
            const index = parseProducts.indexOf(productMatched);
            const {title, description, code, price, status, stock, category, thumbnails} = newData;
    
            title ? parseProducts[index]['title'] = title : null;
            description ? parseProducts[index]['description'] = description : null;
            code ? parseProducts[index]['code'] = code : null;
            price? parseProducts[index]['price'] = price : null;
            status ? parseProducts[index]['status'] = status : null;
            stock ? parseProducts[index]['stock'] = stock : null;
            category ? parseProducts[index]['category'] = category : null;
            thumbnails ? parseProducts[index]['thumbnails'] = thumbnails : null;
            await fs.promises.writeFile(this.path, JSON.stringify(parseProducts));
            return true;
            }else{
            console.log(`Product not found with the id ${id}`);
            }   
        } catch (error) {
            console.log(`There was an error ${error} trying to update a product`)
        }
      }
}

export default ProductManager


