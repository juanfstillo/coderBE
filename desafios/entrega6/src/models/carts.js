import mongoose from 'mongoose';

import db from './db.js';

const collection = "carts";

const schema = new mongoose.Schema({
    products: {

        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                }
            }
        ],

        default: []
    }
})

const cartModel = db.model(collection,schema);
export default cartModel;