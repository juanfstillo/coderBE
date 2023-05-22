import mongoose from 'mongoose';

import db from './db.js';

const collection = "products";

const schema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true  
    },
    code:{
        type:Number,
        require:true,
        unique:true  
    },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
    },
    stock:{
        type:Number,
        required:true
    },
    thumbnails:{
        type:String,
        required:true
    }
});

schema.statics.createProduct = async function (product, req) {
    try {
        const newProduct = new this(product);
        const result = await newProduct.save();
        return result;


    } catch (error) {
        console.error('Error while trying to create a product:', error);
        throw error;
    }
}

const productModel = db.model(collection,schema);
export default productModel;