import productModel from "../models/products.js";

class ProductManager {
  constructor() {}
  
  async getAllProducts(params){
    return productModel.find().lean()
  }

  async getProducts(page, sort, category) {
    try {
      if (category !== undefined) {
        return await productModel.paginate(
          { category: category },
          { page: page, limit: 10, lean: true, sort: { price: sort } }
        );
      }
      return await productModel.paginate(
        {},
        { page: page, limit: 10, lean: true, sort: { price: sort } }
      );
    } catch (error) {
      console.log("Error while trying to obtain products");
      throw error;
    }
  }
  async createProduct(product) {
    try {
      let result = await productModel.create(product);
      return result;
    } catch (error) {
      console.error("Error while trying to create a product:", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
        const productFind = await productModel.findOne({_id: id}).lean();
        if (!productFind) {
        console.error(`Product with the id ${id} not found, try again-`);
        return ;
        }
        return productFind;
    } catch (error) {
        console.log(`There was an error ${error} trying to get a product`)
    }
  }

  async deleteProduct(id) {
    try {
        const productFind = await productModel.findByIdAndDelete({_id: id});
        if (!productFind) {
        console.error(`Product with the id ${id} not found, try again-`);
        return ;
        }
        return "Product deleted";
        ;
    } catch (error) {
        console.log(`There was an error ${error} trying to get a product`)
    }
  }

  async updateProduct(id,newData){
    try {
      const productFind = await productModel.findByIdAndUpdate({_id: id},newData,{ new: true });
      if (!productFind) {
      console.error(`Product with the id ${id} not found, try again-`);
      return false;
      }else{
        const {title, description, code, price, status, stock, category, thumbnails} = newData;
    
        title ? productFind.title = title : null;
        description ? productFind.description = description : null;
        code ? productFind.code= code : null;
        price? productFind.price = price : null;
        status ? productFind.status = status : null;
        stock ? productFind.stock = stock : null;
        category ? productFind.category = category : null;
        thumbnails ? productFind.thumbnails = thumbnails : null;
        return productFind;
      }
      ;
  } catch (error) {
      console.log(`There was an error ${error} trying to get a product`)
  }
  }
}

export default ProductManager;
