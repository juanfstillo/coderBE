import mongoose from "mongoose";

import mongoosePaginate from "mongoose-paginate-v2";

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

const cartModel = mongoose.model(collection, schema);
export default cartModel;
