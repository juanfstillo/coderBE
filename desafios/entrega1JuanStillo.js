class ProductManager {
    constructor() {
        this.products = [];
        this.newId = 1;
    }
    addProduct(title,description,price,thumbnail,code,stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Complete all fields.");
            return;
        }
        if (this.getProductByCode(code)) {
            console.error("A product with this code already exist.");
            return;
        }
        const product={
            id:this.newId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(product);
        console.log(`Product ${title} with the code ${code} was added succesfully`)

    }
    getProductByCode(code){
        return this.products.find(p=>p.code === code);
    }
    getProducts() {
        console.log("Your products",this.products);
        return this.products;
    }
    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
          console.error("Product not found, try again");
          return;
        }
        console.log('The product was found',product);
        return product;
      }
}

// Use cases
const ProductManager1 = new ProductManager();
ProductManager1.getProducts();
ProductManager1.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen",'abc123',25);
ProductManager1.getProducts();
ProductManager1.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen",'abc123',25);
ProductManager1.getProducts();
ProductManager1.getProductById(1);
ProductManager1.getProductById(9999);

