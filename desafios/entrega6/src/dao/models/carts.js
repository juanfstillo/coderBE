import mongoose from "mongoose";

import db from "./db.js";

const collection = "carts";

const schema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
      },
    ],

    default: [],
  },
});

schema.statics.createCart = async function (cart, req) {
  try {
    const newCart = new this(cart);
    const result = await newCart.save();
    return result;
  } catch (error) {
    console.error("Error while trying to create a cart:", error);
    throw error;
  }
};

const cartModel = db.model(collection, schema);
export default cartModel;
