import productModel from "../models/products.js";

class ProductManager{
    constructor(){}
async getProducts(){
        try{
        const products = await productModel.find({}).lean();
        return products;
         }catch(error){
            console.log('Error while trying to obtain products')
            throw error;
            }
        }
        
}

export default ProductManager;