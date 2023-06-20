import mongoose from "mongoose";

import db from "../../config/db.js";

import mongoosePaginate from 'mongoose-paginate-v2';

const collection = "products";

const schema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  code: {
    type: Number,
    require: true,
    unique: true,
  },
  category: String,
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
  },
  stock: {
    type: Number,
    required: true,
  },
  thumbnails: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

schema.plugin(mongoosePaginate);

// schema.statics.createProduct = async function (product, req) {
//   try {
//     const newProduct = new this(product);
//     const result = await newProduct.save();
//     return result;
//   } catch (error) {
//     console.error("Error while trying to create a product:", error);
//     throw error;
//   }
// };

const productModel = mongoose.model(collection, schema);

export default productModel;
