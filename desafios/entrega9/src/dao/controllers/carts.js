import cartModel from "../models/carts.js";
import productModel from "../models/products.js";

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

  async getCarts() {
    return await cartModel.find().populate("products.product").lean();
  }

  async getCartById(id) {
    try {
      const cartFind = await cartModel
        .findOne({ _id: id })
        .populate("products.product")
        .lean();
      if (!cartFind) {
        console.error(`Product with the id ${id} not found, try again-`);
        return false;
      }
      return cartFind;
    } catch (error) {
      console.log(`There was an error ${error} trying to get a product`);
    }
  }

  async addProductCart(cId, pId, quantity) {
    try {
      const product = await productModel.findOne({ _id: pId }).lean();
      const cart = await cartModel.findOne({ _id: cId }).lean();
      const prodToAdd = cart.products.find((e) => e.product == pId);
      if (!prodToAdd || !cart) {
        console.error(
          `Cart or product with the id ${cId} or ${pId} not found, try again-`
        );
        return false;
      }
      if (prodToAdd) {
        const newProduct = prodToAdd.quantity + quantity;
        prodToAdd.quantity = newProduct;
        const newCart = cartModel.updateOne({ _id: cId }, cart);
        return newCart;
      } else {
        return cartModel
          .findByIdAndUpdate(cId, {
            $push: {
              products: {
                product: new mongoose.Types.ObjectId(product._id),
                quantity: quantity,
              },
            },
          })
          .populate("products.product")
          .lean();
      }
    } catch (error) {
      console.log(`There was an error ${error} trying add a product to a cart`);
    }
  }

  async updateCart(cId, pId) {
    try {
      const cartFind = await cartModel.findOne({ _id: cId });
      const productFind = await productModel.findOne({ _id: pId });
      const prodToAdd = cartFind.products.find((e) => e.product == pId);
      if (!cartFind || !productFind) {
        console.error(
          `Cart or product with the id ${cId} or ${pId} not found, try again-`
        );
        return false;
      }
      if (prodToAdd) {
        const newProd = quantity;
        prodToAdd.qty = newProd;
        const newCart = cartModel.updateOne({ _id: cartId }, cart);
        return newCart;
      } else {
        return cartFind
          .findByIdAndUpdate(cId, {
            $push: {
              products: {
                product: new mongoose.Types.ObjectId(product._id),
                quantity: quantity,
              },
            },
          })
          .populate("products.product")
          .lean();
      }
    } catch (error) {
      console.log(`There was an error ${error} trying to get a product`);
    }
  }

  async deleteAllProductsCart(cId) {
    try {
      const cartFind = await cartModel.findOne({ _id: cId });
      if (!cartFind) {
        console.error(`Product with the id ${cId} not found, try again-`);
        return false;
      } else {
        cartModel.updateOne(
          { _id: cartFind._id }, // Filter to find the document to update
          { products: [] }
        );
        return true;
        //return cartModel.findByIdAndDelete(cId).lean();
      }
    } catch (error) {
      console.error(
        "There was an error trying to delete a product in this cart",
        error.message
      );
    }
  }

  async deleteProductInCart(cId, pId) {
    try {
      const cart = await this.getCartById(cId);
      const products = cart.products;

      const ids = [];
      for (let index = 0; index < products.length; index++) {
        ids.push(products[index].product._id);
      }

      const productToDelete = ids.findIndex((id) => id == pId._id);

      if (productToDelete === -1) {
        return "Product not found";
      }

      return await cartModel.updateOne(
        { _id: cId },
        { $pull: { products: { product: pId } } }
      );
    } catch (error) {
      console.error("Error trying to delete a product in cart:", error.message);
    }
  }
}

export default CartManager;
