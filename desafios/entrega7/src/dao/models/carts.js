import mongoose from "mongoose";

import db from "../../config/db.js";

import mongoosePaginate from 'mongoose-paginate-v2';

const collection = "carts";

const schema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    default: [],
  },
});

schema.plugin(mongoosePaginate);

// schema.statics.createCart = async function (cart, req) {
//   try {
//     const newCart = new this(cart);
//     const result = await newCart.save();
//     return result;
//   } catch (error) {
//     console.error("Error while trying to create a cart:", error);
//     throw error;
//   }
// };

const cartModel = mongoose.model(collection, schema);
export default cartModel;
