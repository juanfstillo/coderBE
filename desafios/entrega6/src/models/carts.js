import mongoose from 'mongoose';

import db from './db.js';

const collection = "carts";

const schema = new mongoose.Schema({
    products:{
    }
})

const cartModel = db.model(collection,schema);
export default cartModel;