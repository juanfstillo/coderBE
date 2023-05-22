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

async createProduct(user) {
        try{
                let result = await productModel.create(user);
                return result
        }catch(error){
                console.error('Error al obtener los usuarios:', error);
                throw error;
                }     
        }
}

export default ProductManager;