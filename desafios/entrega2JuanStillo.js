const fs = require('fs');

let id = 1;

class ProductManager {
    constructor(path){
        this.path = path
        this.products =[]
    }

    async addProduct(product){
        try{
            if (await this.getProducts() === false){
                product.id = id;
                this.products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
                console.log(`Product ${product.title} with the code ${product.code} was added succesfully`)
            }else{
                const data = await this.getProducts();
                if (data.length === 0){
                    product.id = id;
                }else{
                    let lastItem = data[data.length - 1];
                    if (lastItem.id >= 1){
                        product.id = lastItem.id + 1;
                    }else{
                        product.id = id;
                    }
                }
                data.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
                console.log(`Product ${product.title} with the code ${product.code} was added succesfully`)
            }
        } catch(error){
            console.log('There was an error trying to add a product.',error);
        }
    }

    async getProductById(id){
        try{
            const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
            const product = data.find(p => p.id === id);
            product ? console.log("Your product searched is ",product) : console.error(null,"Product not found, try again");
            return product;
        } catch(error){
            console.error("Product not found, try again");
            return false;        
        }
    }

    async deleteProduct(id){
        try{
            const product = await this.getProductById(id);
            const data = await this.getProducts();
            const newArray = data.filter(p => p.id != product.id);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, 2));
            console.log(`The product with the id ${id} was deleted`)
        } catch(error){
            console.log(`There was a problem trying to delete a product with the id ${id}.`);
        }
    }

    async getProducts(){
        try{
            const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
            console.log('Your products',data);
            return data;
        } catch(error){
            console.log('There was an error trying to access to your products or you must create at least one');
            return false;
        }
    }

    async updateProduct(id,property,value){
        try{
            const fullProducts = await this.getProducts()
            const productUpload = await this.getProductById(id)
            if (!productUpload) {
                console.log(`There is not a product with the id ${id}`)
                return false;
            }
            productUpload[property] = value
            fullProducts.push(productUpload)
            const productUploadJSON = JSON.stringify(fullProducts)
            console.log(productUploadJSON);
            fs.appendFile(this.path, productUploadJSON,'utf-8', (error) => {
                if (error) {
                    console.log(`Fail to upload the product with the ${id}`)
                } else {
                    console.log(`The product with the id ${id} was uploaded`)
                }
            })
        }catch(error){
            console.log(error)
        }
    }
}

const product = {
    title: 'producto prueba',
    description:'Este es un producto prueba',
    price:200,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
}

//Use cases
const productManager1 = new ProductManager('./products.txt');
//productManager1.getProducts();
//productManager1.addProduct(product);
//productManager1.getProducts();
//productManager1.getProductById(1);
//productManager1.getProductById(100);
//productManager1.deleteProduct(1);
//productManager1.deleteProduct(100);
//productManager1.updateProduct(1,'title','producto prueba modificado');
//productManager1.updateProduct(1000,'title','producto prueba modificado');

