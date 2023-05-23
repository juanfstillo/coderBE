import cartModel from "../models/carts.js";

class CartManager {
  constructor() {}
  async createCart(cart) {
    try {
      let result = await cartModel.create(cart);
      return result;
    } catch (error) {
      console.error("Error while trying to create a product:", error);
      throw error;
    }
  }

  async getCartById(id) {
    try {
        const cartFind = await cartModel.findOne({_id: id});
        if (!cartFind) {
        console.error(`Product with the id ${id} not found, try again-`);
        return false;
        }
        return cartFind;
    } catch (error) {
        console.log(`There was an error ${error} trying to get a product`)
    }
  }

  async updateCart(cid,pid){
    try {
      const cartFind = await cartModel.findOne({_id: cid});
      if (!cartFind) {
      console.error(`Cart with the id ${cid} not found, try again-`);
      return false;
      }
    //   const existingProductCart = cartFind.products.findOne({_id: pid});
    //   if(existingProductCart){
        cartFind.products.push({product:pid});
        await cartFind.save();
    //   }

     } catch (error) {
      console.log(`There was an error ${error} trying to get a product`)
  }
  }

}

export default CartManager;
